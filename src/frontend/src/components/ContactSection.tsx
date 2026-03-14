import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        "Message sent! Arman from Mahaflats will contact you soon.",
      );
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Get in Touch
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Mahaflats
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about a property or need help listing? Reach out to
            Arman and our team.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-secondary/50 rounded-xl border border-border">
              <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Prefer WhatsApp?
                </p>
                <p className="text-xs text-muted-foreground">
                  Message Arman directly at{" "}
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    +91 99999 99999
                  </a>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="text-foreground">Your Name *</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Full name"
                    className="bg-secondary border-border text-foreground mt-1"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Phone Number *</Label>
                  <Input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+91 98765 43210"
                    className="bg-secondary border-border text-foreground mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-foreground">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="bg-secondary border-border text-foreground mt-1"
                />
              </div>
              <div>
                <Label className="text-foreground">Message *</Label>
                <Textarea
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell us what you're looking for or any questions you have..."
                  rows={4}
                  className="bg-secondary border-border text-foreground mt-1"
                />
              </div>
              <Button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
