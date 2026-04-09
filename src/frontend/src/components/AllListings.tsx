import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Grid3X3, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ListingPurpose } from "../backend.d";
import type { PropertyFilter } from "../backend.d";
import {
  useApprovedProperties,
  useSearchProperties,
} from "../hooks/useQueries";
import PropertyCard from "./PropertyCard";

const CITIES = [
  "All",
  "Mumbai",
  "Pune",
  "Thane",
  "Nagpur",
  "Nashik",
  "Navi Mumbai",
  "Aurangabad",
];

const PROPERTY_TYPES = [
  "All",
  "1BHK",
  "2BHK",
  "3BHK",
  "Villa",
  "Plot",
  "Commercial",
];

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

interface AllListingsProps {
  cityFilter: string;
}

interface ActiveFilters {
  city: string;
  propertyType: string;
  purpose: string;
  minPrice: string;
  maxPrice: string;
}

const DEFAULT_FILTERS: ActiveFilters = {
  city: "All",
  propertyType: "All",
  purpose: "All",
  minPrice: "",
  maxPrice: "",
};

function hasActiveFilter(f: ActiveFilters) {
  return (
    f.city !== "All" ||
    f.propertyType !== "All" ||
    f.purpose !== "All" ||
    f.minPrice !== "" ||
    f.maxPrice !== ""
  );
}

function buildFilter(f: ActiveFilters): PropertyFilter {
  const filter: PropertyFilter = {};
  if (f.city !== "All") filter.city = f.city;
  if (f.propertyType !== "All") filter.propertyType = f.propertyType;
  if (f.purpose === "forSale") filter.listingPurpose = ListingPurpose.forSale;
  if (f.purpose === "forRent") filter.listingPurpose = ListingPurpose.forRent;
  if (f.minPrice !== "") filter.minPrice = BigInt(Number(f.minPrice) * 100000);
  if (f.maxPrice !== "") filter.maxPrice = BigInt(Number(f.maxPrice) * 100000);
  return filter;
}

export default function AllListings({ cityFilter }: AllListingsProps) {
  const [filters, setFilters] = useState<ActiveFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<ActiveFilters>(DEFAULT_FILTERS);
  const [searchActive, setSearchActive] = useState(false);

  const { data: allProperties, isLoading: isLoadingAll } =
    useApprovedProperties();
  const builtFilter = buildFilter(appliedFilters);
  const { data: searchResults, isLoading: isLoadingSearch } =
    useSearchProperties(
      builtFilter,
      searchActive && hasActiveFilter(appliedFilters),
    );

  // Sync city filter from Hero search bar
  useEffect(() => {
    if (cityFilter && cityFilter !== "All Cities") {
      setFilters((f) => ({ ...f, city: cityFilter }));
      setAppliedFilters((f) => ({ ...f, city: cityFilter }));
      setSearchActive(true);
    } else {
      setFilters(DEFAULT_FILTERS);
      setAppliedFilters(DEFAULT_FILTERS);
      setSearchActive(false);
    }
  }, [cityFilter]);

  const handleSearch = () => {
    setAppliedFilters(filters);
    setSearchActive(hasActiveFilter(filters));
  };

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setSearchActive(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const displayProperties =
    searchActive && hasActiveFilter(appliedFilters)
      ? (searchResults ?? [])
      : (allProperties ?? []);

  const isLoading =
    searchActive && hasActiveFilter(appliedFilters)
      ? isLoadingSearch
      : isLoadingAll;

  const activeCount = [
    filters.city !== "All",
    filters.propertyType !== "All",
    filters.purpose !== "All",
    filters.minPrice !== "",
    filters.maxPrice !== "",
  ].filter(Boolean).length;

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

        {/* Advanced Search Filters */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground text-sm">
              Search &amp; Filter Properties
            </span>
            {activeCount > 0 && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                {activeCount} active
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* City */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                City
              </Label>
              <Select
                value={filters.city}
                onValueChange={(v) => setFilters((f) => ({ ...f, city: v }))}
              >
                <SelectTrigger className="bg-secondary border-border text-foreground h-9">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "All" ? "All Cities" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Property Type
              </Label>
              <Select
                value={filters.propertyType}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, propertyType: v }))
                }
              >
                <SelectTrigger className="bg-secondary border-border text-foreground h-9">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t === "All" ? "All Types" : t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Purpose */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                For Sale / Rent
              </Label>
              <Select
                value={filters.purpose}
                onValueChange={(v) => setFilters((f) => ({ ...f, purpose: v }))}
              >
                <SelectTrigger className="bg-secondary border-border text-foreground h-9">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="forSale">For Sale</SelectItem>
                  <SelectItem value="forRent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget min */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Min Budget (₹ Lakh)
              </Label>
              <Input
                type="number"
                min="0"
                placeholder="e.g. 20"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, minPrice: e.target.value }))
                }
                onKeyDown={handleKeyDown}
                className="bg-secondary border-border text-foreground h-9"
              />
            </div>

            {/* Budget max */}
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">
                Max Budget (₹ Lakh)
              </Label>
              <Input
                type="number"
                min="0"
                placeholder="e.g. 500"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, maxPrice: e.target.value }))
                }
                onKeyDown={handleKeyDown}
                className="bg-secondary border-border text-foreground h-9"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
            >
              <Search className="w-4 h-4" />
              Search Properties
            </Button>
            {hasActiveFilter(appliedFilters) && (
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-border text-muted-foreground hover:text-foreground gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        {!isLoading && (
          <div className="text-sm text-muted-foreground mb-6">
            {hasActiveFilter(appliedFilters) ? (
              <span>
                Showing{" "}
                <span className="text-foreground font-medium">
                  {displayProperties.length}
                </span>{" "}
                result{displayProperties.length !== 1 ? "s" : ""} matching your
                filters
              </span>
            ) : (
              <span>
                <span className="text-foreground font-medium">
                  {displayProperties.length}
                </span>{" "}
                properties available
              </span>
            )}
          </div>
        )}

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
        ) : displayProperties.length === 0 ? (
          <div data-ocid="properties.empty_state" className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No listings found
            </h3>
            <p className="text-muted-foreground">
              {hasActiveFilter(appliedFilters)
                ? "No properties match your search filters. Try adjusting your criteria."
                : "No properties found. Check back later."}
            </p>
            {hasActiveFilter(appliedFilters) && (
              <Button
                variant="outline"
                onClick={handleClear}
                className="mt-4 border-border text-muted-foreground hover:text-foreground"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProperties.map((property, i) => (
              <motion.div
                key={property.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: Math.min(i * 0.05, 0.3),
                  duration: 0.5,
                }}
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
