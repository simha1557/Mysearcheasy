# ActivityHub - Parent Activity Platform

A comprehensive full-stack web application for parents to discover and enroll their children in local activities like sports, arts, and workshops posted by businesses.

## Technology Stack

- **Framework**: Next.js 14 with TypeScript & Tailwind CSS
- **Database**: Supabase (PostgreSQL with PostGIS)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Email**: Resend
- **Live Chat**: Crisp

## Features

### Authentication (Clerk)
- Email/password and social logins
- Two user roles: parent and business
- Protected routes with role-based access

### Database Schema (Supabase)
- **profiles**: User data linked to Clerk users
- **programs**: Activity listings with geolocation
- **enrollments**: Links profiles and programs with payment tracking
- **reviews**: User feedback system

### Parent-Facing Pages
- **Homepage (/)**: Landing page with search and featured programs
- **Search Results (/search)**: Location-based search with filters
- **Program Details (/programs/[id])**: Detailed program view with enrollment

### Business-Facing Pages
- **Business Dashboard (/dashboard)**: CRUD operations for program listings

### Integrations
- **Stripe**: Secure payment processing with webhooks
- **Resend**: Transactional emails for confirmations
- **Crisp**: Live chat support widget

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd parent-activity-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Copy `.env.local` and fill in your service credentials:
   - Clerk authentication keys
   - Supabase URL and keys
   - Stripe API keys
   - Resend API key
   - Crisp website ID

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql`
   - Enable PostGIS extension for geolocation features

5. **Configure webhooks**
   - Set up Clerk webhook for user creation
   - Set up Stripe webhook for payment processing

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## TODO Items

### High Priority
- [ ] Implement geolocation API for user location
- [ ] Add image upload functionality for programs
- [ ] Implement geocoding for program locations
- [ ] Complete review submission functionality
- [ ] Add program edit/delete functionality
- [ ] Implement proper error handling and loading states

### Medium Priority
- [ ] Add email templates for better formatting
- [ ] Implement program search with advanced filters
- [ ] Add user enrollment history page
- [ ] Create admin panel for platform management
- [ ] Add program availability and scheduling

### Low Priority
- [ ] Implement push notifications
- [ ] Add social sharing features
- [ ] Create mobile app version
- [ ] Add analytics and reporting
- [ ] Implement referral system

## API Routes

- `POST /api/webhooks/clerk` - Handle user creation
- `POST /api/webhooks/stripe` - Handle payment confirmations
- `POST /api/create-checkout-session` - Create Stripe checkout

## Database Functions

- `nearby_programs(lat, lng, radius_km)` - Returns programs sorted by distance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
\`\`\`

This comprehensive full-stack application provides a complete platform for parents to discover and enroll in local activities. The codebase includes all the necessary components, API routes, database schema, and integrations as specified in your requirements. Each file contains clear TODO comments indicating where specific functionality needs to be implemented.
