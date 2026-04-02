import {
  ArrowLeft,
  Building2,
  CheckCircle,
  MapPin,
  MessageCircle,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Footer from "./Footer";

const CITIES = ["Mumbai", "Pune", "Thane", "Nagpur", "Nashik"];

const WHY_CHOOSE = [
  {
    icon: Shield,
    title: "Verified Listings",
    desc: "Every property is reviewed and approved by our team before going live.",
  },
  {
    icon: Users,
    title: "Trusted Brokers",
    desc: "Our registered brokers go through a strict approval process for your safety.",
  },
  {
    icon: Star,
    title: "Maharashtra Focus",
    desc: "We specialise exclusively in Maharashtra real estate, giving you deeper local insight.",
  },
  {
    icon: CheckCircle,
    title: "Privacy First",
    desc: "Your personal details are never shared with buyers without your consent.",
  },
];

export default function AboutUsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Maharashtra<span className="text-primary"> Flats</span>
              <span className="text-muted-foreground text-xs font-normal">
                .com
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={onBack}
            data-ocid="about.link"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-card border-b border-border py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              About <span className="text-primary">Maharashtra Flats</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Maharashtra's trusted real estate marketplace — connecting genuine
              buyers, verified sellers, and approved brokers.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">
              Who We Are
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Maharashtra Flats is a growing digital platform dedicated to
              helping users find reliable property-related information and
              services in a simple and transparent way. Our mission is to make
              property discovery easier, faster, and more accessible for
              everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We focus on connecting users with genuine property opportunities,
              useful listings, and location-based insights to support smarter
              decisions. At Maharashtra Flats, we believe in building trust
              through clarity, simplicity, and user-friendly experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform is continuously improving to provide better services,
              accurate information, and a smooth browsing experience for all
              visitors.
            </p>
          </div>
        </section>

        <section className="bg-card border-y border-border py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To make property discovery easier, faster, and more accessible for
              everyone — with a clear, fair, and transparent process for buyers,
              sellers, and brokers across Maharashtra.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              What We Offer
            </h2>
            <ul className="space-y-3">
              {[
                "Browse verified flat listings across Maharashtra",
                "List your property with a simple one-time fee of ₹1,000/year",
                "Registered broker accounts with subscription management",
                "Admin-reviewed listings — no spam, no fake properties",
                "Contact admin directly via WhatsApp for any inquiry",
                "Mobile-friendly experience for searching on the go",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-card border-y border-border py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              Cities We Serve
            </h2>
            <div className="flex flex-wrap gap-3">
              {CITIES.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display font-bold text-2xl text-foreground mb-8">
              Why Choose Maharashtra Flats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_CHOOSE.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card border-t border-border py-14">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-6">
              Have questions? Our team is just a WhatsApp message away.
            </p>
            <a
              href="https://wa.me/917447428486"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.primary_button"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us on WhatsApp
            </a>
          </div>
        </section>

        <section className="border-t border-border py-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display font-bold text-xl text-foreground mb-4">
              Ownership
            </h2>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Owned by:</span>{" "}
                Arman Hamju Mulani
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Powered by:
                </span>{" "}
                Maharashtra Flats.com
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
