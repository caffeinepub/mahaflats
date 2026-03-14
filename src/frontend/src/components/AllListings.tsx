import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Grid3X3 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useApprovedProperties } from "../hooks/useQueries";
import PropertyCard from "./PropertyCard";

const CITIES = ["All", "Mumbai", "Pune", "Thane", "Nagpur", "Nashik"];
const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

interface AllListingsProps {
  cityFilter: string;
}

export default function AllListings({ cityFilter }: AllListingsProps) {
  const { data: properties, isLoading } = useApprovedProperties();
  const [activeCity, setActiveCity] = useState("All");

  useEffect(() => {
    if (cityFilter && cityFilter !== "All Cities") {
      setActiveCity(cityFilter);
    } else {
      setActiveCity("All");
    }
  }, [cityFilter]);

  const filtered =
    activeCity === "All"
      ? (properties ?? [])
      : (properties ?? []).filter((p) => p.city === activeCity);

  return (
    <section id="listings" className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-4">
            <Grid3X3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              Browse All
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Property Listings
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore all approved listings from verified sellers across
            Maharashtra.
          </p>
        </motion.div>

        {/* City Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CITIES.map((city) => (
            <Button
              key={city}
              data-ocid="hero.city_select"
              variant={activeCity === city ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCity(city)}
              className={
                activeCity === city
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }
            >
              {city}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SKELETON_KEYS.map((key) => (
              <div
                key={key}
                className="bg-card rounded-xl overflow-hidden"
                data-ocid="properties.loading_state"
              >
                <Skeleton className="aspect-[4/3] w-full bg-muted" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-muted" />
                  <Skeleton className="h-4 w-1/2 bg-muted" />
                  <Skeleton className="h-10 w-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div data-ocid="properties.empty_state" className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No listings found
            </h3>
            <p className="text-muted-foreground">
              No properties found in {activeCity}. Try another city or check
              back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((property, i) => (
              <motion.div
                key={property.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.5 }}
              >
                <PropertyCard property={property} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
