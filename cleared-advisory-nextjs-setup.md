# Cleared Advisory Next.js Project Setup Guide

## 🚀 Quick Start Commands

```bash
# Create the Next.js project
npx create-next-app@latest cleared-advisory --typescript --tailwind --app

# Navigate to project
cd cleared-advisory

# Install additional dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @stripe/stripe-js stripe
npm install lucide-react clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install react-hook-form zod @hookform/resolvers
npm install date-fns recharts
npm install --save-dev @types/node

# Start development server
npm run dev
```

## 📁 Project Structure

```
cleared-advisory/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes group
│   │   ├── login/
│   │   ├── register/
│   │   └── onboarding/
│   ├── (dashboard)/         # Protected routes
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── jobs/
│   │   └── messages/
│   ├── (employer)/          # Employer routes
│   │   ├── employer/
│   │   ├── post-job/
│   │   └── applicants/
│   ├── api/                 # API routes
│   ├── layout.tsx
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── forms/               # Form components
│   ├── layout/              # Layout components
│   └── features/            # Feature-specific components
├── lib/
│   ├── supabase/           # Supabase client
│   ├── stripe/             # Stripe configuration
│   ├── utils/              # Utility functions
│   └── constants/          # App constants
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript types
├── styles/                  # Global styles
└── public/                  # Static assets
```

## 🎨 Initial File Contents

### 1. Root Layout (`app/layout.tsx`)
```typescript
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cleared Advisory - Security Cleared Job Platform',
  description: 'Connect with vetted opportunities for cleared professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### 2. TypeScript Types (`types/index.ts`)
```typescript
export interface User {
  id: string
  email: string
  role: 'jobseeker' | 'employer' | 'admin'
  created_at: Date
}

export interface ClearanceProfile {
  user_id: string
  clearance_level: 'Secret' | 'TS' | 'TS/SCI' | 'Q' | 'L'
  clearance_status: 'active' | 'interim' | 'expired'
  verification_level: 'bronze' | 'silver' | 'gold' | 'platinum'
  polygraph?: 'CI' | 'FS' | 'Lifestyle'
  expiration_date?: Date
}

export interface Job {
  id: string
  employer_id: string
  title: string
  description: string
  clearance_required: string[]
  location: string
  remote_type: 'onsite' | 'hybrid' | 'remote'
  salary_min?: number
  salary_max?: number
  posted_at: Date
}
```

### 3. Supabase Configuration (`lib/supabase/client.ts`)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 4. Environment Variables (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🔧 Key Components to Build

1. **Authentication Flow**
   - OAuth providers (Google, LinkedIn, GitHub)
   - Email/password with verification
   - Role-based routing

2. **Profile Components**
   - Clearance verification badge
   - Skills and experience sections
   - Document upload (resume, certs)

3. **Job Search**
   - Advanced filters
   - Smart matching algorithm
   - Saved searches

4. **Employer Dashboard**
   - Job posting wizard
   - Applicant tracking
   - Analytics charts

5. **Messaging System**
   - End-to-end encryption
   - Real-time updates
   - Notification preferences

## 🛡️ Security Implementation

1. **Data Encryption**
   - AES-256 for PII at rest
   - TLS 1.3 for data in transit
   - Encrypted file storage

2. **Authentication**
   - JWT with refresh tokens
   - Session management
   - MFA support

3. **Authorization**
   - Role-based access control
   - Resource-level permissions
   - API rate limiting

## 📱 Mobile Responsiveness

All components use Tailwind's responsive utilities:
- Mobile-first approach
- Touch-optimized interactions
- Progressive web app capabilities

## 🚀 Next Steps

1. Set up Supabase project and database
2. Configure authentication providers
3. Create the component library
4. Implement core user flows
5. Add analytics and monitoring

This setup provides a solid foundation for building the Cleared Advisory platform with security, scalability, and user experience as top priorities.