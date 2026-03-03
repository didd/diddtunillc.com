import { z } from "zod";

export const runtime = "nodejs";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Choose the service you need.").max(160),
  message: z
    .string()
    .trim()
    .min(20, "Project details should be at least 20 characters.")
    .max(5000, "Project details are too long."),
  website: z.string().trim().max(0).optional().or(z.literal("")),
});

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function logContactEvent(
  level: "info" | "warn" | "error",
  message: string,
  context: Record<string, string | number | boolean | undefined> = {},
) {
  const logger = level === "info" ? console.info : level === "warn" ? console.warn : console.error;
  logger(`[contact] ${message}`, context);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    logContactEvent("warn", "rate_limit_exceeded", { ip });
    return Response.json(
      { message: "Too many inquiries from this connection. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    logContactEvent("warn", "invalid_json", { ip });
    return Response.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    logContactEvent("warn", "validation_failed", {
      ip,
      fieldCount: parsed.error.issues.length,
      fields: parsed.error.issues.map((issue) => issue.path.join(".")).join(","),
    });
    return Response.json(
      {
        message: firstIssue?.message || "Please check the form fields and try again.",
        field: firstIssue?.path.join(".") || undefined,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website) {
    logContactEvent("warn", "honeypot_triggered", { ip });
    return Response.json({ message: "Inquiry sent. We will get back to you soon." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME || "Didd Tuni LLC";

  if (!apiKey || !toEmail || !fromEmail) {
    logContactEvent("error", "missing_contact_configuration", {
      hasApiKey: Boolean(apiKey),
      hasToEmail: Boolean(toEmail),
      hasFromEmail: Boolean(fromEmail),
    });
    return Response.json(
      { message: "Contact email is not configured yet." },
      { status: 500 },
    );
  }

  const safeCompany = data.company ? escapeHtml(data.company) : "Not provided";
  const safeBudget = data.budget ? escapeHtml(data.budget) : "Not provided";
  const safeService = escapeHtml(data.service);
  const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);

  let response: Response;

  try {
    response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          email: fromEmail,
          name: fromName,
        },
        to: [{ email: toEmail }],
        replyTo: {
          email: data.email,
          name: data.name,
        },
        subject: `New Project Inquiry — ${data.name}`,
        htmlContent: `
          <h2>New inquiry from diddtunillc.com</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Budget:</strong> ${safeBudget}</p>
          <p><strong>Service:</strong> ${safeService}</p>
          <p><strong>Message:</strong><br />${safeMessage}</p>
        `,
        textContent: [
          "New inquiry from diddtunillc.com",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "Not provided"}`,
          `Budget: ${data.budget || "Not provided"}`,
          `Service: ${data.service}`,
          `Message: ${data.message}`,
        ].join("\n"),
      }),
    });
  } catch (error) {
    logContactEvent("error", "brevo_network_failure", {
      ip,
      email: data.email,
      service: data.service,
      error: error instanceof Error ? error.message : "unknown_error",
    });
    return Response.json(
      { message: "Unable to send your inquiry right now. Please email contact@diddtunillc.com instead." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const brevoErrorText = await response.text();
    logContactEvent("error", "brevo_send_failed", {
      ip,
      email: data.email,
      service: data.service,
      status: response.status,
      brevoResponse: brevoErrorText.slice(0, 500),
    });
    return Response.json(
      { message: "Unable to send your inquiry right now. Please email contact@diddtunillc.com instead." },
      { status: 502 },
    );
  }

  logContactEvent("info", "inquiry_sent", {
    ip,
    email: data.email,
    company: data.company || "not_provided",
    service: data.service,
  });

  return Response.json({
    message: "Inquiry sent. We will get back to you soon.",
  });
}
