'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import mammoth from 'mammoth'
import { Loader2, AlertCircle, FileText, ChevronLeft, ChevronRight } from 'lucide-react'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface ResumePreviewProps {
  file: File | null
  fileUrl: string | null
}

export default function ResumePreview({ file, fileUrl }: ResumePreviewProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [docxContent, setDocxContent] = useState<string | null>(null)

  useEffect(() => {
    if (file) {
      setLoading(true)
      setError(null)
      
      if (file.type === 'application/pdf') {
        // PDF files are handled by react-pdf component
        setDocxContent(null)
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle DOCX files
        const reader = new FileReader()
        reader.onload = async (e) => {
          try {
            const arrayBuffer = e.target?.result as ArrayBuffer
            const result = await mammoth.convertToHtml({ arrayBuffer })
            setDocxContent(result.value)
            setLoading(false)
          } catch (err) {
            setError('Failed to load DOCX file')
            setLoading(false)
          }
        }
        reader.readAsArrayBuffer(file)
      } else {
        setError('Unsupported file type. Please upload PDF or DOCX.')
        setLoading(false)
      }
    }
  }, [file])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError() {
    setError('Failed to load PDF')
    setLoading(false)
  }

  if (!file && !fileUrl) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No resume uploaded yet</p>
        <p className="text-sm text-gray-500 mt-2">Upload a resume to see preview</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-dynamic-green" />
          Resume Preview
        </h3>
      </div>

      <div className="p-4">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-dynamic-green animate-spin" />
            <span className="ml-3 text-gray-400">Loading preview...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <p className="text-red-400 font-medium">Preview Error</p>
              <p className="text-sm text-gray-400 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* PDF Preview */}
        {file?.type === 'application/pdf' && fileUrl && !error && (
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-dynamic-green animate-spin" />
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mx-auto"
                width={window.innerWidth > 768 ? 500 : 300}
              />
            </Document>

            {numPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-t border-gray-700">
                <button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-sm text-gray-400">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                  disabled={pageNumber >= numPages}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* DOCX Preview */}
        {docxContent && !error && (
          <div 
            className="bg-gray-900 rounded-lg p-6 prose prose-invert max-w-none overflow-auto max-h-[600px] custom-scrollbar"
            dangerouslySetInnerHTML={{ __html: docxContent }}
          />
        )}
      </div>
    </div>
  )
}