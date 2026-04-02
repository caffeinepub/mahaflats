import { Building2, MapPin, MessageCircle } from "lucide-react";

const LEGAL_LINKS = [
  { label: "About Us", hash: "about-us" },
  { label: "Contact Us", hash: "contact-us" },
  { label: "Privacy Policy", hash: "privacy-policy" },
  { label: "Terms & Conditions", hash: "terms-and-conditions" },
];

const CITIES = [
  "Mumbai",
  "Pune",
  "Thane",
  "Nagpur",
  "Nashik",
  "Navi Mumbai",
  "Aurangabad",
];

export default function Footer({
  onAdminClick,
}: { onAdminClick?: () => void }) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Maharashtra<span className="text-gradient"> Flats</span>
                <span className="text-muted-foreground text-sm font-body font-normal">
                  .com
                </span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Maharashtra's trusted real estate marketplace. Connecting genuine
              buyers and verified sellers across Mumbai, Pune, Thane, Nagpur,
              Nashik, Navi Mumbai and Aurangabad.
            </p>
            <a
              href="https://wa.me/917447428486"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: +91 7447428486
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                {
                  label: "Home",
                  action: () => {
                    window.location.hash = "";
                  },
                },
                {
                  label: "All Listings",
                  action: () => {
                    window.location.hash = "";
                    setTimeout(
                      () =>
                        document
                          .getElementById("listings")
                          ?.scrollIntoView({ behavior: "smooth" }),
                      100,
                    );
                  },
                },
                {
                  label: "Blog",
                  action: () => {
                    window.location.hash = "blog";
                  },
                },
                {
                  label: "List Property",
                  action: () => {
                    window.location.hash = "list-property";
                  },
                },
                {
                  label: "Request Visit",
                  action: () => {
                    window.location.hash = "buyer-visit";
                  },
                },
              ].map(({ label, action }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={action}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Information
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(({ label, hash }) => (
                <li key={hash}>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = hash;
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Cities We Serve
            </h4>
            <ul className="space-y-2">
              {CITIES.map((city) => (
                <li key={city} className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-sm text-muted-foreground">{city}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Maharashtra Flats.com. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
          {onAdminClick && (
            <button
              type="button"
              onClick={onAdminClick}
              className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              title="Admin Login"
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
