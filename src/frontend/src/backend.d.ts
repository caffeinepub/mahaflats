import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface SellerInfo {
    paymentStatus: PaymentStatus;
    sellerPhone?: string;
    listingFeeType: ListingFeeType;
    sellerName: string;
    paymentRef?: string;
}
export interface Property {
    id: bigint;
    status: PropertyStatus;
    title: string;
    photoUrls: Array<string>;
    propertyType: string;
    bedrooms: bigint;
    area: bigint;
    city: string;
    rentAmount?: bigint;
    submittedAt: Time;
    description: string;
    sellerInfo: SellerInfo;
    isFeatured: boolean;
    price: bigint;
    listingPurpose: ListingPurpose;
    location: string;
}
export interface BuyerLead {
    id: bigint;
    buyerEmail: string;
    createdAt: Time;
    buyerPhone: string;
    propertyId: bigint;
    message: string;
    buyerName: string;
}
export interface PropertyFilter {
    propertyType?: string;
    city?: string;
    maxPrice?: bigint;
    minPrice?: bigint;
    listingPurpose?: ListingPurpose;
}
export interface UserProfile {
    name: string;
}
export enum ListingFeeType {
    yearlyFee1000 = "yearlyFee1000",
    twoMonthRentCommission = "twoMonthRentCommission"
}
export enum ListingPurpose {
    forRent = "forRent",
    forSale = "forSale"
}
export enum PaymentStatus {
    pending = "pending",
    paid = "paid"
}
export enum PropertyStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    confirmPayment(propertyId: bigint): Promise<void>;
    deleteProperty(propertyId: bigint): Promise<void>;
    filterPropertiesByCity(city: string): Promise<Array<Property>>;
    getAllBuyerLeads(): Promise<Array<BuyerLead>>;
    getAllProperties(): Promise<Array<Property>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProperties(): Promise<Array<Property>>;
    getSellerPhone(propertyId: bigint): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listApprovedProperties(): Promise<Array<Property>>;
    recordPayment(propertyId: bigint, paymentRef: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProperties(filter: PropertyFilter): Promise<Array<Property>>;
    setAdminPassword(newPassword: string): Promise<void>;
    submitBuyerInquiry(propertyId: bigint, buyerName: string, buyerPhone: string, buyerEmail: string, message: string): Promise<void>;
    submitProperty(title: string, city: string, location: string, propertyType: string, price: bigint, area: bigint, bedrooms: bigint, description: string, photoUrls: Array<string>, sellerName: string, sellerPhone: string, listingPurpose: ListingPurpose, rentAmount: bigint | null, listingFeeType: ListingFeeType): Promise<void>;
    toggleFeatured(propertyId: bigint): Promise<void>;
    updatePropertyStatus(propertyId: bigint, newStatus: PropertyStatus): Promise<void>;
    verifyAdminPassword(password: string): Promise<boolean>;
}
