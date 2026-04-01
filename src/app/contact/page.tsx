import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details protected by Cloudflare Turnstile.",
};

function getContactEmails() {
  return [
    process.env.CONTACT_EMAIL_1,
    process.env.CONTACT_EMAIL_2,
    process.env.CONTACT_EMAIL_3,
  ].filter((email): email is string => Boolean(email));
}

export default async function ContactPage() {
  const cookieStore = await cookies();
  const isUnlocked = cookieStore.get("contact_unlocked")?.value === "1";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const discordUsername = "jumpstone4477";
  const emails = isUnlocked ? getContactEmails() : [];

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-0 md:px-8 md:pb-0">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[36px_36px] opacity-10" />

        <section className="mb-8 rounded-base border-2 border-border bg-main p-6 text-main-foreground shadow-shadow md:p-8">
          <h1 className="mb-2 text-3xl font-heading uppercase tracking-wide md:text-4xl">
            Contact
          </h1>
        </section>

        <section className="mb-8 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow md:p-8">
          <div className="rounded-base border-2 border-border bg-background p-5 shadow-shadow">
            <h2 className="mb-3 text-xl font-heading uppercase tracking-wide">
              Discord
            </h2>
            <p className="text-sm leading-relaxed md:text-base">
              <span className="font-heading">@{discordUsername}</span>
            </p>
          </div>
        </section>

        <article className="mb-8 rounded-base border-2 border-border bg-secondary-background p-6 shadow-shadow md:p-8">
          {isUnlocked ? (
            <section className="rounded-base border-2 border-border bg-background p-5 shadow-shadow">
              <h2 className="mb-3 text-xl font-heading uppercase tracking-wide">
                Email Addresses
              </h2>
              {emails.length === 0 ? (
                <p className="text-sm leading-relaxed md:text-base">
                  No contact emails are configured yet. Please set
                  CONTACT_EMAIL_1..3 in your env file.
                </p>
              ) : (
                <ul className="space-y-2 text-sm md:text-base">
                  {emails.map((email) => (
                    <li key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="underline underline-offset-2"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : (
            <section className="rounded-base border-2 border-border bg-background p-5 shadow-shadow">
              <h2 className="mb-3 text-xl font-heading uppercase tracking-wide">
                Unlock Email Addresses
              </h2>
              <p className="mb-4 text-sm leading-relaxed md:text-base">
                Complete the Turnstile challenge to view the three email
                addresses.
              </p>

              {!siteKey ? (
                <p className="text-sm leading-relaxed text-red-700 md:text-base">
                  Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY in env.
                </p>
              ) : (
                <form
                  action="/contact/verify"
                  method="post"
                  className="space-y-4"
                >
                  <div
                    className="cf-turnstile"
                    data-sitekey={siteKey}
                    data-theme="auto"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-base border-2 border-border bg-main px-4 py-2 text-sm font-heading uppercase tracking-wide text-main-foreground shadow-shadow transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    Verify and Show Emails
                  </button>
                </form>
              )}
            </section>
          )}
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
