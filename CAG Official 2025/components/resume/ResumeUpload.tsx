'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  X, 
  Check,
  Calendar,
  FileCheck,
  Loader2
} from 'lucide-react'
import { Resume } from '@/types/resume'

interface ResumeUploadProps {
  currentResume: Resume | null
  onUpload: (file: File) => void
  onSetDefault: (isDefault: boolean) => void
  onDelete?: () => void
}

export default function ResumeUpload({ currentResume, onUpload, onSetDefault, onDelete }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const validFile = files.find(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )

    if (validFile) {
      processFile(validFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = async (file: File) => {
    setIsUploading(true)
    
    // Simulate upload delay
    setTimeout(() => {
      onUpload(file)
      setIsUploading(false)
    }, 1500)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return Math.round(bytes / 1024) + ' KB'
    return Math.round(bytes / 1048576) + ' MB'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
    >
      <h2 className="text-xl font-montserrat font-bold mb-6 flex items-center gap-2">
        <FileText size={24} />
        Resume Upload
      </h2>

      {!currentResume ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging 
              ? 'border-dynamic-green bg-green-50 dark:bg-green-900/10' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {isUploading ? (
            <div className="space-y-3">
              <Loader2 size={48} className="mx-auto text-dynamic-green animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">Uploading resume...</p>
            </div>
          ) : (
            <>
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">
                Drag and drop your resume here
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                or click to browse (PDF or DOCX)
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-dynamic-green text-white rounded-lg hover:bg-emerald-green transition-colors"
              >
                Browse Files
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Current Resume Display */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="p-2 bg-dynamic-green/10 rounded-lg flex-shrink-0">
                  <FileCheck size={24} className="text-dynamic-green" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{currentResume.fileName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {formatFileSize(currentResume.fileSize)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    Uploaded {formatDate(currentResume.uploadDate)}
                  </div>
                  {currentResume.tags && (
                    <div className="flex gap-2 mt-2">
                      {currentResume.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to remove this resume?')) {
                    onDelete?.()
                  }
                }}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Default Resume Toggle */}
            <div className="flex items-center justify-between pt-3 border-t dark:border-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentResume.isDefault}
                  onChange={(e) => onSetDefault(e.target.checked)}
                  className="w-4 h-4 text-dynamic-green rounded border-gray-300 focus:ring-dynamic-green"
                />
                <span className="text-sm">Use as default for all applications</span>
              </label>
              {currentResume.isDefault && (
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Check size={14} />
                  Default
                </span>
              )}
            </div>
          </div>

          {/* Replace Resume Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            Replace Resume
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </motion.div>
  )
}