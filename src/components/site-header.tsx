"use client";

import { useThemeMode } from "@/components/theme-mode-provider";
import { useEffect, useState } from "react";

type SiteHeaderProps = {
  logoSrc?: string;
  siteName?: string;
};

const socialLinks = [
  {
    href: "https://github.com/jumpstone",
    iconName: "github",
    label: "GitHub",
  },
  {
    href: "https://codeberg.org/jumpstone",
    iconName: "codeberg",
    label: "Codeberg",
  },
  {
    href: "https://modrinth.com/organization/jumpstone-gaming",
    iconName: "modrinth",
    label: "Modrinth",
  },
];

function socialIconButtonClassName() {
  return "inline-flex size-11 items-center justify-center rounded-base border-2 border-border bg-secondary-background shadow-shadow transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-main";
}

export default function SiteHeader({
  logoSrc = "/logo.png",
  siteName = "JumpStone",
}: SiteHeaderProps) {
  const { effectiveMode } = useThemeMode();
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsCompact((current) => {
        if (!current && y > 28) return true;
        if (current && y < 12) return false;
        return current;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="flex items-center justify-between rounded-base border-2 border-border bg-secondary-background/95 p-4 shadow-shadow transition-transform duration-200 backdrop-blur supports-backdrop-filter:bg-secondary-background/85"
      style={{ transform: isCompact ? "translateY(-8px)" : "translateY(0)" }}
    >
      <a href="/" className="inline-flex items-center gap-3">
        <img
          src={logoSrc}
          alt={`${siteName} Logo`}
          className="size-10 rounded-base border-2 border-border bg-background p-1 shadow-shadow"
        />
        <span className="text-xl font-heading uppercase tracking-wide">
          {siteName}
        </span>
      </a>

      <div className="flex flex-wrap gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            className={socialIconButtonClassName()}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            title={link.label}
          >
            <img
              src={`/badges/${link.iconName}${effectiveMode === "light" ? "-dark" : ""}.png`}
              alt=""
              aria-hidden="true"
              className="size-5 object-contain"
            />
          </a>
        ))}
      </div>
    </header>
  );
}
