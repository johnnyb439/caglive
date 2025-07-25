'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Briefcase,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Plus,
  TrendingUp,
  Users,
  Trophy,
  Target
} from 'lucide-react'
import JobCard from '@/components/jobs-applied/JobCard'
import FilterBar from '@/components/jobs-applied/FilterBar'
import AnalyticsWidget from '@/components/jobs-applied/AnalyticsWidget'
import { JobApplication, JobStatus } from '@/types/job-application'

// Mock data for demonstration
const mockJobApplications: JobApplication[] = [
  {
    id: '1',
    jobTitle: 'Senior Cloud Engineer',
    company: 'AWS Federal',
    dateApplied: '2024-03-15',
    source: 'CAG Board',
    matchPercentage: 92,
    status: 'interview',
    clearanceRequired: 'TS/SCI',
    location: 'Herndon, VA',
    jobPostUrl: 'https://example.com/job1',
    notes: 'Had initial phone screening on 3/20. Technical interview scheduled for next week.',
    followUpDate: '2024-03-28'
  },
  {
    id: '2',
    jobTitle: 'DevOps Engineer',
    company: 'Booz Allen Hamilton',
    dateApplied: '2024-03-10',
    source: 'LinkedIn',
    matchPercentage: 85,
    status: 'applied',
    clearanceRequired: 'SECRET',
    location: 'McLean, VA',
    jobPostUrl: 'https://example.com/job2',
    notes: ''
  },
  {
    id: '3',
    jobTitle: 'Network Security Analyst',
    company: 'CACI',
    dateApplied: '2024-03-05',
    source: 'USAJobs',
    matchPercentage: 78,
    status: 'offer',
    clearanceRequired: 'SECRET',
    location: 'Arlington, VA',
    jobPostUrl: 'https://example.com/job3',
    notes: 'Received offer on 3/18. Need to respond by 3/25. Salary: $125k + benefits',
    followUpDate: '2024-03-25'
  },
  {
    id: '4',
    jobTitle: 'Systems Administrator',
    company: 'Lockheed Martin',
    dateApplied: '2024-02-28',
    source: 'CAG Board',
    matchPercentage: 88,
    status: 'rejected',
    clearanceRequired: 'TS',
    location: 'Bethesda, MD',
    jobPostUrl: 'https://example.com/job4',
    notes: 'Position filled internally'
  },
  {
    id: '5',
    jobTitle: 'Cybersecurity Engineer',
    company: 'General Dynamics',
    dateApplied: '2024-03-12',
    source: 'Indeed',
    matchPercentage: 81,
    status: 'on-hold',
    clearanceRequired: 'TS/SCI',
    location: 'Falls Church, VA',
    jobPostUrl: 'https://example.com/job5',
    notes: 'Hiring manager on leave, will resume process in April'
  }
]

export default function JobsAppliedPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([])
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'match'>('newest')
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null)

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedApplications = localStorage.getItem('jobApplications')
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications))
    } else {
      setApplications(mockJobApplications)
      localStorage.setItem('jobApplications', JSON.stringify(mockJobApplications))
    }
  }, [])

  useEffect(() => {
    // Filter and sort applications
    let filtered = [...applications]

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(app => app.status === selectedStatus)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
        case 'oldest':
          return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
        case 'match':
          return b.matchPercentage - a.matchPercentage
        default:
          return 0
      }
    })

    setFilteredApplications(filtered)
  }, [applications, selectedStatus, searchQuery, sortBy])

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    const updated = applications.map(app => 
      app.id === jobId ? { ...app, status: newStatus } : app
    )
    setApplications(updated)
    localStorage.setItem('jobApplications', JSON.stringify(updated))
  }

  const handleDeleteApplication = (jobId: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      const updated = applications.filter(app => app.id !== jobId)
      setApplications(updated)
      localStorage.setItem('jobApplications', JSON.stringify(updated))
    }
  }

  const handleUpdateApplication = (jobId: string, updates: Partial<JobApplication>) => {
    const updated = applications.map(app => 
      app.id === jobId ? { ...app, ...updates } : app
    )
    setApplications(updated)
    localStorage.setItem('jobApplications', JSON.stringify(updated))
  }

  const handleSetReminder = (jobId: string, date: string) => {
    const updated = applications.map(app => 
      app.id === jobId ? { ...app, followUpDate: date } : app
    )
    setApplications(updated)
    localStorage.setItem('jobApplications', JSON.stringify(updated))
  }

  const analytics = {
    total: applications.length,
    interviews: applications.filter(a => a.status === 'interview').length,
    offers: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    successRate: applications.length > 0 
      ? Math.round((applications.filter(a => a.status === 'offer').length / applications.length) * 100)
      : 0
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-montserrat font-bold mb-2">
            Jobs Applied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track every job you've applied to and stay on top of your follow-ups.
          </p>
        </motion.div>

        {/* Analytics Widget */}
        <AnalyticsWidget analytics={analytics} />

        {/* Filter Bar */}
        <FilterBar
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Job Applications List */}
        {filteredApplications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-command-black rounded-lg shadow-md p-12 text-center"
          >
            <Briefcase size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Applications Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {applications.length === 0 
                ? "You haven't applied to any jobs yet. Go browse some cleared positions!"
                : "No applications match your current filters."}
            </p>
            {applications.length === 0 && (
              <a
                href="/jobs"
                className="inline-flex items-center bg-dynamic-green text-white px-6 py-3 rounded-full hover:bg-emerald-green transition-colors"
              >
                Browse Jobs
              </a>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <JobCard
                  application={application}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteApplication}
                  onSetReminder={handleSetReminder}
                  onUpdateApplication={handleUpdateApplication}
                />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}