import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description:
    "Community guidelines for respectful and inclusive interaction across JumpStone spaces.",
};

export default function CodeOfConductPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[36px_36px] opacity-10" />

      <section className="mb-8 rounded-base border-2 border-border bg-main p-6 text-main-foreground shadow-shadow md:p-8">
        <h1 className="mb-2 text-3xl font-heading uppercase tracking-wide md:text-4xl">
          Code of Conduct
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed md:text-base">
          Community guidelines for respectful and inclusive interaction across
          all JumpStone and JumpStone-Gaming project areas.
        </p>
      </section>

      <article className="mb-8 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow md:p-8">
        <section className="mb-6 rounded-base border-2 border-border bg-background p-5 shadow-shadow">
          <h2 className="mb-3 text-xl font-heading uppercase tracking-wide">
            Our Pledge
          </h2>
          <p className="text-sm leading-relaxed md:text-base">
            As maintainers, we are committed to providing a welcoming, safe, and
            respectful environment for everyone, regardless of experience level,
            identity, orientation, disability, appearance, age, ethnicity,
            religion, or nationality.
          </p>
        </section>

        <section className="mb-6 rounded-base border-2 border-border bg-background p-5 shadow-shadow">
          <h2 className="mb-4 text-xl font-heading uppercase tracking-wide">
            Our Standards
          </h2>

          <div className="mb-4 rounded-base border-2 border-border bg-main p-4 text-main-foreground shadow-shadow">
            <h3 className="mb-2 text-sm font-heading uppercase tracking-wide">
              Positive Behavior
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed md:text-base">
              <li>Using welcoming and inclusive language.</li>
              <li>Respecting different viewpoints and experiences.</li>
              <li>Accepting constructive feedback professionally.</li>
              <li>Prioritizing what benefits the broader community.</li>
              <li>Showing empathy toward other members.</li>
            </ul>
          </div>

          <div className="rounded-base border-2 border-border bg-[#ff4b2a] p-4 text-black shadow-shadow">
            <h3 className="mb-2 text-sm font-heading uppercase tracking-wide">
              Unacceptable Behavior
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed md:text-base">
              <li>Sexualized language, imagery, or unwanted advances.</li>
              <li>Insults, harassment, trolling, or personal attacks.</li>
              <li>Publishing private information without permission.</li>
              <li>Any conduct inappropriate in a professional environment.</li>
            </ul>
          </div>
        </section>

        <section className="mb-6 rounded-base border-2 border-border bg-background p-5 shadow-shadow">
          <h2 className="mb-3 text-xl font-heading uppercase tracking-wide">
            Scope
          </h2>
          <p className="text-sm leading-relaxed md:text-base">
            This Code of Conduct applies across all project spaces managed under
            JumpStone and JumpStone-Gaming, including public representation such
            as official emails, social accounts, and community events.
          </p>
        </section>

        <section className="mb-6 rounded-base border-2 border-border bg-background p-5 shadow-shadow">
          <h2 className="mb-3 text-xl font-heading uppercase tracking-wide">
            Enforcement
          </h2>
          <p className="mb-3 text-sm leading-relaxed md:text-base">
            Maintainers are responsible for interpreting and enforcing these
            standards and for taking fair corrective action when needed.
          </p>
          <div className="rounded-base border-2 border-border bg-secondary-background p-4">
            <p className="text-sm leading-relaxed md:text-base">
              To report concerns, contact:
              <a
                href="mailto:hi@jumpstone4477.de"
                className="ml-1 font-heading underline underline-offset-2"
              >
                hi@jumpstone4477.de
              </a>
            </p>
          </div>
        </section>

        <section className="rounded-base border-2 border-border bg-background p-5 shadow-shadow">
          <h2 className="mb-3 text-xl font-heading uppercase tracking-wide">
            Attribution
          </h2>
          <p className="text-sm leading-relaxed md:text-base">
            This policy is based on Contributor Covenant principles.
            <a
              href="https://www.contributor-covenant.org"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-heading underline underline-offset-2"
            >
              Learn more
            </a>
            .
          </p>
        </section>

        <p className="mt-5 text-xs font-mono uppercase tracking-[0.2em] text-foreground/70">
          Last Updated: April 2026
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
