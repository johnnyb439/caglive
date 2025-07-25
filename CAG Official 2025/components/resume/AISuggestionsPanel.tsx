'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Download,
  Sparkles,
  Target,
  Award,
  Briefcase,
  Shield
} from 'lucide-react'

interface Suggestion {
  type: 'keyword' | 'skill' | 'improvement' | 'tip'
  text: string
  priority: 'high' | 'medium' | 'low'
}

interface AISuggestionsProps {
  score: number
  suggestions: Suggestion[]
  keywords: string[]
  missingKeywords: string[]
  isAnalyzing: boolean
  onDownloadReport: () => void
}

export default function AISuggestionsPanel({
  score,
  suggestions,
  keywords,
  missingKeywords,
  isAnalyzing,
  onDownloadReport
}: AISuggestionsProps) {
  const getScoreColor = () => {
    if (score >= 85) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreMessage = () => {
    if (score >= 85) return 'Excellent match for cleared positions!'
    if (score >= 70) return 'Good foundation, some improvements recommended'
    return 'Needs optimization for cleared job market'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20 border-red-800'
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800'
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-800'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800'
    }
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case 'keyword': return Target
      case 'skill': return Award
      case 'improvement': return TrendingUp
      case 'tip': return Sparkles
      default: return AlertCircle
    }
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-900 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-dynamic-green" />
          AI Suggestions
        </h3>
        <span className={`text-3xl font-bold ${getScoreColor()}`}>
          {score}%
        </span>
      </div>

      <div className="p-6 space-y-6">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-dynamic-green/20 rounded-full mb-4">
                <Brain className="w-8 h-8 text-dynamic-green animate-pulse" />
              </div>
              <p className="text-lg font-medium text-white mb-2">Analyzing your resume...</p>
              <p className="text-sm text-gray-400">AI is reviewing your content for cleared job optimization</p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Score Section */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-900 border-4 ${
                    score >= 85 ? 'border-green-400' : score >= 70 ? 'border-yellow-400' : 'border-red-400'
                  }`}
                >
                  <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
                </motion.div>
                <p className="mt-3 text-sm text-gray-400">{getScoreMessage()}</p>
              </div>

              {/* Keywords Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-dynamic-green" />
                  Security Clearance Keywords Found
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <motion.span
                      key={keyword}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1 bg-green-900/20 border border-green-800 rounded-full text-xs text-green-400"
                    >
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      {keyword}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              {missingKeywords.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-yellow-400" />
                    Add These Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((keyword, index) => (
                      <motion.span
                        key={keyword}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 bg-yellow-900/20 border border-yellow-800 rounded-full text-xs text-yellow-400"
                      >
                        + {keyword}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions List */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Improvement Suggestions</h4>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => {
                    const Icon = getIconForType(suggestion.type)
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{suggestion.text}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* AI Tip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-dynamic-green/10 to-dynamic-blue/10 border border-dynamic-green/30 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-dynamic-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-dynamic-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dynamic-green mb-1">AI Tip</p>
                    <p className="text-sm text-gray-300">
                      Try to quantify your accomplishments with specific metrics. For example, 
                      instead of "managed systems," say "managed 50+ classified systems supporting 200 users."
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Download Button */}
              <button
                onClick={onDownloadReport}
                className="w-full bg-gradient-to-r from-dynamic-green to-dynamic-blue text-white px-4 py-3 rounded-lg hover:from-emerald-green hover:to-sky-blue transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Suggestions Report
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}