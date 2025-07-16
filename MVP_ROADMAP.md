2# Cleared Advisory MVP Roadmap

## Week 1-2: Landing Page & Foundation

### Goals
- Launch marketing site to capture interest
- Begin building user base
- Validate market demand

### Deliverables
1. **Landing Page**
   - Hero: "The Trusted Platform for Cleared Professionals"
   - Value props for candidates and employers
   - Email capture with "Get Early Access"
   - Basic about/contact pages

2. **Email Campaign Setup**
   - Welcome email series
   - Segmentation (job seekers vs employers)
   - Weekly cleared jobs newsletter

3. **Analytics & Tracking**
   - Google Analytics 4
   - Conversion tracking
   - A/B testing framework
   - Heatmap integration

4. **Legal Foundation**
   - Privacy Policy
   - Terms of Service
   - Cookie Policy
   - Data handling procedures

### Technical Stack for Landing Page
```
- Next.js (SEO optimized)
- Tailwind CSS
- PostgreSQL for email storage
- SendGrid for emails
- Vercel hosting
```

## Week 3-4: Core Infrastructure

### Backend Setup
```javascript
// Core APIs needed:
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/verify-email
POST   /api/auth/forgot-password
GET    /api/user/profile
PUT    /api/user/profile
POST   /api/user/clearance
DELETE /api/user/account
```

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  created_at TIMESTAMP,
  verified BOOLEAN DEFAULT false
);

-- Clearance table
CREATE TABLE clearances (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50), -- SECRET, TS, TS/SCI
  status VARCHAR(50), -- ACTIVE, EXPIRED, INTERIM
  granted_date DATE,
  expiration_date DATE,
  agency VARCHAR(100),
  polygraph_type VARCHAR(50),
  polygraph_date DATE
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  employer_id UUID REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  clearance_required VARCHAR(50),
  location VARCHAR(255),
  remote_allowed BOOLEAN,
  salary_min INTEGER,
  salary_max INTEGER,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

### Security Implementation
- JWT with refresh tokens
- Rate limiting per endpoint
- Input validation with Zod
- SQL injection prevention
- XSS protection

## Month 1: MVP Features

### Week 5-6: User Management
1. **Registration Flow**
   - Multi-step form
   - Email verification
   - Password requirements
   - Profile completion tracker

2. **Profile Builder**
   - Basic info (name, location, phone)
   - Clearance details
   - Resume upload (PDF only initially)
   - Skills tags
   - Availability status

3. **Authentication**
   - Secure login/logout
   - Remember me option
   - Password reset
   - Session management

### Week 7-8: Job Platform Core
1. **Employer Features**
   - Company profile creation
   - Job posting form
   - Job management dashboard
   - Applicant view

2. **Job Search**
   - Filter by clearance
   - Location search
   - Keyword search
   - Sort options
   - Save searches

3. **Application System**
   - One-click apply
   - Application tracking
   - Status updates
   - Basic notifications

## Month 2: Enhanced Features

### Week 9-10: Communication & Matching
1. **Messaging System**
   - Employer to candidate messaging
   - Message notifications
   - Block/report functionality
   - Message templates

2. **Smart Matching**
   - Basic algorithm implementation
   - Daily job alerts
   - Recommended jobs
   - "Jobs like this" feature

### Week 11-12: Analytics & Payments
1. **Analytics Dashboards**
   - Job seeker: Profile views, application stats
   - Employer: Job performance, candidate pipeline
   - Admin: Platform metrics

2. **Payment Integration**
   - Stripe integration
   - Subscription management
   - Invoice generation
   - Payment history

## Month 3: Polish & Launch

### Week 13-14: Mobile & Performance
1. **Mobile Optimization**
   - Responsive design
   - Touch-friendly interface
   - Mobile testing
   - Performance optimization

2. **Advanced Features**
   - Bulk actions
   - Export functionality
   - Advanced filters
   - Saved preferences

### Week 15-16: Launch Preparation
1. **Testing & QA**
   - User acceptance testing
   - Security audit
   - Load testing
   - Bug fixes

2. **Launch Activities**
   - Beta user onboarding
   - Content creation
   - SEO optimization
   - Marketing campaign

## Key Milestones & Success Metrics

### Month 1 Targets
- 1,000 email signups
- 100 user registrations
- 50 complete profiles
- 20 job postings

### Month 2 Targets
- 500 active users
- 100 job postings
- 50 applications submitted
- 5 successful hires

### Month 3 (Launch) Targets
- 2,000 registered users
- 200 active job postings
- 500 applications/week
- 20 paying employers

## Technical Decisions for MVP

### Must Have
- PostgreSQL database
- Node.js/Express backend
- React frontend
- JWT authentication
- Basic search
- Email notifications

### Nice to Have (Post-MVP)
- Redis caching
- Elasticsearch
- Real-time notifications
- Mobile apps
- AI matching

### Won't Have (Yet)
- Video interviews
- Advanced AI
- Multiple languages
- API access
- White labeling

## Risk Mitigation

### Technical Risks
- **Scalability**: Start with vertical scaling, plan for horizontal
- **Security**: Regular security audits, penetration testing
- **Performance**: CDN for assets, database indexing

### Business Risks
- **Competition**: Focus on superior UX and clearance focus
- **Adoption**: Free tier for job seekers, trial for employers
- **Compliance**: Legal review of all clearance handling

### Operational Risks
- **Support**: Start with email only, add chat later
- **Moderation**: Flag system for fake jobs/profiles
- **Quality**: Manual review for first 100 employers

## Go-to-Market Strategy

### Soft Launch (Week 1 of Month 3)
- 50 beta users (25 seekers, 25 employers)
- Daily feedback sessions
- Rapid iteration

### Public Beta (Week 3 of Month 3)
- Open registration
- PR announcement
- Social media campaign
- Cleared community outreach

### Official Launch (End of Month 3)
- Product Hunt launch
- Press release
- Paid advertising
- Conference presence

## Budget Allocation (3 months)

### Development: $150k
- 2 full-stack developers
- 1 UI/UX designer
- 1 DevOps engineer

### Infrastructure: $10k
- AWS/hosting
- Third-party services
- Security tools

### Marketing: $40k
- Content creation
- Paid ads
- PR agency
- Launch event

### Total MVP Budget: $200k