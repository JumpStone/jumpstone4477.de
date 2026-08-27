export default function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border/30 bg-secondary-background ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="underline underline-offset-2" href="#">
                  Home
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://henrymeyer.de/contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-base border border-border/30 bg-background p-4">
            <h3 className="mb-3 text-sm font-heading">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://henrymeyer.de/legal/imprint"
                >
                  Imprint
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://henrymeyer.de/legal/privacy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="underline underline-offset-2"
                  href="https://henrymeyer.de/code-of-conduct"
                >
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-base border-2 border-border bg-main px-4 py-3 text-sm text-main-foreground">
          <p>© 2026 HMT Clan. Code licensed under GPL-3.0.</p>
          <p>
            Based on{" "}
            <a
              href="https://henrymeyer.de/?utm_source=akkucraft.de&utm_medium=copyright_notice&utm_campaign=website"
              target="_blank"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Henry Meyer Website
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
