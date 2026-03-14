import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useFeaturedProperties } from "../hooks/useQueries";
import PropertyCard from "./PropertyCard";

const SKELETON_KEYS = ["sk1", "sk2", "sk3"];

export default function FeaturedProperties() {
  const { data: properties, isLoading } = useFeaturedProperties();

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
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-primary font-medium">Top Picks</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Handpicked premium properties from verified sellers across
            Maharashtra.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKELETON_KEYS.map((key) => (
              <div key={key} className="bg-card rounded-xl overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full bg-muted" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4 bg-muted" />
                  <Skeleton className="h-4 w-1/2 bg-muted" />
                  <Skeleton className="h-10 w-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(properties ?? []).map((property, i) => (
              <motion.div
                key={property.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
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
