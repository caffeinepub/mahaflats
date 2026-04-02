# Maharashtra Flats (Brand Rename)

## Current State
The website brand name is displayed as "Mahaflats" / "MahaFlats" / "mahaflats.com" across all components. The domain remains mahaflats.com.

## Requested Changes (Diff)

### Add
- Nothing new to add.

### Modify
- `index.html`: Update `<title>`, `og:title`, `og:description`, `twitter:title`, `twitter:description` from "Mahaflats" to "Maharashtra Flats"
- `Navbar.tsx`: Logo text — change `Maha<span>Flats</span>.com` to `Maharashtra<span> Flats</span>.com`
- `Footer.tsx`: Brand logo text and copyright line — change "Maha<span>Flats</span>.com" to "Maharashtra<span> Flats</span>.com" and "© {year} Mahaflats.com" to "© {year} Maharashtra Flats.com"
- `AboutSection.tsx`: Change "Mahaflats.com was founded..." text to "Maharashtra Flats.com was founded..."
- `AboutUsPage.tsx`: Change all "Mahaflats"/"MahaFlats" brand references in header logo, headings, body text, and ownership section. Update "Powered by: Mahaflats.com" to "Powered by: Maharashtra Flats.com"
- `ContactSection.tsx`: Change "Contact Mahaflats" heading and "Arman from Mahaflats will contact you soon" toast message
- `ContactUsPage.tsx`: Change header logo text from "Maha<span>Flats</span>" to "Maharashtra<span> Flats</span>"
- `TermsAndConditionsPage.tsx`: Change all "MahaFlats"/"Mahaflats" brand references
- `PrivacyPolicyPage.tsx`: Change all brand name references
- `BlogPage.tsx`: Change any brand name references
- `OwnerListingForm.tsx`: Change brand references in agreement text and form
- `BuyerVisitForm.tsx`: Change brand references
- `ListingTypePage.tsx`: Change brand references
- `SellerForm.tsx`: Change brand references
- `TrustSection.tsx`: Change brand references
- `FAQSection.tsx`: Change brand references
- `IntroSection.tsx`: Change brand references
- `AdminLogin.tsx`: Change brand references
- `BrokerAuth.tsx`: Change brand references
- `PrintableVisitConfirmation.tsx`: Change brand references

### Remove
- Nothing to remove.

## Implementation Plan
1. Update `index.html` meta tags and title
2. Update logo display in `Navbar.tsx`, `Footer.tsx`, `AboutUsPage.tsx`, `ContactUsPage.tsx` — change from `Maha<span>Flats</span>.com` to `Maharashtra<span> Flats</span>.com`
3. Update all other brand name occurrences ("Mahaflats", "MahaFlats") to "Maharashtra Flats" in body text, headings, toast messages, agreement text across all components
4. Keep domain references (mahaflats.com) only where they refer to the actual domain/URL, but the visible brand name should show "Maharashtra Flats"
5. Validate build
