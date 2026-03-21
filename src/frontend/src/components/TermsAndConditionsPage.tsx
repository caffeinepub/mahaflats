import { ArrowLeft, Building2 } from "lucide-react";
import Footer from "./Footer";

const LAST_UPDATED = "March 21, 2026";

export default function TermsAndConditionsPage({
  onBack,
}: { onBack: () => void }) {
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
            data-ocid="terms.link"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display font-bold text-4xl text-foreground mb-1">
            Terms of Service &amp; User Agreement
          </h1>
          <p className="text-base text-muted-foreground mb-1">
            Last Updated: {LAST_UPDATED}
          </p>
          <p className="text-muted-foreground mb-10">
            Welcome to mahaflats-q1b.caffeine.xyz. By accessing or using our
            website/application, you agree to comply with and be bound by the
            following terms and conditions.
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By using this platform, you confirm that you are at least 18
                years old or have legal parental/guardian consent. If you do not
                agree with any part of these terms, please do not use our
                services.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                2. Intellectual Property Rights
              </h2>
              <p>
                All content, including text, graphics, logos, and images
                available on this site, is the property of MahaFlats and is
                protected by copyright laws. You may not reproduce, distribute,
                or use any content for commercial purposes without our prior
                written consent.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                3. User Conduct
              </h2>
              <p className="mb-3">Users agree NOT to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the site for any unlawful or fraudulent activities.</li>
                <li>
                  Post or transmit any content that is defamatory, obscene, or
                  infringes on others' rights.
                </li>
                <li>
                  Attempt to bypass any security features or reverse-engineer
                  the platform.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                4. Third-Party Services &amp; Ads (AdMob/AdSense)
              </h2>
              <p>
                We use third-party advertising companies (like Google AdSense
                and AdMob) to serve ads when you visit our platform. These
                companies may use cookies and device identifiers to show
                personalized ads based on your visits to this and other sites.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                5. Disclaimer of Warranties
              </h2>
              <p>
                The information provided on MahaFlats is for general
                informational purposes only (e.g., real estate listings,
                property guides). While we strive for accuracy, we do not
                guarantee that the content is error-free, complete, or current.
                Use of the information is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                In no event shall MahaFlats be liable for any direct, indirect,
                or incidental damages arising out of your use or inability to
                use the service.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                7. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Your
                continued use of the site after changes are posted constitutes
                your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                8. Property Listings
              </h2>
              <p className="mb-3">
                Mahaflats provides a marketplace for property listings. All
                listings are submitted by registered sellers and brokers. While
                we make reasonable efforts to review listings for quality and
                accuracy, Mahaflats does not independently verify all property
                details, titles, or ownership claims.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">
                    Seller Responsibility:
                  </strong>{" "}
                  Sellers are solely responsible for the accuracy, completeness,
                  and legality of their property listings.
                </li>
                <li>
                  <strong className="text-foreground">Admin Approval:</strong>{" "}
                  All listings are subject to admin review and approval before
                  being published on the Platform.
                </li>
                <li>
                  <strong className="text-foreground">RERA Compliance:</strong>{" "}
                  Sellers listing under-construction properties must ensure
                  their project is registered with MahaRERA.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                9. Payment Terms
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">
                    Property Listing Fee:
                  </strong>{" "}
                  ₹1,000 per property per year. Published only after payment
                  confirmation and admin approval.
                </li>
                <li>
                  <strong className="text-foreground">
                    Broker Subscription:
                  </strong>{" "}
                  ₹4,000 for a 6-month subscription. Activated only after
                  payment confirmation and admin approval.
                </li>
                <li>
                  <strong className="text-foreground">Payment Method:</strong>{" "}
                  All payments via UPI to 7447428486@ibl. Payers must submit
                  their UTR/transaction ID for verification.
                </li>
                <li>
                  <strong className="text-foreground">
                    Non-Refundable Policy:
                  </strong>{" "}
                  All fees are non-refundable once a listing or broker account
                  has been activated.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                10. Privacy and Data Protection
              </h2>
              <p>
                Your use of the Platform is also governed by our{" "}
                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = "privacy-policy";
                  }}
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </button>
                , which is incorporated into these Terms by reference. Seller
                and broker contact details are kept strictly confidential and
                accessible only to the admin.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                11. Dispute Resolution
              </h2>
              <p>
                These Terms are governed by the laws of India. Any disputes
                shall be subject to the exclusive jurisdiction of the courts of
                Mumbai, Maharashtra, India.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                12. Contact Information
              </h2>
              <ul className="list-none space-y-1">
                <li>
                  <strong className="text-foreground">Website:</strong>{" "}
                  mahaflats.com
                </li>
                <li>
                  <strong className="text-foreground">Email:</strong>{" "}
                  admin@mahaflats.com
                </li>
                <li>
                  <strong className="text-foreground">WhatsApp:</strong> +91
                  7447428486
                </li>
                <li>
                  <strong className="text-foreground">Address:</strong>{" "}
                  Maharashtra, India
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
