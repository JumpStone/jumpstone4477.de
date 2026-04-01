import ThemeModeSelect from "@/components/theme-mode-select";

export default function SiteFooter() {
  return (
    <footer className="mt-8 border-t-2 border-border bg-secondary-background ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-base border-2 border-border bg-background p-4">
            <h3 className="mb-3 text-sm font-heading uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="underline underline-offset-2" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-base border-2 border-border bg-background p-4">
            <h3 className="mb-3 text-sm font-heading uppercase tracking-wide">
              Legal
            </h3>
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

          <div className="rounded-base border-2 border-border bg-background p-4">
            <h3 className="mb-3 text-sm font-heading uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="underline underline-offset-2"
                  href="mailto:hi@jumpstone4477.de"
                >
                  hi@jumpstone4477.de
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-base border-2 border-border bg-background p-4">
            <h3 className="mb-3 text-sm font-heading uppercase tracking-wide">
              Appearance
            </h3>
            <div className="mt-1">
              <ThemeModeSelect />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-base border-2 border-border bg-main px-4 py-3 text-sm text-main-foreground">
          JumpStone Website © 2025 - 2026 by JumpStone. Licensed under CC
          BY-NC-SA 4.0.
        </div>
      </div>
    </footer>
  );
}
