'use client'

import { motion } from 'framer-motion'
import { 
  Target, 
  Briefcase,
  TrendingUp,
  ChevronRight,
  Building,
  Loader2,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { JobMatch } from '@/types/resume'

interface JobMatcherProps {
  jobMatches: JobMatch[] | undefined
  isAnalyzing: boolean
}

export default function JobMatcher({ jobMatches, isAnalyzing }: JobMatcherProps) {
  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 size={48} className="text-dynamic-green animate-spin mb-4" />
          <h3 className="text-lg font-semibold mb-2">Matching Jobs</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Finding the best job matches for your resume...
          </p>
        </div>
      </motion.div>
    )
  }

  if (!jobMatches || jobMatches.length === 0) {
    return null
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 80) return 'text-blue-600 dark:text-blue-400'
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  const getMatchBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    if (score >= 80) return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    if (score >= 70) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-montserrat font-bold mb-6 flex items-center gap-2">
        <Target size={24} className="text-dynamic-blue" />
        Resume-to-Job Matcher
      </h2>

      <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Sparkles size={16} className="text-dynamic-green" />
          Top job matches based on your resume analysis
        </p>
      </div>

      <div className="space-y-4">
        {jobMatches.map((match, index) => (
          <motion.div
            key={match.jobId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 border rounded-lg ${getMatchBgColor(match.matchScore)} hover:shadow-md transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Briefcase size={18} className="text-gray-600 dark:text-gray-400" />
                  {match.jobTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                  <Building size={14} />
                  {match.company}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getMatchColor(match.matchScore)}`}>
                  {match.matchScore}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Match</div>
              </div>
            </div>

            {/* Match Suggestions */}
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <TrendingUp size={14} className="text-dynamic-green" />
                To improve match:
              </h4>
              <ul className="space-y-1">
                {match.suggestions.map((suggestion, suggestionIndex) => (
                  <li
                    key={suggestionIndex}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                  >
                    <span className="text-dynamic-green mt-0.5">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link
                href={`/jobs/${match.jobId}`}
                className="flex items-center gap-1 text-sm text-dynamic-green hover:text-emerald-green font-medium"
              >
                View Job
                <ChevronRight size={16} />
              </Link>
              <button
                onClick={() => {
                  // In a real app, this would apply with the current resume
                  alert('Quick Apply functionality would be implemented here')
                }}
                className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Quick Apply
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        href="/jobs"
        className="mt-6 w-full bg-dynamic-green text-white py-3 rounded-lg hover:bg-emerald-green transition-colors flex items-center justify-center gap-2"
      >
        Browse All Jobs
        <ChevronRight size={18} />
      </Link>
    </motion.div>
  )
}