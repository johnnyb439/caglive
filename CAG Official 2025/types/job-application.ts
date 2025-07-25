export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'on-hold'

export interface JobApplication {
  id: string
  jobTitle: string
  company: string
  dateApplied: string
  source: 'CAG Board' | 'LinkedIn' | 'USAJobs' | 'Indeed' | 'Other'
  matchPercentage: number
  status: JobStatus
  clearanceRequired: string
  location: string
  jobPostUrl: string
  notes: string
  followUpDate?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
}