'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  MessageSquare, Send, AlertTriangle, Shield, X, 
  Clock, ChevronLeft, Info, Sparkles, Phone,
  CheckCircle, AlertCircle
} from 'lucide-react'
import { detectPII, sanitizeMessage } from '@/utils/piiDetection'

interface Message {
  id: string
  threadId: string
  senderId: string
  senderName: string
  senderType: 'candidate' | 'recruiter'
  content: string
  timestamp: Date
  isRead: boolean
}

interface Thread {
  id: string
  recruiterId: string
  recruiterName: string
  recruiterCompany: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

interface MessageCenterProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export default function MessageCenter({ isOpen, onClose, userId }: MessageCenterProps) {
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const [subject, setSubject] = useState('')
  const [piiWarning, setPiiWarning] = useState<{ show: boolean; message: string }>({ show: false, message: '' })
  const [showAITip, setShowAITip] = useState(false)
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: '1',
      recruiterId: 'r1',
      recruiterName: 'Sarah Johnson',
      recruiterCompany: 'Lockheed Martin',
      lastMessage: "Great! I'll schedule you for a technical interview next week.",
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 1
    },
    {
      id: '2',
      recruiterId: 'r2',
      recruiterName: 'Mike Chen',
      recruiterCompany: 'Booz Allen Hamilton',
      lastMessage: 'Thanks for your interest. Can you tell me about your clearance status?',
      lastMessageTime: new Date(Date.now() - 86400000),
      unreadCount: 0
    }
  ])
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      threadId: '1',
      senderId: 'r1',
      senderName: 'Sarah Johnson',
      senderType: 'recruiter',
      content: "Hi! I saw your profile and think you'd be a great fit for our Senior Software Engineer position.",
      timestamp: new Date(Date.now() - 7200000),
      isRead: true
    },
    {
      id: '2',
      threadId: '1',
      senderId: userId,
      senderName: 'You',
      senderType: 'candidate',
      content: "Thank you for reaching out! I'm very interested in the position.",
      timestamp: new Date(Date.now() - 3700000),
      isRead: true
    },
    {
      id: '3',
      threadId: '1',
      senderId: 'r1',
      senderName: 'Sarah Johnson',
      senderType: 'recruiter',
      content: "Great! I'll schedule you for a technical interview next week.",
      timestamp: new Date(Date.now() - 3600000),
      isRead: false
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeThread])

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeThread) return

    // Check for PII
    const piiCheck = detectPII(messageText)
    if (piiCheck.hasPII) {
      setPiiWarning({ show: true, message: piiCheck.message })
      setShowAITip(true)
      return
    }

    // Add message
    const newMessage: Message = {
      id: Date.now().toString(),
      threadId: activeThread,
      senderId: userId,
      senderName: 'You',
      senderType: 'candidate',
      content: messageText,
      timestamp: new Date(),
      isRead: true
    }

    setMessages([...messages, newMessage])
    setMessageText('')
    setPiiWarning({ show: false, message: '' })
    setShowAITip(false)

    // Update thread last message
    setThreads(threads.map(thread => 
      thread.id === activeThread 
        ? { ...thread, lastMessage: messageText, lastMessageTime: new Date() }
        : thread
    ))
  }

  const getThreadMessages = (threadId: string) => {
    return messages.filter(msg => msg.threadId === threadId)
  }

  const markThreadAsRead = (threadId: string) => {
    setMessages(messages.map(msg => 
      msg.threadId === threadId ? { ...msg, isRead: true } : msg
    ))
    setThreads(threads.map(thread =>
      thread.id === threadId ? { ...thread, unreadCount: 0 } : thread
    ))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-4xl h-[80vh] flex flex-col border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold">Secure Message Center</h2>
            <span className="text-xs bg-green-400/10 text-green-400 px-2 py-1 rounded-full border border-green-400/30">
              End-to-End Encrypted
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Thread List */}
          <div className={`w-full md:w-1/3 border-r border-gray-700 overflow-y-auto ${activeThread ? 'hidden md:block' : ''}`}>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Recruiter Conversations</h3>
              {threads.map(thread => (
                <button
                  key={thread.id}
                  onClick={() => {
                    setActiveThread(thread.id)
                    markThreadAsRead(thread.id)
                  }}
                  className={`w-full p-4 text-left hover:bg-gray-700/50 rounded-lg transition mb-2 ${
                    activeThread === thread.id ? 'bg-gray-700/70' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-semibold">{thread.recruiterName}</p>
                      <p className="text-xs text-gray-400">{thread.recruiterCompany}</p>
                    </div>
                    {thread.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 truncate">{thread.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(thread.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Message View */}
          <div className={`flex-1 flex flex-col ${!activeThread && 'hidden md:flex'}`}>
            {activeThread ? (
              <>
                {/* Thread Header */}
                <div className="p-4 border-b border-gray-700 flex items-center gap-4">
                  <button 
                    onClick={() => setActiveThread(null)}
                    className="md:hidden text-gray-400 hover:text-gray-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {threads.find(t => t.id === activeThread)?.recruiterName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {threads.find(t => t.id === activeThread)?.recruiterCompany}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Phone className="w-4 h-4" />
                    SMS-style messaging
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {getThreadMessages(activeThread).map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderType === 'candidate' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${
                          message.senderType === 'candidate' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-700 text-gray-100'
                        } rounded-lg p-3`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* PII Warning */}
                {piiWarning.show && (
                  <div className="mx-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-400">Message Blocked</p>
                        <p className="text-sm text-gray-300 mt-1">{piiWarning.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Tip */}
                {showAITip && (
                  <div className="mx-4 mt-2 p-3 bg-dynamic-green/10 border border-dynamic-green/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-dynamic-green mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-dynamic-green font-medium">AI Tip</p>
                        <p className="text-xs text-gray-300 mt-1">
                          Keep your personal info safe! Share your clearance level and work experience, 
                          but never SSN, DOB, or personal contact info.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => {
                        setMessageText(e.target.value)
                        if (piiWarning.show) {
                          const check = detectPII(e.target.value)
                          if (!check.hasPII) {
                            setPiiWarning({ show: false, message: '' })
                            setShowAITip(false)
                          }
                        }
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a secure message..."
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg transition flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Messages are encrypted and PII-filtered for your security
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start messaging</p>
                  <p className="text-sm mt-2">All messages are secure and PII-protected</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}