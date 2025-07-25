
# Technical Prompt: Build a Secure Recruiter & Security Team Workflow

## 1. Objective & Philosophy

Build a feature that enables recruiters to request candidate clearance verification from a dedicated security team. The entire workflow must be designed with a **data minimization** and **security-first** mindset. **No Personally Identifiable Information (PII), especially Social Security Numbers (SSNs), will ever be stored in the application's database or transmitted through its APIs.** The application's role is to facilitate and track the verification *request*, not to handle the sensitive data itself.

## 2. Core Personas

- **Recruiter**: Needs to quickly identify candidates and request clearance checks.
- **Security Officer**: Needs a simple interface to receive requests, perform offline verification using external government systems (e.g., DISS/JPAS), and update the candidate's status in the app.

## 3. Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend/DB**: Supabase (for database, auth, and storage)
- **State Management**: React Hooks / Context API for client-side state.

## 4. High-Level Architecture & Roles

- **Role-Based Access Control (RBAC)**: Implement RBAC in Supabase.
  - `recruiter` role: Can view candidates, create requests, and add private notes. Cannot edit clearance status.
  - `security` role: Can view pending requests, update clearance status, and view audit logs.
- **New Route Group `(dashboard)`**:
  - `/app/(dashboard)/recruiter/**`: Existing recruiter pages.
  - `/app/(dashboard)/security/dashboard`: A new dashboard for the security team.

## 5. Data Model Updates (Supabase Tables)

**`candidates` Table:**
- `clearance_status`: enum ('Not Verified', 'Pending Review', 'Verified - Active', 'Verified - Inactive', 'Issue Found')
- `clearance_status_last_updated`: timestamp
- `clearance_status_updated_by`: uuid (foreign key to `users` table, for the security officer)

**`verification_requests` Table:**
- `id`: uuid (primary key)
- `candidate_id`: uuid (foreign key to `candidates`)
- `requester_id`: uuid (foreign key to `users`, the recruiter)
- `status`: enum ('Pending', 'Completed')
- `created_at`: timestamp

**`audit_log` Table:**
- `id`: uuid (primary key)
- `actor_id`: uuid (foreign key to `users`)
- `action`: text (e.g., "Created verification request for candidate X", "Updated clearance status for candidate Y")
- `timestamp`: timestamp

## 6. Detailed Feature Implementation

### Feature 1: Recruiter Workflow

- **Component: `RecruiterNotes.tsx`**
  - **Functionality**: A client-side-only notes component on the candidate profile.
  - **Implementation**: Use `useState` and `localStorage` to store notes. The notes should be saved against the `candidate.id`. **These notes must never be sent to the server.**
  - **UI**: A simple textarea with a "Save Note" button.

- **Component: `RequestVerificationButton.tsx`**
  - **Functionality**: A button on the candidate profile labeled "Mark for Clearance Check".
  - **Action**:
    1. On click, it creates a new entry in the `verification_requests` table with `status: 'Pending'`.
    2. It updates the `candidates.clearance_status` to `'Pending Review'`.
    3. It creates an entry in the `audit_log`.
    4. It triggers the internal messaging system.

- **Component: `ExportCandidateButton.tsx`**
  - **Functionality**: A button to export the candidate's non-sensitive data.
  - **Implementation**: Use a library like `jspdf` or `xlsx` to generate a PDF or Excel file.
  - **Data to Export**: `full_name`, `email`, `certifications`. **Explicitly exclude any sensitive data or private recruiter notes.**

- **Component: `InternalMessaging.tsx`**
  - **Functionality**: A secure, in-app messaging system.
  - **Implementation**:
    - Create a `messages` table in Supabase.
    - When the "Mark for Clearance Check" button is clicked, a pre-formatted message is sent from the recruiter to the security team's message queue.
    - Message: "Candidate [Name] has been marked for clearance validation. The candidate's profile is ready for your review. Please obtain the SSN from the recruiter via a secure, external channel to proceed with DISS verification."

### Feature 2: Security Team Workflow

- **Page: `/security/dashboard`**
  - **Functionality**: A dashboard for the security team.
  - **UI**:
    - A list of pending verification requests, linking to the candidate profiles.
    - A simple UI to see all recent activity from the `audit_log`.

- **Component: `SecurityValidationForm.tsx`**
  - **Functionality**: A form on the candidate profile, visible only to the `security` role.
  - **UI**:
    - Dropdown to select the new `clearance_status`.
    - A date picker for `clearance_status_last_updated`.
    - A "Submit" button.
  - **Action**:
    1. On submit, it updates the `candidates` table with the new status and timestamp.
    2. It updates the corresponding `verification_requests.status` to `'Completed'`.
    3. It logs the action in the `audit_log`.

### Feature 3: Candidate Profile Updates

- **Component: `ClearanceStatusBadge.tsx`**
  - **Functionality**: A read-only badge on the candidate profile that displays the current `clearance_status`.
  - **UI**: Use different colors for different statuses (e.g., yellow for 'Pending', green for 'Verified', red for 'Issue Found').
  - **Data Displayed**:
    - `Status`: e.g., "Verified - Active"
    - `Last Updated`: [timestamp]
    - `Verified By`: [Security Officer's Name]

## 7. Security & Compliance (Explicit Instructions)

- **DO NOT**: Store SSNs, birthdates, or any other highly sensitive PII in the database.
- **DO**: Use Supabase's Row Level Security (RLS) to enforce the `recruiter` and `security` roles.
- **DO**: Log all critical actions in the `audit_log`.
- **DO**: Ensure that the `ExportCandidateButton` only includes non-sensitive information.
- **DO**: Remind the user in the UI that sensitive data must be transmitted via a secure, external method.

This updated prompt provides a clear, secure, and compliant roadmap for development.
