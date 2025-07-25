'use client'

import { useState } from 'react'
import { X, Save } from 'lucide-react'
import { JobApplication } from '@/types/job-application'

interface NotesModalProps {
  job: JobApplication
  onSave: (jobId: string, notes: string) => void
  onClose: () => void
}

export default function NotesModal({ job, onSave, onClose }: NotesModalProps) {
  const [notes, setNotes] = useState(job.notes || '')

  const handleSave = () => {
    onSave(job.id, notes)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-command-black rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold">Notes</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {job.jobTitle} at {job.company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes here... (e.g., interview feedback, salary discussions, hiring manager details, etc.)"
            className="w-full h-64 p-4 border dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-dynamic-green focus:border-transparent dark:bg-gray-800 dark:text-gray-200"
            autoFocus
          />
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-2">Suggested notes to track:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Interview dates and feedback</li>
              <li>Hiring manager and recruiter names</li>
              <li>Salary range discussions</li>
              <li>Key requirements or skills they emphasized</li>
              <li>Next steps and follow-up actions</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-dynamic-green text-white rounded-lg hover:bg-emerald-green transition-colors flex items-center gap-2"
          >
            <Save size={18} />
            Save Notes
          </button>
        </div>
      </div>
    </div>
  )
}