import { Badge } from "@/components/ui/badge";
import { BedDouble, MapPin, Maximize2 } from "lucide-react";
import type { Property } from "../backend.d";
import { formatPrice } from "../lib/formatPrice";
import InquiryDialog from "./InquiryDialog";

interface PropertyCardProps {
  property: Property;
  index: number;
}

const TYPE_COLORS: Record<string, string> = {
  "1BHK": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "2BHK": "bg-green-500/20 text-green-300 border-green-500/30",
  "3BHK": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Villa: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Plot: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function PropertyCard({ property, index }: PropertyCardProps) {
  const photoUrl =
    property.photoUrls[0] ??
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600";
  const typeColor =
    TYPE_COLORS[property.propertyType] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <div
      data-ocid={`property.item.${index}`}
      className="card-hover bg-card border border-border rounded-xl overflow-hidden group"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photoUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColor}`}
          >
            {property.propertyType}
          </span>
        </div>
        {property.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground text-xs">
              Featured
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="font-display font-bold text-xl text-white">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-base leading-snug mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">
            {property.location}, {property.city}
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {property.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BedDouble className="w-4 h-4" />
            <span>{Number(property.bedrooms)} Bed</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Maximize2 className="w-4 h-4" />
            <span>{Number(property.area)} sq ft</span>
          </div>
        </div>

        <InquiryDialog property={property} triggerIndex={index} />
      </div>
    </div>
  );
}
