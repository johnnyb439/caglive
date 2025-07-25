'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Zap,
  Target,
  Loader2
} from 'lucide-react'
import { ResumeInsights } from '@/types/resume'

interface InsightsPanelProps {
  insights: ResumeInsights | undefined
  isAnalyzing: boolean
}

export default function InsightsPanel({ insights, isAnalyzing }: InsightsPanelProps) {
  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 size={48} className="text-dynamic-green animate-spin mb-4" />
          <h3 className="text-lg font-semibold mb-2">Analyzing Your Resume</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Running AI-powered analysis to optimize your resume...
          </p>
        </div>
      </motion.div>
    )
  }

  if (!insights) {
    return null
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20'
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20'
    return 'bg-red-100 dark:bg-red-900/20'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-montserrat font-bold mb-6 flex items-center gap-2">
        <Sparkles size={24} className="text-dynamic-green" />
        AI Resume Insights
      </h2>

      {/* Match Score */}
      <div className={`p-4 rounded-lg mb-6 ${getScoreBgColor(insights.matchScore)}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Match Score</span>
          <span className={`text-3xl font-bold ${getScoreColor(insights.matchScore)}`}>
            {insights.matchScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${insights.matchScore}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full rounded-full ${
              insights.matchScore >= 80 
                ? 'bg-green-600 dark:bg-green-400' 
                : insights.matchScore >= 60 
                ? 'bg-yellow-600 dark:bg-yellow-400' 
                : 'bg-red-600 dark:bg-red-400'
            }`}
          />
        </div>
      </div>

      {/* Keywords Found */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Zap size={18} className="text-blue-500" />
          Keywords Found
        </h3>
        <div className="flex flex-wrap gap-2">
          {insights.keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      {insights.missingKeywords.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle size={18} className="text-orange-500" />
            Suggested Keywords to Add
          </h3>
          <div className="flex flex-wrap gap-2">
            {insights.missingKeywords.map((keyword, index) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm"
              >
                + {keyword}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle size={18} className="text-green-500" />
          Resume Strengths
        </h3>
        <ul className="space-y-2">
          {insights.strengths.map((strength, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              {strength}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <TrendingUp size={18} className="text-dynamic-green" />
          Improvement Suggestions
        </h3>
        <ul className="space-y-2">
          {insights.suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <Target size={16} className="text-dynamic-green mt-0.5 flex-shrink-0" />
              {suggestion}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}