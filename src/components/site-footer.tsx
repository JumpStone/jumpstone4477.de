import ThemeModeSelect from "@/components/theme-mode-select";

export default function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border/30 bg-secondary-background ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="underline underline-offset-2" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="underline underline-offset-2" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="underline underline-offset-2" href="/legal">
                  Legal
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-2"
                  href="/code-of-conduct"
                >
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Appearance</h3>
            <div className="mt-1">
              <ThemeModeSelect />
            </div>
          </div>

          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://github.com/jumpstone"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://codeberg.org/jumpstone"
                  target="_blank"
                >
                  Codeberg
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://modrinth.com/user/JumpStone"
                  target="_blank"
                >
                  Modrinth
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://discord.gg/YWc9qb8TRP"
                  target="_blank"
                >
                  Discord (Server)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-base border border-border/30 bg-main px-4 py-3 text-sm text-main-foreground">
          JumpStone Website © 2025 - 2026 by JumpStone. Licensed under GPL-3.0.
        </div>
      </div>
    </footer>
  );
}
