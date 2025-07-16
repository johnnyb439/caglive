# Cleared Advisory - Detailed Website Design

## 1. Website Architecture

### Tech Stack
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Hosting**: Vercel (Frontend) + AWS RDS (Database)
- **File Storage**: AWS S3 for resumes/documents
- **Search**: Elasticsearch for job matching
- **Analytics**: Plausible Analytics (privacy-focused)

### Security Architecture
- SSL/TLS encryption (enforced)
- AWS GovCloud for compliance
- Zero-knowledge architecture for sensitive clearance data
- Regular security audits
- SOC 2 Type II compliance

## 2. User Flow & Pages

### Public Pages (No Auth Required)

#### Homepage (`/`)
- Hero section with value proposition
- Quick job search bar with clearance filter
- Featured employers hiring cleared professionals
- Success metrics (jobs filled, candidates placed)
- Call-to-action buttons for job seekers and employers

#### Job Listings (`/jobs`)
- Advanced filters:
  - Clearance level (Secret, TS, TS/SCI, Q, L)
  - Location (with radius search)
  - Salary range
  - Remote/Hybrid/Onsite
  - Contract type
  - Polygraph requirements
- Real-time search results
- Save jobs without account (local storage)

#### Individual Job Page (`/jobs/[id]`)
- Full job description
- Company overview
- Required clearance level prominently displayed
- Quick apply button
- Similar jobs section

#### Company Directory (`/companies`)
- List of hiring companies
- Filter by industry, size, location
- Clearance sponsorship indicators

#### About (`/about`)
- Mission and values
- Team information
- Security certifications
- Trust indicators

### Authenticated Pages

#### Job Seeker Dashboard (`/dashboard`)
- Application status tracker
- Saved jobs
- Profile completion percentage
- Job match recommendations
- Recent employer views

#### Profile Management (`/profile`)
- Personal information
- Clearance details (type, status, expiration)
- Work authorization status
- Resume upload/management
- Skills and certifications
- Availability settings

#### Employer Dashboard (`/employer/dashboard`)
- Active job postings
- Applicant pipeline
- Analytics (views, applications, hires)
- Billing and subscription management

#### Post a Job (`/employer/post-job`)
- Multi-step form:
  1. Job details
  2. Clearance requirements
  3. Compensation
  4. Screening questions
  5. Preview and publish

## 3. Component Design

### Navigation Header
```
[Logo] [Jobs] [Companies] [For Employers]  [Sign In] [Post Job]
```

### Job Card Component
```
┌─────────────────────────────────────────┐
│ [Company Logo] Company Name             │
│ Job Title                    [Save Icon]│
│ 📍 Location | 🔒 TS/SCI | 💰 $120-150k │
│ Posted 2 days ago · 47 applicants      │
└─────────────────────────────────────────┘
```

### Clearance Badge System
- Visual badges for clearance levels
- Color-coded: Secret (Blue), TS (Red), TS/SCI (Purple)
- Verification checkmark for confirmed clearances

## 4. Mobile-First Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Mobile Optimizations
- Bottom navigation bar
- Swipeable job cards
- Touch-optimized filters
- Progressive web app capabilities

## 5. Database Schema

### Core Tables
```sql
Users
- id (UUID)
- email
- role (jobseeker/employer/admin)
- verified
- created_at

Profiles
- user_id
- clearance_level
- clearance_verified
- location
- resume_url
- available_date

Jobs
- id
- employer_id
- title
- description
- clearance_required
- salary_min
- salary_max
- location
- remote_type

Applications
- job_id
- user_id
- status
- applied_at
```

## 6. Key Features Implementation

### Smart Job Matching Algorithm
- Weighted scoring based on:
  - Clearance level match (40%)
  - Location proximity (20%)
  - Skills match (20%)
  - Experience level (20%)

### One-Click Apply
- Pre-populated from saved profile
- Option to customize cover letter
- Track application instantly

### Clearance Verification
- Self-attestation with legal disclaimer
- Optional employer verification service
- Expiration date tracking

## 7. Design System

### Colors
- Primary: Navy Blue (#1e3a8a)
- Secondary: Sky Blue (#0ea5e9)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Error: Red (#ef4444)
- Neutral: Gray scale

### Typography
- Headings: Inter (sans-serif)
- Body: System fonts for performance
- Monospace: For job codes/IDs

### UI Components
- Buttons: Primary, Secondary, Ghost variants
- Forms: Floating labels, inline validation
- Cards: Subtle shadows, hover states
- Modals: Accessible, keyboard navigable

## 8. Performance Optimization

### Page Load Goals
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Core Web Vitals: All green

### Techniques
- Static generation for public pages
- Incremental Static Regeneration for job listings
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Edge caching with Vercel

## 9. SEO Strategy

### Technical SEO
- Semantic HTML structure
- Schema.org JobPosting markup
- XML sitemap generation
- Robots.txt configuration

### Content SEO
- Location-based landing pages
- Clearance level guides
- Salary information pages
- Company profiles

## 10. Launch Checklist

### Pre-Launch
- [ ] Security audit completed
- [ ] GDPR/Privacy compliance verified
- [ ] Load testing (1000+ concurrent users)
- [ ] Mobile app testing on all devices
- [ ] Legal review of terms and privacy policy

### Launch Day
- [ ] DNS propagation confirmed
- [ ] SSL certificates active
- [ ] Monitoring alerts configured
- [ ] Support team briefed
- [ ] Social media announcements ready

### Post-Launch
- [ ] User feedback collection active
- [ ] Performance monitoring
- [ ] A/B testing framework ready
- [ ] Weekly iteration plan