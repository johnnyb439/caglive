
# Technical Prompt: Build a Recruiter Dashboard for Cleared Advisory

## 1. Project Overview & Goal

Build a comprehensive, AI-powered recruiter dashboard for the "Cleared Advisory" platform. The primary goal is to create a "virtual assistant" experience for recruiters that centralizes their workflow, automates tedious tasks, and provides intelligent insights. This dashboard will address the key pain points of managing cleared candidates: fragmented tools, outdated information, and manual processes.

The final product should be a secure, intuitive, and time-saving hub for talent acquisition in the cleared space.

## 2. Core Persona: The Recruiter ("Veronika")

- **Role**: Recruiter specializing in IT and government candidates with security clearances.
- **Needs**: Efficiency, accuracy, and a single source of truth.
- **Frustrations**: Juggling multiple platforms (LinkedIn, ClearanceJobs, ATS), verifying clearance status, manual scheduling, and building complex search queries.
- **Motivations**: Wants to feel like they have an intelligent assistant, not just another database. Values tools that are security-aware and save significant time.

## 3. Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend/DB**: Supabase (for database, auth, and storage)
- **AI Integration**: OpenAI API (for summarization, matching)
- **Deployment**: Vercel

## 4. High-Level Architecture

Create a new route group `(dashboard)` under `/app` for all recruiter-facing pages.

- **`/app/(dashboard)/recruiter/page.tsx`**: The main dashboard view.
- **`/app/(dashboard)/recruiter/candidates/page.tsx`**: View and manage all candidates.
- **`/app/(dashboard)/recruiter/jobs/page.tsx`**: View and manage all job requisitions.
- **`/app/(dashboard)/recruiter/pipelines/page.tsx`**: Manage saved talent pools.
- **`/lib/supabase/queries.ts`**: Centralize all Supabase database queries.
- **`/lib/openai/actions.ts`**: Centralize all OpenAI API calls.
- **`/components/recruiter/`**: Create a dedicated directory for all recruiter dashboard components.

## 5. Data Models (Supabase Tables)

**`candidates`**
- `id`: uuid (primary key)
- `full_name`: text
- `email`: text
- `clearance_level`: enum ('Public Trust', 'Secret', 'TS', 'TS/SCI', 'TS/SCI + CI Poly', 'TS/SCI + FS Poly')
- `clearance_status`: enum ('Active', 'Inactive', 'In-Scope')
- `last_adjudication_date`: date
- `certifications`: text[] (e.g., ['CISSP', 'Security+'])
- `resume_text`: text
- `resume_url`: text (link to file in Supabase Storage)
- `summary_ai`: text (AI-generated summary)
- `created_at`: timestamp

**`jobs`**
- `id`: uuid (primary key)
- `title`: text
- `required_clearance`: enum (same as `candidates.clearance_level`)
- `required_certifications`: text[]
- `description`: text
- `location`: text

**`pipelines`**
- `id`: uuid (primary key)
- `name`: text (e.g., "TS/SCI Network Engineers in Poland")
- `recruiter_id`: uuid (foreign key to `users`)

**`pipeline_candidates`**
- `pipeline_id`: uuid (foreign key to `pipelines`)
- `candidate_id`: uuid (foreign key to `candidates`)

**`activity_log`**
- `id`: uuid (primary key)
- `candidate_id`: uuid (foreign key to `candidates`)
- `recruiter_id`: uuid (foreign key to `users`)
- `activity_type`: enum ('Contacted', 'Interviewed', 'Submitted', 'Hired', 'Note')
- `notes`: text
- `created_at`: timestamp

## 6. Detailed Feature Implementation

### Feature 1: Main Dashboard (`/recruiter`)

- **User Story**: As a recruiter, I want a single-pane-of-glass view of my most important information: new candidates, matched jobs, and upcoming interviews.
- **Frontend Components**:
  - `DashboardLayout.tsx`: Main layout with navigation.
  - `NewCandidatesWidget.tsx`: Displays a list of the 5 most recently added candidates.
  - `JobMatchesWidget.tsx`: Shows a summary of top candidates matching open jobs.
  - `UpcomingInterviewsWidget.tsx`: (Future) Integrates with a calendar to show scheduled events.
- **Backend**:
  - Fetch data using server-side queries from `candidates` and `jobs` tables, ordered by `created_at`.

### Feature 2: Smart Resume Summarizer & Clearance Verification

- **User Story**: I want to upload a resume, have the system instantly parse it for key info (clearance, certs, experience), and verify the clearance status.
- **Frontend Components**:
  - `ResumeUploader.tsx`: A drag-and-drop or file input component. On upload, triggers the backend processing.
  - `CandidateProfileView.tsx`: Displays the extracted data clearly.
    - **Clearance Verification Tool**: A section in the profile. A button "Verify Clearance" calls the API. The UI should show a spinner and then the status (`Active`, `Inactive`, `In-Scope`) with a timestamp.
- **Backend API Routes & Logic**:
  - **`POST /api/candidates/upload`**:
    1. Receives the resume file (PDF, DOCX).
    2. Saves the file to Supabase Storage.
    3. Extracts text from the resume.
    4. Sends the text to OpenAI (`/lib/openai/actions.ts`) with a prompt:
       > "Extract the following from the resume text: full_name, email, clearance_level, certifications (like Security+, CISSP), and provide a one-paragraph summary of their experience. Return as JSON."
    5. Saves the extracted data and AI summary to the `candidates` table.
  - **`POST /api/candidates/verify-clearance`**:
    1. Receives `candidate_id`.
    2. **(Mocked for now)**: Implement a mock function that returns a random `clearance_status` after a 2-second delay to simulate an external API call.
    3. Updates the `clearance_status` and `last_adjudication_date` in the `candidates` table.

### Feature 3: Talent Radar (Auto-Matching) & Advanced Search

- **User Story**: I want the system to automatically match candidates to my open jobs based on clearance, certs, and location, and I want to be able to perform complex searches with simple clicks.
- **Frontend Components**:
  - `JobMatchesTab.tsx`: On a job details page, this tab shows a ranked list of matching candidates.
  - `CandidateSearchView.tsx`: A dedicated search page with filters.
    - **Filters**: Use `shadcn/ui` dropdowns/checkboxes for `clearance_level`, `certifications`, and a text input for `location`. Avoid manual Boolean strings.
- **Backend Logic**:
  - **Auto-Matching**: Create a Supabase database function `match_candidates_for_job(job_id)` that takes a job ID and returns a ranked list of candidates. The ranking logic should prioritize:
    1. Exact clearance match.
    2. All required certifications present.
    3. Location match.
  - **Search API (`GET /api/candidates/search`)**:
    1. Takes query parameters for filters (e.g., `?clearance=TS/SCI&certs=CISSP,CEH`).
    2. Constructs a dynamic Supabase query to filter the `candidates` table.

### Feature 4: Saved Pipelines / Talent Pools

- **User Story**: I want to group candidates into custom folders (pipelines) so I can easily track talent for specific roles or projects.
- **Frontend Components**:
  - `PipelinesList.tsx`: A sidebar or page showing all created pipelines.
  - `PipelineView.tsx`: Displays all candidates within a selected pipeline.
  - `AddToPipelineButton.tsx`: A button on each candidate's profile to add them to one or more pipelines.
- **Backend API Routes**:
  - `POST /api/pipelines`: Creates a new pipeline.
  - `POST /api/pipelines/add-candidate`: Adds a candidate to a pipeline (inserts into `pipeline_candidates`).
  - `GET /api/pipelines/:id`: Fetches all candidates in a specific pipeline.

### Feature 5: Candidate Activity Tracker

- **User Story**: I want to see a chronological history of all interactions with a candidate so I know exactly where they are in the process.
- **Frontend Components**:
  - `ActivityFeed.tsx`: A component on the candidate profile page that displays a timeline of events from the `activity_log`.
  - `AddActivityForm.tsx`: A simple form to add a new note or log an interaction (e.g., "Contacted via email").
- **Backend API Routes**:
  - `POST /api/activity`: Adds a new entry to the `activity_log`.
  - `GET /api/activity/:candidate_id`: Fetches the full activity history for a candidate.

---
This prompt provides a detailed, actionable plan for building the recruiter dashboard. It is structured for an AI assistant to understand the requirements, components, and backend logic needed for a successful implementation.
