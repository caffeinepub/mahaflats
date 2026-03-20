import { ArrowLeft, Building2 } from "lucide-react";
import Footer from "./Footer";

const LAST_UPDATED = "March 20, 2026";

export default function PrivacyPolicyPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Maha<span className="text-primary">Flats</span>
              <span className="text-muted-foreground text-xs font-normal">
                .com
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={onBack}
            data-ocid="privacy.link"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display font-bold text-4xl text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                1. Introduction
              </h2>
              <p>
                Welcome to Mahaflats.com ("we", "our", or "us"). We are
                committed to protecting your personal information and your right
                to privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website{" "}
                <strong className="text-foreground">mahaflats.com</strong>.
              </p>
              <p className="mt-3">
                Please read this policy carefully. If you disagree with its
                terms, please discontinue use of the site.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                We may collect information about you in the following ways:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Personal Data:</strong>{" "}
                  Name, email address, phone number, and other identifiers you
                  voluntarily provide when registering as a seller or broker.
                </li>
                <li>
                  <strong className="text-foreground">Property Data:</strong>{" "}
                  Details about properties you submit for listing, including
                  photos, descriptions, and pricing.
                </li>
                <li>
                  <strong className="text-foreground">Payment Data:</strong>{" "}
                  Transaction reference numbers (UTR/UPI IDs) for listing fee
                  and subscription payments. We do not store card or banking
                  credentials.
                </li>
                <li>
                  <strong className="text-foreground">Usage Data:</strong> IP
                  address, browser type, pages visited, time spent on pages, and
                  referring URLs collected automatically via server logs and
                  analytics.
                </li>
                <li>
                  <strong className="text-foreground">Cookies:</strong> Small
                  data files stored on your device to maintain sessions,
                  remember preferences, and measure site performance.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create and manage your seller or broker account.</li>
                <li>
                  Review, approve, or reject property listings and broker
                  subscriptions.
                </li>
                <li>
                  Process listing fee and subscription payment confirmations.
                </li>
                <li>Respond to inquiries submitted via WhatsApp or email.</li>
                <li>
                  Improve website performance, content, and user experience.
                </li>
                <li>Comply with applicable laws and regulations.</li>
                <li>
                  Serve relevant advertisements via Google AdSense and other ad
                  networks.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                4. Data Sharing and Disclosure
              </h2>
              <p className="mb-3">
                We do not sell, trade, or rent your personal information to
                third parties. We may share data only in the following
                circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Admin Only:</strong>{" "}
                  Seller and broker phone numbers are accessible exclusively to
                  the website administrator — never displayed to buyers or other
                  users.
                </li>
                <li>
                  <strong className="text-foreground">
                    Legal Requirements:
                  </strong>{" "}
                  We may disclose information when required by law, court order,
                  or governmental authority.
                </li>
                <li>
                  <strong className="text-foreground">
                    Service Providers:
                  </strong>{" "}
                  Trusted third-party services (e.g., hosting, analytics) may
                  access data only as necessary to operate the platform.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="mb-3">
                Mahaflats.com uses cookies to maintain user sessions and improve
                site functionality. By continuing to use the site, you consent
                to the use of cookies in accordance with this policy.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">Session Cookies:</strong>{" "}
                  Temporary cookies used to keep you logged in during a session.
                  Deleted when you close your browser.
                </li>
                <li>
                  <strong className="text-foreground">
                    Preference Cookies:
                  </strong>{" "}
                  Remember your settings such as city filter selections.
                </li>
                <li>
                  <strong className="text-foreground">
                    Analytics Cookies:
                  </strong>{" "}
                  Track aggregate usage data to help us improve the website.
                </li>
                <li>
                  <strong className="text-foreground">
                    Advertising Cookies:
                  </strong>{" "}
                  Used by Google AdSense and other ad networks to serve relevant
                  ads.
                </li>
              </ul>
              <p className="mt-3">
                You can disable cookies in your browser settings, but this may
                affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                6. Third-Party Services — Google AdSense
              </h2>
              <p className="mb-3">
                Mahaflats.com participates in Google AdSense to display
                advertisements. Google may use cookies and similar technologies
                to show ads based on your prior visits to this and other
                websites.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Google's use of advertising cookies enables it and its
                  partners to serve ads based on your visit to our site and
                  other sites on the Internet.
                </li>
                <li>
                  You may opt out of personalised advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Ads Settings
                  </a>
                  .
                </li>
                <li>
                  For more information on how Google uses data when you use our
                  site, visit{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google's Privacy &amp; Terms
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                7. Data Security
              </h2>
              <p>
                We implement appropriate technical and organisational measures
                to protect your personal information against unauthorised
                access, alteration, disclosure, or destruction. Admin access is
                restricted to the website owner via a secure, hidden URL. Broker
                and seller credentials are stored with industry-standard
                hashing.
              </p>
              <p className="mt-3">
                However, no method of internet transmission or electronic
                storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                8. Your Rights
              </h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access the personal information we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request deletion of your account and associated data.</li>
                <li>
                  Withdraw consent for data processing where consent was the
                  legal basis.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us via WhatsApp at +91
                7447428486 or email contact@mahaflats.com.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                9. Children's Privacy
              </h2>
              <p>
                Mahaflats.com is not directed at children under the age of 18.
                We do not knowingly collect personal information from minors. If
                you believe we have inadvertently collected such data, please
                contact us immediately and we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                10. Changes to This Privacy Policy
              </h2>
              <p>
                We reserve the right to update this Privacy Policy at any time.
                Changes will be posted on this page with an updated "Last
                updated" date. Continued use of the site after any modifications
                constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                11. Contact Information
              </h2>
              <p className="mb-3">
                If you have questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <ul className="list-none space-y-1">
                <li>
                  <strong className="text-foreground">Website:</strong>{" "}
                  mahaflats.com
                </li>
                <li>
                  <strong className="text-foreground">WhatsApp:</strong> +91
                  7447428486
                </li>
                <li>
                  <strong className="text-foreground">Email:</strong>{" "}
                  contact@mahaflats.com
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
