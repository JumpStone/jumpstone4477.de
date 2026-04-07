import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal | JumpStone",
  description:
    "Legal information, privacy policy, and disclaimer for the JumpStone website.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Legal Information | JumpStone",
    description: "Legal information and disclaimer for the JumpStone website.",
    type: "website",
    url: "https://jumpstone4477.de/legal",
  },
};

export default function LegalPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
      

      <section className="mb-8 rounded-base border border-border/30 bg-main p-6 text-main-foreground shadow-sm md:p-8">
        <h1 className="mb-2 text-3xl font-heading md:text-4xl">
          Legal
        </h1>
      </section>

      <article className="mb-8 rounded-base border border-border/30 bg-secondary-background p-6 shadow-sm md:p-8">
        <section className="mb-6 rounded-base border border-border/30 bg-background p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-heading">
            About this Website
          </h2>
          <p className="text-sm leading-relaxed md:text-base">
            This is a purely private, non-commercial website. Its sole purpose
            is to provide a personal introduction to my software projects and
            myself.
          </p>
          <p className="text-sm leading-relaxed md:text-base">
            No goods or services are offered for a fee. No commercial activity
            within the meaning of the Digital Services Act (DDG) takes place.
            For this reason, there is no general legal requirement to provide an
            imprint for this website.
          </p>
        </section>

        <section className="mb-6 rounded-base border border-border/30 bg-background p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-heading">
            Contact
          </h2>
          <p className="mb-4 text-sm leading-relaxed md:text-base">
            If you have any questions about my projects or would like to get in
            touch, you can reach me at the address listed on the Contact page.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-base border border-border/30 bg-main px-4 py-2 text-sm font-heading text-main-foreground shadow-sm transition-opacity hover:opacity-80"
          >
            Go to Contact
          </Link>
        </section>

        <section className="rounded-base border border-border/30 bg-background p-5 shadow-sm">
          <h2 className="mb-3 text-xl font-heading">
            Liability for Links
          </h2>
          <p className="text-sm leading-relaxed md:text-base">
            This website contains links to external platforms (in particular
            GitHub). I have no control over the content of these external sites.
            At the time the links were posted, no legal violations were
            apparent. However, it is not reasonable to expect me to continuously
            monitor the linked sites without specific evidence of wrongdoing. If
            I become aware of any legal violations, I will remove such links
            immediately.
          </p>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
