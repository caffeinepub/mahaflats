import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CITIES = ["All Cities", "Mumbai", "Pune", "Thane", "Nagpur", "Nashik"];

interface HeroProps {
  onCityFilter: (city: string) => void;
}

export default function Hero({ onCityFilter }: HeroProps) {
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const handleSearch = () => {
    onCityFilter(selectedCity);
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
  };

  const dotPattern =
    "radial-gradient(circle at 2px 2px, oklch(0.97 0.005 252) 1px, transparent 0)";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: dotPattern,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 pt-24 pb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Maharashtra's #1 Property Portal
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            Find Your
            <span className="block text-gradient">Dream Home</span>
            in Maharashtra
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Browse thousands of verified properties across Mumbai, Pune, Thane,
            Nagpur, and Nashik. Direct listings from verified sellers at the
            best prices.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl p-3 flex gap-3 shadow-card">
              <div className="flex-1">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger
                    data-ocid="hero.city_select"
                    className="border-0 bg-transparent text-foreground h-12 text-base focus:ring-0"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {CITIES.map((city) => (
                      <SelectItem
                        key={city}
                        value={city}
                        className="text-foreground hover:bg-secondary"
                      >
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                data-ocid="hero.search_button"
                onClick={handleSearch}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-xl font-semibold"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { icon: TrendingUp, label: "Active Listings", value: "2,400+" },
              { icon: MapPin, label: "Cities Covered", value: "5 Cities" },
              { icon: Search, label: "Properties Sold", value: "12,000+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-display font-bold text-foreground">
                    {value}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
