import {
  ArrowLeft,
  Building2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Footer from "./Footer";

export default function ContactUsPage({ onBack }: { onBack: () => void }) {
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
            data-ocid="contact.link"
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
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              We're here to help. Reach out via WhatsApp, email, or phone.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-green-600/15 flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  WhatsApp
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fastest way to reach us — typically respond within minutes.
                </p>
                <a
                  href="https://wa.me/917447428486"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.primary_button"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Phone
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Call us directly during business hours for urgent queries.
                </p>
                <a
                  href="tel:+917447428486"
                  data-ocid="contact.secondary_button"
                  className="inline-flex items-center gap-2 border border-border text-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 7447428486
                </a>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Email
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us an email for non-urgent inquiries and listing
                  requests.
                </p>
                <a
                  href="mailto:contact@mahaflats.com"
                  className="text-sm text-primary hover:underline"
                >
                  contact@mahaflats.com
                </a>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Service Area
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mumbai, Pune, Thane, Nagpur, and Nashik — covering all major
                  cities in Maharashtra.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  Response Time
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  WhatsApp messages are typically answered within 30 minutes
                  during business hours (Mon–Sat, 9:00 AM – 7:00 PM). Email
                  responses may take up to 24 hours. For urgent property
                  inquiries, WhatsApp is always the fastest option.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card border-t border-border py-14">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Ready to Find Your Perfect Flat?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact us on WhatsApp and we'll help you navigate the Maharashtra
              real estate market.
            </p>
            <a
              href="https://wa.me/917447428486"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.primary_button"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Us on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
