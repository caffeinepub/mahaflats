# Mahaflats

## Current State
Full Mahaflats real estate platform previously built to Version 29. Draft has expired and user wants a complete rebuild restoring all features.

## Requested Changes (Diff)

### Add
- Full rebuild of all existing features (expired draft)

### Modify
- N/A (fresh rebuild)

### Remove
- N/A

## Implementation Plan

### Backend
- Property listings: store owner name (no phone visible publicly), property type, location, price, description, photos, listing type (free/fast), payment UTR, status (pending/approved/rejected)
- Buyer visit requests: store buyer name, phone, property ID, preferred visit date
- Blog articles: store title, description, content, category, featured image
- Broker accounts: name, phone, email, password hash, subscription status (pending/active/expired), UTR, expiry date
- Admin authentication: secret login, role-based access
- Admin operations: approve/reject listings, view phone numbers, manage brokers

### Frontend Pages & Sections

1. **Homepage**
   - Hero section with search bar (city-based: Mumbai, Pune, Thane, Nagpur, Nashik, Navi Mumbai, Aurangabad)
   - "Post Your Property Free" CTA button linking to Owner Listing Form
   - 800-word platform introduction section
   - Featured listings grid
   - WhatsApp contact button for admin (+91 7447428486)

2. **Listings Page** (`#listings`)
   - Searchable/filterable property grid by city, type, price
   - Each listing card: photo, title, location, price, "Contact for details" button (routes to admin WhatsApp)
   - Phone numbers hidden from public

3. **List Property Page** (`#list-property`)
   - Two plan selection cards:
     - **Free Property Listing**: standard visibility, no upfront, 1% success fee. Button: "Select Free Listing" → Owner Form
     - **Fast Selling Listing – ₹1000**: top position, ₹500 Facebook promo, 1% success fee. Highlighted "Recommended". Button: "Select Fast Selling Listing" → Payment step → Owner Form
   - Payment step: show UPI QR code (PhonePe/Union Bank), UPI ID `7447428486@ibl`, UTR entry field
   - Owner Property Listing Form:
     - Owner Full Name, Mobile Number, Property Type (Flat/Plot/House/Commercial), Property Location, Expected Price, Upload Property Photos, Property Description
     - Mandatory agreement checkbox: "I confirm that the property details submitted by me are correct. I agree that if any buyer is introduced through Mahaflats platform and the transaction is finalized directly or indirectly, I will pay a 1% service charge of the final transaction value to Mahaflats as platform service fees. I also agree not to bypass Mahaflats after buyer introduction."
     - Submission blocked without checkbox

4. **Buyer Visit Request** (`#buyer-visit`)
   - Fields: Buyer Full Name, Mobile Number, Property ID or Property Name, Preferred Visit Date
   - Agreement checkbox: "I confirm that I am requesting a property visit through Mahaflats platform. I understand that Mahaflats is acting as a property introduction platform between buyer and owner."
   - Post-submit confirmation message
   - Printable A4 site visit confirmation: Buyer Name, Owner Name, Property Details, Visit Date, signature spaces (Buyer, Owner, Mahaflats Representative). Heading: "Mahaflats Property Site Visit Confirmation Agreement"

5. **Blog Page** (`#blog`)
   - Grid layout: title, short description, featured image, "Read More" button, category badge
   - 15+ original 800-word articles on Maharashtra real estate (Mumbai, Pune, Thane, Nagpur, Nashik, Navi Mumbai, Aurangabad) for first-time buyers
   - Article detail view
   - Includes "How to Verify Property Documents in Maharashtra" guide with RERA section

6. **Broker Signup/Login** (`#broker`)
   - Combined signup + login form
   - Signup: name, phone, email, password. Duplicate email check.
   - After signup → Payment page: ₹4000/6 months, UPI QR code, UTR submission
   - Awaiting admin approval message
   - Active broker dashboard: add/manage property listings
   - Expired broker: renewal prompt

7. **Admin Login** (`#admin-maha-secure`) — hidden from public
   - Credentials: admin@mahaflats.com / Mahaflats@2024
   - Unauthorized access → "Access Denied"
   - Dashboard features:
     - View all property listings with owner phone numbers
     - Approve/reject listings
     - View payment references/UTRs
     - Broker management: approve/reject payments, activate/deactivate/reactivate (reactivation restores 6 months), set expiry dates

8. **About Us** (`#about-us`)
   - Content: Mahaflats.com growing digital platform for property info in Maharashtra. Mission: make property discovery easier, faster, more accessible. Owned by: Arman Hamju Mulani. Powered by: Mahaflats.com.

9. **Contact Us** (`#contact-us`)
   - WhatsApp contact for admin (+91 7447428486)
   - Contact form

10. **Privacy Policy** (`#privacy-policy`)
    - Standard privacy policy for real estate platform

11. **Terms and Conditions** (`#terms-and-conditions`)
    - Last Updated: March 21, 2026
    - Sections: Acceptance of Terms, Intellectual Property Rights, User Conduct, Third-Party Services & Ads, Disclaimer of Warranties, Limitation of Liability, Changes to Terms

### Navigation
- Main menu: Home, Listings, Blog, Contact
- Top nav also: List Property, Broker Signup
- Footer: About Us, Contact Us, Privacy Policy, Terms and Conditions
- "List Property" only in top nav (not duplicated on homepage sections)
- Admin login hidden — accessible only via `#admin-maha-secure`

### Technical Requirements
- Google AdSense verification code in `<head>`: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8780611496001513" crossorigin="anonymous"></script>`
- Dark blue/navy theme, modern and professional
- Fully mobile-responsive
- Seller/broker phone numbers hidden from public, visible only to admin
- All buyer inquiries routed through admin WhatsApp
- WhatsApp floating button: +91 7447428486
- Fast performance
- SEO: proper headings, meta titles/descriptions, keyword optimization
