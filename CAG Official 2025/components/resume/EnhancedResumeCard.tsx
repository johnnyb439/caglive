'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  Check, 
  X, 
  Trash2, 
  Brain,
  AlertTriangle,
  Shield,
  Info
} from 'lucide-react'
import { detectPII } from '@/utils/piiDetection'

interface ResumeCardProps {
  currentResume: {
    name: string
    size: string
    uploadDate: string
    isDefault: boolean
  } | null
  onUpload: (file: File) => void
  onDelete: () => void
  onSetDefault: (value: boolean) => void
  onRunAIReview: () => void
  isUploading: boolean
  hasAIReview?: boolean
}

export default function EnhancedResumeCard({
  currentResume,
  onUpload,
  onDelete,
  onSetDefault,
  onRunAIReview,
  isUploading,
  hasAIReview = false
}: ResumeCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPIIWarning, setShowPIIWarning] = useState(false)
  const [piiWarnings, setPiiWarnings] = useState<string[]>([])

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = async (file: File) => {
    if (file.type === 'application/pdf' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Show PII warning
      setShowPIIWarning(true)
      onUpload(file)
    } else {
      alert('Please upload a PDF or DOCX file')
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    onDelete()
    setShowDeleteModal(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-dynamic-green" />
            Current Resume
          </h2>
          {showPIIWarning && (
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Privacy Protected</span>
            </div>
          )}
        </div>

        {/* PII Warning Banner */}
        {showPIIWarning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-400 mb-1">Privacy Notice</p>
                <p className="text-xs text-gray-300">
                  Do not upload resumes containing SSNs or unredacted clearance investigation details. 
                  Our AI will analyze your resume securely without storing personal information.
                </p>
              </div>
              <button
                onClick={() => setShowPIIWarning(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
        
        {currentResume ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{currentResume.name}</p>
                  <p className="text-sm text-gray-400">
                    {currentResume.size} • Uploaded {currentResume.uploadDate}
                  </p>
                </div>
              </div>
              <Check className="w-5 h-5 text-green-400" />
            </div>

            {/* AI Review Button */}
            {!hasAIReview && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRunAIReview}
                className="w-full bg-gradient-to-r from-dynamic-green to-dynamic-blue text-white px-4 py-3 rounded-lg hover:from-emerald-green hover:to-sky-blue transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <Brain className="w-5 h-5" />
                Run AI Review
              </motion.button>
            )}

            {/* Delete button */}
            <button
              onClick={handleDeleteClick}
              className="w-full px-4 py-2 bg-red-900/20 border border-red-800 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Resume</span>
            </button>

            {/* Default checkbox */}
            <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition">
              <input
                type="checkbox"
                checked={currentResume.isDefault}
                onChange={(e) => onSetDefault(e.target.checked)}
                className="w-4 h-4 text-dynamic-green rounded focus:ring-dynamic-green"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-300">
                  Use this resume for all future job applications
                </span>
                {currentResume.isDefault && (
                  <span className="text-xs text-gray-500 block mt-1">
                    Default since {new Date().toLocaleDateString()}
                  </span>
                )}
              </div>
            </label>
          </div>
        ) : (
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${isDragging ? 'border-dynamic-green bg-dynamic-green/10' : 'border-gray-600 bg-gray-900'}
              ${isUploading ? 'opacity-50 pointer-events-none' : 'hover:border-gray-500'}
            `}
          >
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.docx"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isUploading}
            />
            
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-dynamic-green' : 'text-gray-400'}`} />
            
            <label htmlFor="resume-upload" className="cursor-pointer">
              <p className="text-base font-medium text-white mb-1">
                {isDragging ? 'Drop your resume here' : 'Upload your resume'}
              </p>
              <p className="text-sm text-gray-400">
                Drag and drop or <span className="text-dynamic-green hover:text-emerald-green">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supports PDF and DOCX files up to 10MB
              </p>
            </label>

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-dynamic-green"></div>
                  <p className="mt-2 text-sm text-gray-400">Uploading...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Privacy Info */}
        <div className="mt-4 p-3 bg-gray-900 rounded-lg flex items-start gap-3">
          <Info className="w-4 h-4 text-gray-400 mt-0.5" />
          <p className="text-xs text-gray-400">
            Your resume content is extracted securely and never stored permanently. 
            AI analysis is performed on anonymized text only.
          </p>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Resume</h3>
              </div>
              
              <p className="text-gray-400 mb-6">
                Are you sure you want to permanently delete this resume? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Resume
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}