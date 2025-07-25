'use client'

import { motion } from 'framer-motion'
import { 
  Clock, 
  FileText, 
  RotateCcw,
  Eye,
  Calendar,
  Tag
} from 'lucide-react'
import { Resume } from '@/types/resume'

interface ResumeHistoryProps {
  history: Resume[]
  onRestore: (resume: Resume) => void
}

export default function ResumeHistory({ history, onRestore }: ResumeHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (history.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-montserrat font-bold mb-6 flex items-center gap-2">
        <Clock size={24} />
        Version History
      </h2>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((resume, index) => (
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
                  <FileText size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{resume.fileName}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(resume.uploadDate)}
                    </span>
                    <span>Version {resume.version}</span>
                  </div>
                  {resume.tags && resume.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <Tag size={12} className="text-gray-400" />
                      {resume.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onRestore(resume)}
                className="flex items-center gap-1 px-3 py-1 bg-dynamic-green text-white text-sm rounded hover:bg-emerald-green transition-colors"
              >
                <RotateCcw size={14} />
                Restore
              </button>
              <button
                onClick={() => {
                  // In a real app, this would open a preview
                  alert('Preview functionality would be implemented here')
                }}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Eye size={14} />
                Preview
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        Showing last {history.length} versions
      </p>
    </motion.div>
  )
}