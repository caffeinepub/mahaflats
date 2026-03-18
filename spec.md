# Mahaflats - Broker Signup & Login

## Current State
Existing Mahaflats real estate platform with property listings, seller forms, admin login, and buyer contact features.

## Requested Changes (Diff)

### Add
- Broker signup form (name, phone, email, password)
- Broker login form (email, password)
- Broker dashboard shown after login
- Session persistence for broker login
- Logout button on dashboard

### Modify
- Navigation to include Broker Login link

### Remove
- Nothing removed

## Implementation Plan
1. Backend: Store broker accounts (name, phone, email, hashed password), authenticate brokers, return session tokens
2. Frontend: BrokerSignup page, BrokerLogin page, BrokerDashboard page
3. Route between pages based on auth state
4. Mobile-friendly responsive design consistent with existing dark blue theme
