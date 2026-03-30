# Mahaflats – Property Listing Workflow

## Current State
The site has a public homepage with listings, seller form, blog, broker auth, admin dashboard, and legal pages. Navigation uses hash-based routing. Existing views include: public, blog, about-us, contact-us, privacy-policy, terms-and-conditions, broker, admin-login, admin-dashboard, access-denied.

## Requested Changes (Diff)

### Add
- **OwnerListingForm** component (`#owner-listing` route): A full property listing form for owners with fields: Owner Full Name, Mobile Number, Property Type (dropdown: Flat/Plot/House/Commercial), Property Location, Expected Price, Upload Property Photos (multi-file), Property Description (textarea). Mandatory agreement checkbox with exact text provided. Submit blocked unless checkbox checked. On submit, show success confirmation.
- **BuyerVisitForm** component (`#buyer-visit` route): Visit request form with fields: Buyer Full Name, Mobile Number, Property ID or Property Name, Preferred Visit Date (date picker). Mandatory agreement checkbox with exact text provided. Submit blocked unless checkbox checked. On submit, show exact confirmation message provided.
- **PrintableVisitConfirmation** component: Shown after buyer form submission. Displays: heading "Mahaflats Property Site Visit Confirmation Agreement", Buyer Name, Owner Name (manual input or placeholder), Property Details, Visit Date, three signature blocks (Buyer, Owner, Mahaflats Representative). Must be printable on A4 — use print-specific CSS (`@media print`) to hide non-printable elements and format as A4. Include a "Print" button that triggers `window.print()`.
- Two new nav links in Navbar: "List Property" (links to `#owner-listing`) and "Request Visit" (links to `#buyer-visit`) — add to both desktop and mobile menus.
- Two new view types in App.tsx: `owner-listing` and `buyer-visit`.
- Hash routing for `#owner-listing` and `#buyer-visit` in `resolveHashView`.

### Modify
- **App.tsx**: Add `owner-listing` and `buyer-visit` to View type, resolveHashView, and render logic.
- **Navbar.tsx**: Add "List Property" and "Request Visit" nav items.

### Remove
Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/OwnerListingForm.tsx` — full form with all fields, agreement checkbox, photo upload (local preview only, no backend upload), and success state.
2. Create `src/frontend/src/components/BuyerVisitForm.tsx` — form with all fields, agreement checkbox, success confirmation message, then show printable confirmation.
3. Create `src/frontend/src/components/PrintableVisitConfirmation.tsx` — A4 printable agreement page with all required fields and signature spaces, Print button.
4. Update `App.tsx` to add new views and routes.
5. Update `Navbar.tsx` to add new nav links.
6. Add print CSS in index.css or inline styles for A4 print layout.
