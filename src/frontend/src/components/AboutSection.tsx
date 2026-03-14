import { Award, MapPin, Shield, Users } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { icon: Users, value: "50,000+", label: "Happy Families" },
  { icon: MapPin, value: "5 Cities", label: "Across Maharashtra" },
  { icon: Award, value: "8+ Years", label: "Market Experience" },
  { icon: Shield, value: "100%", label: "Verified Sellers" },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">About Us</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Maharashtra's Most Trusted
              <span className="block text-gradient">Real Estate Platform</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Mahaflats.com was founded with a simple mission: to make property
              buying and selling transparent, affordable, and accessible to
              every Maharashtrian. We bridge the gap between genuine buyers and
              verified sellers across all major cities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Unlike other portals, we personally verify each listing and
              maintain strict privacy policies. Seller contact details are
              protected — all inquiries go through our admin team to ensure a
              safe and scam-free experience.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <Icon className="w-5 h-5 text-primary mb-2" />
                  <div className="font-display text-2xl font-bold text-foreground">
                    {value}
                  </div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
                alt="Premium apartment"
                className="rounded-2xl w-full aspect-square object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400"
                alt="Luxury villa"
                className="rounded-2xl w-full aspect-square object-cover mt-8"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
                alt="Modern interior"
                className="rounded-2xl w-full aspect-square object-cover -mt-8"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"
                alt="City apartment"
                className="rounded-2xl w-full aspect-square object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-primary/20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
