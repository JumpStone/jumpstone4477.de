import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home, Mail } from "lucide-react";

import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "404 | JumpStone",
};

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 md:px-8">
      <div className="flex flex-1 flex-col justify-center gap-8 py-12 md:py-16">
        <section className="rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-base border border-main-foreground/40 bg-main-foreground/10 px-3 py-1 text-xs font-heading">
            <span className="font-mono text-[11px]">404</span>
            Page not found
          </p>
          <h1 className="mb-3 text-3xl font-heading leading-tight sm:text-4xl">
            The page you are looking for does not exist.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed">
            It may have been moved or the URL might be incorrect. Use one of the
            quick links below to continue exploring JumpStone.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-secondary-background px-3 py-1.5 text-sm font-heading text-foreground shadow-sm transition-opacity hover:opacity-80"
            >
              <Home className="size-4" />
              Back to home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-background px-3 py-1.5 text-sm font-heading text-foreground shadow-sm transition-opacity hover:opacity-80"
            >
              <Mail className="size-4" />
              Contact me
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-base border border-border/30 bg-secondary-background p-5 shadow-sm">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/30 bg-background px-3 py-1 text-xs font-heading text-foreground/70">
              <Compass className="size-4" />
              Quick directions
            </div>
            <p className="mb-4 text-sm leading-relaxed text-foreground/80">
              Popular destinations around the site.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/#projects"
                className="inline-flex items-center justify-between rounded-base border border-border/30 bg-background px-3 py-2 text-sm font-heading shadow-sm transition-opacity hover:opacity-80"
              >
                Featured projects
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-foreground/70"
                >
                  {"->"}
                </span>
              </Link>
              <Link
                href="/code-of-conduct"
                className="inline-flex items-center justify-between rounded-base border border-border/30 bg-background px-3 py-2 text-sm font-heading shadow-sm transition-opacity hover:opacity-80"
              >
                Code of Conduct
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-foreground/70"
                >
                  {"->"}
                </span>
              </Link>
              <Link
                href="/legal/imprint"
                className="inline-flex items-center justify-between rounded-base border border-border/30 bg-background px-3 py-2 text-sm font-heading shadow-sm transition-opacity hover:opacity-80"
              >
                Imprint
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-foreground/70"
                >
                  {"->"}
                </span>
              </Link>
            </div>
          </article>

          <article className="rounded-base border border-border/30 bg-secondary-background p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-heading">What you can try</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
              <li>Check the URL for typos or missing parts.</li>
              <li>Return to the homepage to browse highlighted projects.</li>
              <li>
                Reach out via the contact page if you need help finding
                something.
              </li>
            </ul>
          </article>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
