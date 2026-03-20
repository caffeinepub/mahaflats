# Mahaflats — AdSense Readiness Upgrade

## Current State
- Blog section exists with 5 articles (Mumbai, Pune, Thane, buying guide, investment tips)
- Navigation: Home, Listings, Blog, Contact, Broker Signup
- Legal pages: About Us, Contact Us, Privacy Policy
- Footer has Information section with 3 links (missing Terms and Conditions)
- No Terms and Conditions page exists
- App.tsx routing does not include terms-and-conditions view

## Requested Changes (Diff)

### Add
- 5 more blog articles (10 total) focused on Maharashtra cities: Nagpur, Nashik, Navi Mumbai, home loan guide, and NRI investment guide — each 700+ words with proper H1/H2 structure
- Terms and Conditions page component (TermsAndConditionsPage.tsx)
- Route `#terms-and-conditions` in App.tsx
- Terms and Conditions link in Footer's Information section

### Modify
- BlogPage.tsx: append 5 new articles to the blogPosts array; ensure all articles have 700+ words with SEO-friendly content about Maharashtra cities
- Footer.tsx: add Terms and Conditions to LEGAL_LINKS array
- App.tsx: add `terms-and-conditions` to View type, resolve hash, and render TermsAndConditionsPage

### Remove
- Any empty placeholder sections or broken elements across public pages

## Implementation Plan
1. Create TermsAndConditionsPage.tsx with full legal content relevant to a real estate marketplace
2. Update BlogPage.tsx with 5 new 700+ word articles on: Nagpur real estate, Nashik investment, Navi Mumbai guide, home loan tips for Maharashtra, NRI property buying guide
3. Update Footer.tsx to add Terms and Conditions link
4. Update App.tsx to add the new view type, hash resolver, and render block
