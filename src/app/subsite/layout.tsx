import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/subsite/site-header";
import { ThemeModeProvider } from "@/components/theme-mode-provider";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_SUBSITE_URL || "https://jumpstone.is-cool.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    absolute: "Henry aka JumpStone Dev",
  },
  description:
    "My dev portfolio is a technical deep dive into my projects, with code snippets, implementation details, and more.",
  keywords: [
    "technical deep dive",
    "code snippets",
    "Henry aka JumpStone Dev Portfolio",
    "developer",
    "portfolio",
    "projects",
    "open source",
    "technical writing",
    "web development",
    "Henry aka JumpStone Dev",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Henry aka JumpStone Dev",
    title: "Henry aka JumpStone Dev | Technical Deep Dive",
    description:
      "Technical deep dives by Henry aka JumpStone into my projects, code snippets, implementation details, and more.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Henry aka JumpStone Dev Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry aka JumpStone Dev Portfolio | Technical Deep Dive",
    description:
      "Technical deep dives by Henry aka JumpStone into my projects, code snippets, implementation details, and more.",
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: {
    canonical: baseUrl,
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
};

const themeInitScript = `(() => {
  const STORAGE_KEY = "theme-mode";
  const root = document.documentElement;

  const savedMode = window.localStorage.getItem(STORAGE_KEY);
  const mode =
    savedMode === "light" || savedMode === "dark" || savedMode === "auto"
      ? savedMode
      : "auto";

  const effectiveMode =
    mode === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;

  root.classList.toggle("dark", effectiveMode === "dark");
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Henry aka JumpStone",
    url: baseUrl,
    description:
      "Henry aka JumpStone showcasing open source projects in gaming, hardware, and web technologies",
    sameAs: [
      "https://github.com/jumpstone-gaming",
      "https://github.com/akku-craft",
      "https://modrinth.com/organization/jumpstone-gaming",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="person-json-ld"
          strategy="beforeInteractive"
          type="application/ld+json"
        >
          {JSON.stringify(jsonLd)}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <ThemeModeProvider>
          <SiteHeader />

          <div className="h-1 md:h-1" aria-hidden="true" />

          {children}
        </ThemeModeProvider>
      </body>
    </html>
  );
}
