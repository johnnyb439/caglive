export interface Resume {
  id: string
  fileName: string
  fileSize: number
  uploadDate: string
  content?: string
  isDefault: boolean
  version: number
  tags?: string[]
}

export interface ResumeInsights {
  keywords: string[]
  missingKeywords: string[]
  matchScore: number
  suggestions: string[]
  strengths: string[]
  improvements: string[]
}

export interface JobMatch {
  jobId: string
  jobTitle: string
  company: string
  matchScore: number
  suggestions: string[]
}

export interface ResumeAnalysis {
  insights: ResumeInsights
  topJobMatches: JobMatch[]
}