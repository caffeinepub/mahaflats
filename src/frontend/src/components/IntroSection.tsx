import {
  Building2,
  CheckCircle2,
  Home,
  MapPin,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export default function IntroSection() {
  return (
    <section className="py-20 bg-secondary/20" id="intro">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              About Mahaflats
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Maharashtra's Most Trusted
            <span className="block text-gradient">Real Estate Platform</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none"
          >
            <p className="text-muted-foreground leading-relaxed text-base mb-5">
              Welcome to{" "}
              <strong className="text-foreground">Mahaflats.com</strong> —
              Maharashtra's dedicated real estate marketplace, built to simplify
              property discovery for buyers and make listing properties
              effortless for owners and brokers. Whether you're a first-time
              home buyer searching for your dream flat in Mumbai, a young
              professional looking for an affordable 2BHK in Pune, or a property
              owner wanting to reach genuine local buyers, Mahaflats is the
              platform designed specifically for you.
            </p>

            <p className="text-muted-foreground leading-relaxed text-base mb-5">
              Finding a flat in Maharashtra has traditionally been a complex,
              time-consuming process filled with middlemen, inflated prices, and
              privacy concerns. Mahaflats changes that completely. We've created
              a transparent, privacy-first marketplace where every listing is
              manually reviewed by our admin team before going live, ensuring
              that every property you see is genuine, accurately described, and
              fairly priced.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              For Buyers: Search with Confidence
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base mb-5">
              As a buyer on Mahaflats, you have access to hundreds of verified
              properties across seven major Maharashtra cities — Mumbai, Pune,
              Thane, Nagpur, Nashik, Navi Mumbai, and Aurangabad. Our powerful
              search and filter tools let you narrow down listings by city,
              property type, price range, and more. Each listing includes
              comprehensive details, photos, and location information so you can
              make informed decisions without wasting time on site visits for
              unsuitable properties.
            </p>

            <p className="text-muted-foreground leading-relaxed text-base mb-5">
              Your privacy and safety are our top priorities. Seller and broker
              contact details are never shared publicly — all buyer inquiries
              are handled through our secure admin system. Simply click "Contact
              for Details" on any listing, and our team will coordinate the
              connection professionally. This protects you from unsolicited
              calls and ensures that every introduction is properly documented.
            </p>

            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              For Sellers: List with Ease
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base mb-5">
              Property owners can choose from two listing options tailored to
              their needs. Our{" "}
              <strong className="text-foreground">Free Property Listing</strong>{" "}
              option gets your property in front of local buyers at no upfront
              cost — you only pay a 1% success fee after a successful deal. For
              owners who want faster results, our{" "}
              <strong className="text-foreground">
                Fast Selling Listing at ₹1,000
              </strong>{" "}
              provides top-position visibility on the platform, a dedicated ₹500
              Facebook promotion targeting nearby buyers, and significantly
              faster inquiry turnaround. The 1% success fee still applies after
              deal completion.
            </p>

            <p className="text-muted-foreground leading-relaxed text-base">
              Listing on Mahaflats takes just minutes. Fill in your property
              details, upload photos, and agree to our transparent service
              terms. Our team reviews each submission within 24 hours and works
              diligently to connect you with verified, serious buyers. No spam
              inquiries, no time-wasters — just genuine connections that lead to
              successful deals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Why Choose Mahaflats?
              </h3>
              <ul className="space-y-3">
                {[
                  {
                    icon: Shield,
                    text: "Every listing manually reviewed before going live",
                  },
                  {
                    icon: Users,
                    text: "Seller & broker phone numbers never shared publicly",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Transparent pricing — no hidden commissions",
                  },
                  { icon: MapPin, text: "Covering 7 major Maharashtra cities" },
                  {
                    icon: TrendingUp,
                    text: "Fast Selling option with Facebook promotion",
                  },
                  {
                    icon: Home,
                    text: "Free listing option with zero upfront charges",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Cities We Cover
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Mumbai",
                  "Pune",
                  "Thane",
                  "Nagpur",
                  "Nashik",
                  "Navi Mumbai",
                  "Aurangabad",
                ].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/25 rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                For Brokers
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Licensed brokers can join Mahaflats on a subscription basis for
                ₹4,000 per 6 months, gaining unlimited property listing access
                and a professional dashboard to manage all their inventory.
                Broker accounts require admin approval to ensure only
                legitimate, verified brokers operate on the platform.
              </p>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = "broker";
                }}
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Join as a Broker →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
