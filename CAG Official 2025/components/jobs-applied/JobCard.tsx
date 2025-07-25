'use client'

import { useState } from 'react'
import { 
  Briefcase,
  Calendar,
  MapPin,
  Shield,
  FileText,
  RotateCcw,
  Mail,
  Trash2,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  Copy,
  User,
  Send,
  Clock,
  CheckCircle
} from 'lucide-react'
import { JobApplication, JobStatus } from '@/types/job-application'

interface JobCardProps {
  application: JobApplication
  onStatusChange: (jobId: string, status: JobStatus) => void
  onDelete: (jobId: string) => void
  onSetReminder: (jobId: string, date: string) => void
  onUpdateApplication?: (jobId: string, updates: Partial<JobApplication>) => void
}

const statusColors: Record<JobStatus, string> = {
  applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  interview: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  offer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'on-hold': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

const statusLabels: Record<JobStatus, string> = {
  applied: 'Applied',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
  'on-hold': 'On Hold'
}

const emailTemplates = {
  followUp: {
    subject: 'Following up on {jobTitle} position at {company}',
    body: `Dear Hiring Manager,

I hope this email finds you well. I wanted to follow up on my application for the {jobTitle} position that I submitted on {dateApplied}.

I remain very interested in this opportunity and believe my experience with {clearance} clearance and background in [relevant skills] make me a strong candidate for this role.

I would welcome the opportunity to discuss how I can contribute to your team. Please let me know if you need any additional information from me.

Thank you for your time and consideration.

Best regards,
[Your Name]`
  },
  thankYou: {
    subject: 'Thank you - {jobTitle} interview',
    body: `Dear [Interviewer Name],

Thank you for taking the time to meet with me today to discuss the {jobTitle} position at {company}.

I enjoyed learning about [specific topic discussed] and am even more excited about the opportunity to contribute to your team. Our discussion reinforced my interest in the role and confidence that my skills in [relevant area] would be valuable to your organization.

I look forward to the next steps in the process. Please don't hesitate to contact me if you need any additional information.

Best regards,
[Your Name]`
  },
  requestUpdate: {
    subject: 'Status update request - {jobTitle} position',
    body: `Dear Hiring Manager,

I hope you're doing well. I wanted to check in regarding the status of my application for the {jobTitle} position at {company}.

I understand these processes take time, but I wanted to reiterate my strong interest in this opportunity. If there's any additional information I can provide to support my application, please let me know.

Thank you for your time and consideration.

Best regards,
[Your Name]`
  }
}

export default function JobCard({ 
  application, 
  onStatusChange, 
  onDelete,
  onSetReminder,
  onUpdateApplication 
}: JobCardProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [reminderDate, setReminderDate] = useState(application.followUpDate || '')
  const [isExpanded, setIsExpanded] = useState(false)
  const [notes, setNotes] = useState(application.notes || '')
  const [contactName, setContactName] = useState(application.contactName || '')
  const [contactEmail, setContactEmail] = useState(application.contactEmail || '')
  const [contactPhone, setContactPhone] = useState(application.contactPhone || '')
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)

  const daysSinceApplied = Math.floor(
    (new Date().getTime() - new Date(application.dateApplied).getTime()) / (1000 * 60 * 60 * 24)
  )

  const handleStatusChange = (newStatus: JobStatus) => {
    onStatusChange(application.id, newStatus)
    setShowStatusDropdown(false)
  }

  const handleSaveNotes = () => {
    if (onUpdateApplication) {
      onUpdateApplication(application.id, { 
        notes,
        contactName,
        contactEmail,
        contactPhone
      })
    }
  }

  const copyEmailTemplate = (templateKey: keyof typeof emailTemplates) => {
    const template = emailTemplates[templateKey]
    const formattedSubject = template.subject
      .replace('{jobTitle}', application.jobTitle)
      .replace('{company}', application.company)
    
    const formattedBody = template.body
      .replace('{jobTitle}', application.jobTitle)
      .replace('{company}', application.company)
      .replace('{dateApplied}', new Date(application.dateApplied).toLocaleDateString())
      .replace('{clearance}', application.clearanceRequired)

    const emailContent = `Subject: ${formattedSubject}\n\n${formattedBody}`
    
    navigator.clipboard.writeText(emailContent)
    setCopiedTemplate(templateKey)
    setTimeout(() => setCopiedTemplate(null), 2000)
  }

  const openEmailClient = (templateKey: keyof typeof emailTemplates) => {
    const template = emailTemplates[templateKey]
    const subject = encodeURIComponent(
      template.subject
        .replace('{jobTitle}', application.jobTitle)
        .replace('{company}', application.company)
    )
    
    const body = encodeURIComponent(
      template.body
        .replace('{jobTitle}', application.jobTitle)
        .replace('{company}', application.company)
        .replace('{dateApplied}', new Date(application.dateApplied).toLocaleDateString())
        .replace('{clearance}', application.clearanceRequired)
    )

    const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    window.location.href = mailto
  }

  const shouldShowFollowUpSuggestion = daysSinceApplied > 7 && application.status === 'applied'

  return (
    <div className="bg-white dark:bg-command-black rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Main Card Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Section - Job Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{application.jobTitle}</h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    className="px-1.5 py-0.5 bg-gradient-to-r from-dynamic-green to-dynamic-blue text-white text-[10px] font-medium rounded-sm hover:shadow-sm hover:brightness-95 transition-all duration-200 group relative"
                    aria-expanded={isExpanded}
                    aria-label="Toggle Notes Section"
                    title="Toggle Notes Section"
                  >
                    CAG
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      Toggle Notes Section
                    </span>
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{application.company}</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Match Percentage */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-dynamic-green">{application.matchPercentage}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Match</div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {application.location}
              </div>
              <div className="flex items-center">
                <Shield size={16} className="mr-1" />
                {application.clearanceRequired}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                Applied {daysSinceApplied} days ago
              </div>
              <div className="flex items-center">
                <Briefcase size={16} className="mr-1" />
                via {application.source}
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${statusColors[application.status]}`}
                >
                  {statusLabels[application.status]}
                  <ChevronDown size={16} />
                </button>
                {showStatusDropdown && (
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-10 min-w-[120px]">
                    {Object.entries(statusLabels).map(([status, label]) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status as JobStatus)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <a
                href={application.jobPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                <ExternalLink size={16} />
                View Post
              </a>

              {/* Follow-up Reminder */}
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => {
                    setReminderDate(e.target.value)
                    onSetReminder(application.id, e.target.value)
                  }}
                  className="text-sm border dark:border-gray-600 dark:bg-gray-800 rounded px-2 py-1"
                  min={new Date().toISOString().split('T')[0]}
                />
                <Clock size={16} className="text-gray-400" />
              </div>

              <button
                onClick={() => onDelete(application.id)}
                className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 ml-auto"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            {/* Follow-up Alert */}
            {(application.followUpDate && new Date(application.followUpDate) <= new Date()) || shouldShowFollowUpSuggestion ? (
              <div className="mt-3 flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                <AlertCircle size={16} />
                {application.followUpDate && new Date(application.followUpDate) <= new Date() 
                  ? `Follow-up reminder: ${new Date(application.followUpDate).toLocaleDateString()}`
                  : `It's been ${daysSinceApplied} days - time to follow up!`
                }
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Notes & Contacts */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User size={18} />
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Recruiter/Hiring Manager Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    onBlur={handleSaveNotes}
                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Contact Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    onBlur={handleSaveNotes}
                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    onBlur={handleSaveNotes}
                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-800 text-sm"
                  />
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText size={18} />
                  Notes
                </h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleSaveNotes}
                  placeholder="Add notes about this application..."
                  className="w-full h-32 p-3 border dark:border-gray-600 rounded-lg resize-none dark:bg-gray-800 text-sm"
                />
              </div>
            </div>

            {/* Right Column - Email Templates */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Mail size={18} />
                Quick Email Templates
              </h4>
              <div className="space-y-3">
                {Object.entries(emailTemplates).map(([key, template]) => (
                  <div 
                    key={key}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">
                        {key === 'followUp' && '📧 Follow-Up Email'}
                        {key === 'thankYou' && '🙏 Thank You Email'}
                        {key === 'requestUpdate' && 'ℹ️ Status Update Request'}
                      </h5>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyEmailTemplate(key as keyof typeof emailTemplates)}
                          className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1"
                        >
                          {copiedTemplate === key ? (
                            <>
                              <CheckCircle size={14} className="text-green-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copy
                            </>
                          )}
                        </button>
                        {contactEmail && (
                          <button
                            onClick={() => openEmailClient(key as keyof typeof emailTemplates)}
                            className="text-sm px-3 py-1 bg-dynamic-green text-white rounded hover:bg-emerald-green flex items-center gap-1"
                          >
                            <Send size={14} />
                            Send
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {template.subject.replace(/{[^}]+}/g, (match) => {
                        const field = match.slice(1, -1)
                        return field === 'jobTitle' ? application.jobTitle :
                               field === 'company' ? application.company : match
                      })}
                    </p>
                  </div>
                ))}
              </div>
              {!contactEmail && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  💡 Add a contact email above to enable direct sending
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}