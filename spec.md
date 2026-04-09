# Maharashtra Flats – Professional Property Portal Upgrade

## Current State

The site is a React + Motoko single-page app at Version 31. It already has:

- Hash-based SPA routing with views: public, admin-login, admin-dashboard, broker, blog, legal pages, owner-listing, buyer-visit.
- Backend: `submitProperty`, `listApprovedProperties`, `getAllProperties`, `updatePropertyStatus`, `getSellerPhone`, `submitBuyerInquiry`, `recordPayment`, `confirmPayment`, `toggleFeatured`, `deleteProperty`, `verifyAdminPassword`, blob-storage, authorization mixin.
- Frontend components: Navbar, Hero, FeaturedProperties, AllListings, PropertyCard, AdminDashboard, SellerForm, OwnerListingForm, ListingTypePage (two plan cards: Free / ₹1000 Fast Selling), BuyerVisitForm, BlogPage (15 articles), legal pages, BrokerAuth, WhatsAppButton, Footer.
- `PropertyCard` shows property info + `InquiryDialog` (buyer contact form via `submitBuyerInquiry`).
- `SellerForm` collects: title, city, location, propertyType, price, area, bedrooms, description, photoUrls (blob-storage upload), sellerName, sellerPhone.
- AdminDashboard: lists all properties, shows seller phone (admin only), approve/reject/delete, confirm payment, toggle featured, view buyer leads.
- Dark blue/navy professional theme.

## Requested Changes (Diff)

### Add
- **Seller form field: `listingPurpose`** – dropdown: "For Sale" | "For Rent". Drives payment rules on the backend.
- **Seller form field: `rentAmount`** – visible/required only when `listingPurpose = For Rent` (commercial rental commission = 2 months rent).
- **Backend: `listingPurpose` and `rentAmount` stored on `Property`** with a `paymentRule` computed field to clarify which rule applies (₹1000/year for sale, 2 months rent commission for commercial rental).
- **Search filters on listings page**: city dropdown, budget/price range (min–max), property type selector. Filter runs client-side against `listApprovedProperties` result.
- **Buyer contact form on every property card** – an inline "Contact for Details" button that opens a modal (already handled by `InquiryDialog`; verify it exists and works correctly). Ensure no phone number is ever exposed in the card.
- **Admin dashboard – Payments tab**: dedicated section showing all properties with payment status (pending/paid), payment rule label, payment reference, and a "Confirm Payment" action. Filters for pending payments.
- **Admin dashboard – Owner Contacts tab**: table listing seller name, phone number, city, property title for all submitted properties (pending + approved).
- **Admin dashboard – Listings tab**: approve/reject/delete/toggle featured, show all properties with status badges.
- **Admin dashboard – Buyer Leads tab**: list all buyer inquiries with buyer name, phone, email, message, property ID, date.

### Modify
- **`submitProperty` backend function**: add `listingPurpose: Text` and `rentAmount: Nat` parameters. Store on `Property`.
- **`Property` type**: add `listingPurpose: Text`, `rentAmount: Nat` fields.
- **`SellerForm` / `OwnerListingForm`**: add listing purpose dropdown (Sale/Rent) and conditional rent amount field. Ensure photo upload works without errors using blob-storage StorageClient. Validate all fields before submit. Show clear loading/success/error states.
- **`AllListings` component**: add city, budget range, and property type filter bar above listings grid. Filters update displayed results reactively.
- **`PropertyCard`**: confirm no phone exposure. "Contact for Details" button must be clearly visible on every card.
- **AdminDashboard**: replace monolithic view with tabbed layout (Listings | Owner Contacts | Payments | Buyer Leads). Each tab is clearly labeled and functional.
- **Hero search bar**: connect city filter dropdown to the AllListings section, passing selected city as filter prop.

### Remove
- Any direct display of seller phone number outside the admin dashboard.
- Any old or broken payment flow references that don't match the new ₹1000/yearly and 2-months-rent rules.

## Implementation Plan

1. **Backend (Motoko)**: Extend `Property` type with `listingPurpose` and `rentAmount`. Update `submitProperty` signature. Keep all existing functions intact. Generate new `backend.d.ts` bindings.
2. **SellerForm / OwnerListingForm**: Add listing purpose + rent amount fields. Fix photo upload (use `StorageClient` from `src/frontend/src/utils/StorageClient.ts` correctly — upload blob, get URL, pass array to `submitProperty`). Add full field validation. Clear loading/error/success states with toast notifications.
3. **AllListings**: Add filter bar (city select, property type select, min/max price inputs). Client-side filtering of `listApprovedProperties` result.
4. **PropertyCard**: Confirm phone is hidden; ensure InquiryDialog trigger is prominently styled as a full-width button on each card.
5. **AdminDashboard**: Tabs: Listings, Owner Contacts, Payments, Buyer Leads. Owner Contacts tab fetches `getAllProperties` and displays seller name + phone + city + title. Payments tab shows payment rule, status, ref, confirm-payment action. Buyer Leads tab shows all leads from `getAllBuyerLeads`.
6. **Validate and build** after all changes.
