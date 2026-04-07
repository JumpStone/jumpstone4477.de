import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import { ThemeModeProvider } from "@/components/theme-mode-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_URL || "https://jumpstone4477.de";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "JumpStone",
    template: "%s | JumpStone",
  },
  description:
    "JumpStone: Developer portfolio showcasing open source projects in gaming, hardware, and web technologies. Explore Minecraft modding, Arduino projects, and web applications.",
  keywords: [
    "developer",
    "portfolio",
    "open source",
    "minecraft modding",
    "arduino",
    "web development",
    "JumpStone",
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
    siteName: "JumpStone",
    title: "JumpStone | Developer Portfolio & Open Source Projects",
    description:
      "Discover open source projects in gaming, hardware, and web technologies",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "JumpStone - Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JumpStone | Developer Portfolio & Open Source Projects",
    description:
      "Discover open source projects in gaming, hardware, and web technologies",
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
    name: "JumpStone",
    url: baseUrl,
    description:
      "Developer showcasing open source projects in gaming, hardware, and web technologies",
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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeModeProvider>
          <SiteHeader />

          <div className="h-28 md:h-32" aria-hidden="true" />

          {children}
        </ThemeModeProvider>
      </body>
    </html>
  );
}
