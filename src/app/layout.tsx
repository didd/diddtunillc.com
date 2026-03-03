import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Didd Tuni LLC — Software Engineering Consultancy",
  description:
    "Didd Tuni LLC is a Delaware-based software engineering consultancy specializing in React, TypeScript, design systems, and full-stack architecture for global clients.",
  keywords: [
    "software engineering consultancy",
    "React",
    "TypeScript",
    "Next.js",
    "frontend development",
    "full-stack engineer",
    "design systems",
    "B2B contract",
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Didd Tuni LLC — Software Engineering Consultancy",
    description:
      "Expert software engineering consultancy delivering high-performance React/TypeScript applications, design systems, and full-stack solutions for global clients.",
    type: "website",
    url: "https://diddtunillc.com",
  },
  alternates: {
    canonical: "https://diddtunillc.com",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} ${
        initialTheme === "dark" ? "dark" : ""
      }`}
      style={{ colorScheme: initialTheme }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  var match = document.cookie.match(/(?:^|; )theme=(dark|light)(?:;|$)/);
                  var theme = match ? match[1] : 'light';
                  if (theme !== 'dark' && theme !== 'light') {
                    theme = 'light';
                  }
                  root.classList.toggle('dark', theme === 'dark');
                  root.style.colorScheme = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <a
            href="#main-content"
            className="absolute -top-full left-4 z-[200] rounded bg-accent px-6 py-3 text-sm font-semibold text-bg focus:top-4"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
