import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaymentStatus } from "../backend.d";
import type { BuyerLead, Property, PropertyStatus } from "../backend.d";
import { useActor } from "./useActor";

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 1n,
    title: "Luxurious 3BHK in Bandra West",
    city: "Mumbai",
    location: "Bandra West",
    propertyType: "3BHK",
    price: 25000000n,
    area: 1450n,
    bedrooms: 3n,
    description:
      "Beautiful sea-facing apartment with modern amenities, stunning views, and premium finishes.",
    photoUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
    ],
    isFeatured: true,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
  {
    id: 2n,
    title: "Spacious 2BHK in Kothrud",
    city: "Pune",
    location: "Kothrud",
    propertyType: "2BHK",
    price: 8500000n,
    area: 1100n,
    bedrooms: 2n,
    description:
      "Prime location near IT hubs with excellent connectivity and great neighbourhood.",
    photoUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    ],
    isFeatured: true,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
  {
    id: 3n,
    title: "Modern 1BHK in Thane West",
    city: "Thane",
    location: "Thane West",
    propertyType: "1BHK",
    price: 5500000n,
    area: 650n,
    bedrooms: 1n,
    description:
      "Compact and affordable flat perfect for young professionals and first-time buyers.",
    photoUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    ],
    isFeatured: false,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
  {
    id: 4n,
    title: "Premium Villa in Koregaon Park",
    city: "Pune",
    location: "Koregaon Park",
    propertyType: "Villa",
    price: 42000000n,
    area: 3200n,
    bedrooms: 4n,
    description:
      "Luxurious independent villa with private garden, swimming pool and top-notch security.",
    photoUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
    ],
    isFeatured: true,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
  {
    id: 5n,
    title: "2BHK near Nagpur Railway Station",
    city: "Nagpur",
    location: "Sitabuldi",
    propertyType: "2BHK",
    price: 4500000n,
    area: 950n,
    bedrooms: 2n,
    description:
      "Well-maintained apartment in central Nagpur with excellent transport connectivity.",
    photoUrls: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
    ],
    isFeatured: false,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
  {
    id: 6n,
    title: "Sea-view 3BHK in Worli",
    city: "Mumbai",
    location: "Worli",
    propertyType: "3BHK",
    price: 68000000n,
    area: 1800n,
    bedrooms: 3n,
    description:
      "Stunning panoramic sea views from this premium Mumbai apartment with world-class amenities.",
    photoUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    ],
    isFeatured: true,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
  {
    id: 7n,
    title: "Cozy 1BHK in Nashik Road",
    city: "Nashik",
    location: "Nashik Road",
    propertyType: "1BHK",
    price: 3200000n,
    area: 580n,
    bedrooms: 1n,
    description:
      "Affordable starter home in the rapidly growing Nashik city, close to all amenities.",
    photoUrls: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
    ],
    isFeatured: false,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
  {
    id: 8n,
    title: "Elegant 3BHK in Powai",
    city: "Mumbai",
    location: "Powai",
    propertyType: "3BHK",
    price: 18500000n,
    area: 1320n,
    bedrooms: 3n,
    description:
      "Premium lakeside apartment in Powai with top-tier amenities and serene lake views.",
    photoUrls: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    ],
    isFeatured: false,
    status: "approved" as PropertyStatus,
    submittedAt: 0n,
    sellerInfo: { sellerName: "Demo", paymentStatus: PaymentStatus.paid },
  },
];

export function useApprovedProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["approvedProperties"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PROPERTIES;
      const result = await actor.listApprovedProperties();
      return result.length > 0 ? result : SAMPLE_PROPERTIES;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_PROPERTIES,
  });
}

export function useFeaturedProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["featuredProperties"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PROPERTIES.filter((p) => p.isFeatured);
      const result = await actor.getFeaturedProperties();
      return result.length > 0
        ? result
        : SAMPLE_PROPERTIES.filter((p) => p.isFeatured);
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_PROPERTIES.filter((p) => p.isFeatured),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
    initialData: false,
  });
}

export function useAllProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["allProperties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProperties();
    },
    enabled: !isFetching,
  });
}

export function useAllBuyerLeads() {
  const { actor, isFetching } = useActor();
  return useQuery<BuyerLead[]>({
    queryKey: ["buyerLeads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBuyerLeads();
    },
    enabled: !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      propertyId: bigint;
      buyerName: string;
      buyerPhone: string;
      buyerEmail: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBuyerInquiry(
        data.propertyId,
        data.buyerName,
        data.buyerPhone,
        data.buyerEmail,
        data.message,
      );
    },
  });
}

export function useSubmitProperty() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      city: string;
      location: string;
      propertyType: string;
      price: bigint;
      area: bigint;
      bedrooms: bigint;
      description: string;
      photoUrls: string[];
      sellerName: string;
      sellerPhone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitProperty(
        data.title,
        data.city,
        data.location,
        data.propertyType,
        data.price,
        data.area,
        data.bedrooms,
        data.description,
        data.photoUrls,
        data.sellerName,
        data.sellerPhone,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["approvedProperties"] }),
  });
}

export function useRecordPayment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: { propertyId: bigint; paymentRef: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.recordPayment(data.propertyId, data.paymentRef);
    },
  });
}

export function useUpdatePropertyStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      propertyId: bigint;
      status: PropertyStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePropertyStatus(data.propertyId, data.status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allProperties"] }),
  });
}

export function useConfirmPayment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.confirmPayment(propertyId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allProperties"] }),
  });
}

export function useDeleteProperty() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProperty(propertyId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allProperties"] }),
  });
}

export function useToggleFeatured() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleFeatured(propertyId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allProperties"] }),
  });
}

export function useGetSellerPhone(propertyId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<string | null>({
    queryKey: ["sellerPhone", propertyId?.toString()],
    queryFn: async () => {
      if (!actor || propertyId === null) return null;
      return actor.getSellerPhone(propertyId);
    },
    enabled: !isFetching && propertyId !== null,
  });
}

export { SAMPLE_PROPERTIES };
