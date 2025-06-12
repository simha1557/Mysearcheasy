# Setup Instructions

## 1. Environment Variables

Copy the `.env.local` file and fill in the required values:

### Clerk Authentication
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or select existing one
3. Go to API Keys section
4. Copy the Publishable Key and Secret Key
5. Set:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...`
   - `CLERK_SECRET_KEY=sk_test_...`

### Supabase Database
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to Settings > API
4. Copy the URL and anon key
5. Set:
   - `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`
   - `SUPABASE_SERVICE_ROLE_KEY=eyJ...` (from service_role key)

### Stripe Payments
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to Developers > API keys
3. Copy the publishable and secret keys
4. Set:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
   - `STRIPE_SECRET_KEY=sk_test_...`

### Other Services (Optional)
- **Resend**: Get API key from [Resend Dashboard](https://resend.com/api-keys)
- **Crisp**: Get website ID from [Crisp Dashboard](https://app.crisp.chat)

## 2. Database Setup

1. In your Supabase project, go to SQL Editor
2. Run the SQL from `supabase/schema.sql`
3. Enable PostGIS extension if not already enabled

## 3. Webhooks Setup

### Clerk Webhook
1. In Clerk Dashboard, go to Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to `user.created` event
4. Copy the webhook secret to `CLERK_WEBHOOK_SECRET`

### Stripe Webhook
1. In Stripe Dashboard, go to Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Subscribe to `checkout.session.completed` event
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## 4. Run the Application

\`\`\`bash
npm install
npm run dev
\`\`\`

The application will be available at http://localhost:3000
