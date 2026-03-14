import { Eye, HeartHandshake, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is manually reviewed by our team before going live. No fake listings, no inflated prices.",
  },
  {
    icon: Lock,
    title: "Seller Privacy Protected",
    description:
      "Seller phone numbers are never shared publicly. All buyer inquiries are routed through our secure admin system.",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description:
      "We charge a flat ₹1,000/year listing fee — no hidden commissions, no surprises. What you see is what you pay.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description:
      "Our team is available on WhatsApp 6 days a week to help both buyers and sellers through every step.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Why Trust Us
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Safe, Transparent & Reliable
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We built Mahaflats to solve the problems every property buyer and
            seller faces — fraud, hidden fees, and lack of accountability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
