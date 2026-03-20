import { ArrowLeft, Building2 } from "lucide-react";
import Footer from "./Footer";

const LAST_UPDATED = "March 20, 2026";

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
          <h1 className="font-display font-bold text-4xl text-foreground mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                1. Introduction and Acceptance of Terms
              </h2>
              <p>
                Welcome to Mahaflats.com ("Website", "Platform", "we", "our", or
                "us"). Mahaflats is an online real estate marketplace that
                connects property buyers, sellers, and brokers across
                Maharashtra, India. By accessing or using this Website, you
                agree to be legally bound by these Terms and Conditions
                ("Terms"). If you do not agree to these Terms, please
                discontinue use of the Platform immediately.
              </p>
              <p className="mt-3">
                These Terms apply to all visitors, registered users, property
                sellers, brokers, and any other individuals who interact with
                the Mahaflats platform. We reserve the right to update these
                Terms at any time. Continued use of the Platform after changes
                are posted constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                2. Use of the Platform
              </h2>
              <p className="mb-3">
                Mahaflats grants you a limited, non-exclusive, non-transferable
                licence to access and use the Platform for lawful purposes. You
                agree to use the Platform only in ways that are permitted by
                these Terms and in compliance with all applicable laws and
                regulations.
              </p>
              <p className="mb-3 font-medium text-foreground">
                Prohibited Activities:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Posting false, misleading, or fraudulent property listings.
                </li>
                <li>Impersonating any person, entity, or property owner.</li>
                <li>
                  Using automated tools, bots, or scrapers to extract data from
                  the Platform.
                </li>
                <li>
                  Attempting to gain unauthorised access to admin sections, user
                  accounts, or backend systems.
                </li>
                <li>
                  Uploading or transmitting malicious code, viruses, or harmful
                  content.
                </li>
                <li>
                  Engaging in any activity that disrupts, damages, or impairs
                  the Website's functionality.
                </li>
                <li>
                  Using the Platform for any unlawful, fraudulent, or deceptive
                  purpose.
                </li>
                <li>
                  Violating the privacy of other users by collecting their
                  contact information without consent.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                3. Property Listings
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
                  and legality of their property listings. Sellers warrant that
                  they have the legal right to list and sell the property in
                  question.
                </li>
                <li>
                  <strong className="text-foreground">
                    Accuracy of Information:
                  </strong>{" "}
                  All property details including price, size, location, and
                  amenities must be accurate and not misleading. Mahaflats
                  reserves the right to remove any listing that is found to be
                  inaccurate or violates these Terms.
                </li>
                <li>
                  <strong className="text-foreground">Admin Approval:</strong>{" "}
                  All listings are subject to admin review and approval before
                  being published on the Platform. Mahaflats reserves the right
                  to reject any listing at its discretion.
                </li>
                <li>
                  <strong className="text-foreground">RERA Compliance:</strong>{" "}
                  Sellers listing under-construction properties must ensure
                  their project is registered with MahaRERA. Mahaflats is not
                  responsible for any non-compliance with RERA or other real
                  estate regulations.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                4. Buyer and Seller Responsibilities
              </h2>
              <p className="mb-3 font-medium text-foreground">
                Buyers agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Use the Platform for genuine property search purposes only.
                </li>
                <li>
                  Contact the admin via the provided WhatsApp channel to inquire
                  about properties — direct seller contact is not facilitated by
                  the Platform.
                </li>
                <li>
                  Conduct their own due diligence including legal title
                  verification, RERA checks, and site visits before making any
                  purchase decision.
                </li>
                <li>
                  Acknowledge that Mahaflats is a facilitator and not a party to
                  any property transaction.
                </li>
              </ul>
              <p className="mb-3 font-medium text-foreground">
                Sellers agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Provide accurate and truthful information about their
                  property.
                </li>
                <li>
                  Pay the applicable listing fee of ₹1,000 per property per year
                  before their listing is activated.
                </li>
                <li>
                  Not contact buyers directly through any information obtained
                  via the Platform.
                </li>
                <li>
                  Comply with all applicable real estate laws including RERA,
                  FEMA (for NRI transactions), and Maharashtra stamp duty
                  regulations.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                5. Payment Terms
              </h2>
              <p className="mb-3">
                The following fees apply to users of the Mahaflats Platform:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-foreground">
                    Property Listing Fee:
                  </strong>{" "}
                  Sellers are charged a listing fee of ₹1,000 per property per
                  year. Properties are published only after payment is confirmed
                  and admin approval is granted.
                </li>
                <li>
                  <strong className="text-foreground">
                    Broker Subscription:
                  </strong>{" "}
                  Brokers are charged a subscription fee of ₹4,000 for a 6-month
                  subscription. Broker accounts are activated only after payment
                  confirmation and explicit admin approval.
                </li>
                <li>
                  <strong className="text-foreground">Payment Method:</strong>{" "}
                  All payments are made via UPI to the UPI ID: 7447428486@ibl.
                  Payers must submit their UTR/transaction ID after payment for
                  verification.
                </li>
                <li>
                  <strong className="text-foreground">
                    Non-Refundable Policy:
                  </strong>{" "}
                  All fees paid to Mahaflats are non-refundable once a listing
                  or broker account has been activated. In cases where
                  activation is denied after payment, the matter will be
                  reviewed on a case-by-case basis by the admin.
                </li>
                <li>
                  <strong className="text-foreground">
                    Subscription Renewal:
                  </strong>{" "}
                  Broker subscriptions expire after 6 months. Expired brokers
                  must renew their subscription and obtain admin approval to
                  regain dashboard access.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                6. Privacy and Data Protection
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
                , which is incorporated into these Terms by reference. By using
                Mahaflats, you consent to the collection and use of your data as
                described in the Privacy Policy. Seller and broker contact
                details including phone numbers are kept strictly confidential
                and are accessible only to the admin — they are never displayed
                to buyers or other users.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                7. Intellectual Property
              </h2>
              <p className="mb-3">
                All content on Mahaflats.com including but not limited to the
                website design, logo, graphics, text, blog articles, and
                software code is the intellectual property of Mahaflats or its
                content suppliers and is protected by applicable copyright and
                trademark laws.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  You may not copy, reproduce, distribute, or create derivative
                  works from any content on this Website without explicit
                  written permission.
                </li>
                <li>
                  Property images uploaded by sellers remain their property, but
                  by uploading them, sellers grant Mahaflats a non-exclusive
                  licence to display them on the Platform.
                </li>
                <li>
                  Unauthorised use of any Mahaflats intellectual property may
                  result in legal action.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                8. Limitation of Liability
              </h2>
              <p className="mb-3">
                Mahaflats is a marketplace platform and an intermediary between
                buyers, sellers, and brokers. To the maximum extent permitted by
                applicable law:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Mahaflats is not a party to any property transaction between
                  buyers and sellers.
                </li>
                <li>
                  Mahaflats does not provide real estate advisory, legal,
                  financial, or valuation services.
                </li>
                <li>
                  Mahaflats is not liable for any losses, damages, or disputes
                  arising from property transactions facilitated through the
                  Platform.
                </li>
                <li>
                  Mahaflats does not guarantee the accuracy of property
                  listings, seller representations, or market valuations.
                </li>
                <li>
                  Users rely on Platform content at their own risk and are
                  advised to conduct independent due diligence before any
                  property purchase or sale.
                </li>
                <li>
                  In no event shall Mahaflats' total liability to any user
                  exceed the amount of fees paid by that user to Mahaflats in
                  the preceding 12 months.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                9. Dispute Resolution
              </h2>
              <p className="mb-3">
                These Terms and any disputes arising out of or related to your
                use of Mahaflats shall be governed by and construed in
                accordance with the laws of India, without regard to conflict of
                law principles.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Any disputes between users and Mahaflats shall first be
                  attempted to be resolved through good faith negotiations.
                </li>
                <li>
                  If negotiations fail, disputes shall be subject to the
                  exclusive jurisdiction of the courts of Mumbai, Maharashtra,
                  India.
                </li>
                <li>
                  Disputes between buyers and sellers arising from property
                  transactions are outside the scope of Mahaflats'
                  responsibility. Parties to such disputes should seek
                  independent legal counsel.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                10. Contact Information
              </h2>
              <p className="mb-3">
                If you have questions about these Terms and Conditions, please
                contact us:
              </p>
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
