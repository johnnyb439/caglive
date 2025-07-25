'use client'

import { useState } from 'react'
import { 
  User, Upload, FileText, Shield, Award, TrendingUp, MapPin, 
  DollarSign, Calendar, Mail, Search, Edit, Check, X, Star,
  Briefcase, Clock, ChevronRight, AlertCircle, Sparkles,
  Target, Building, Brain, CheckCircle2, XCircle, LayoutDashboard,
  MessageSquare, Linkedin, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import MessageCenter from '@/components/MessageCenter'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    role: 'Senior Software Engineer',
    clearance: 'Top Secret/SCI',
    location: 'Arlington, VA',
    avatar: null as string | null,
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    profileStrength: 75,
    linkedinUrl: ''
  })

  const [dreamJob, setDreamJob] = useState({
    title: '',
    locations: [''],
    salaryRange: [120000, 180000],
    availability: 'Available Now',
    clearanceLevel: 'Top Secret/SCI',
    tags: ['Remote', 'Full-Time'],
    emailAlerts: true
  })

  const [aiSuggestion, setAiSuggestion] = useState({
    visible: false,
    message: 'Try uploading your AWS certification to match 2 more jobs in your area!'
  })

  const [documents, setDocuments] = useState({
    resume: { uploaded: true, lastUpdate: '2 days ago' },
    certifications: ['AWS Solutions Architect', 'Security+', 'CISSP']
  })

  const activityStats = {
    jobsApplied: 12,
    jobsSaved: 24,
    aiReviews: 3,
    interviewsScheduled: 2,
    hiringProgress: 65
  }

  const badges = [
    { id: 1, name: 'Top 10% Resume', icon: Star, earned: true, color: 'text-yellow-500' },
    { id: 2, name: 'TS/SCI Verified', icon: Shield, earned: true, color: 'text-blue-500' },
    { id: 3, name: 'Cyber Certified', icon: Award, earned: true, color: 'text-green-500' },
    { id: 4, name: 'Fast Responder', icon: Clock, earned: false, color: 'text-gray-400' },
  ]

  const availabilityOptions = ['Available Now', '2 Weeks Notice', '1 Month Notice', '2+ Months Notice']
  const clearanceOptions = ['Public Trust', 'Secret', 'Top Secret', 'Top Secret/SCI', 'TS/SCI + Poly']
  const tagOptions = ['Remote', 'Hybrid', 'On-Site', 'Contract', 'Full-Time', 'Part-Time']

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Overview Card */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    profileData.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-gray-400">{profileData.role}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-blue-400" />
                    {profileData.clearance}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-green-400" />
                    {profileData.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              <div className="flex gap-2 flex-wrap justify-end">
                <button 
                  onClick={() => setIsMessageCenterOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition relative"
                >
                  <MessageSquare className="w-4 h-4" />
                  Messages
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                <Link 
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-dynamic-green to-dynamic-blue text-white font-semibold rounded-lg hover:shadow-md hover:brightness-95 transition-all duration-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
              
              <div className="w-full md:w-64">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Strength</span>
                  <span className="text-blue-400">{profileData.profileStrength}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${profileData.profileStrength}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Documents & Certifications */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Documents & Certifications
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium">Resume</p>
                      <p className="text-sm text-gray-400">Last updated {documents.resume.lastUpdate}</p>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Update</button>
                </div>


                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {documents.certifications.map((cert, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm flex items-center gap-2">
                        {cert}
                        <button className="text-gray-400 hover:text-red-400">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <button className="px-3 py-1 border border-dashed border-gray-600 rounded-full text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300">
                      + Add Certification
                    </button>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition">
                  <Brain className="w-5 h-5" />
                  Let AI Review My Resume
                </button>
              </div>
            </div>

            {/* Dream Job Tracker */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Dream Job Tracker (AI Module)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Dream Job Title</label>
                  <input
                    type="text"
                    value={dreamJob.title}
                    onChange={(e) => setDreamJob({...dreamJob, title: e.target.value})}
                    placeholder="e.g., Senior Cloud Architect"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Locations</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Washington DC, Remote"
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600">
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Salary Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="80000"
                      max="250000"
                      step="5000"
                      value={dreamJob.salaryRange[1]}
                      onChange={(e) => setDreamJob({...dreamJob, salaryRange: [dreamJob.salaryRange[0], parseInt(e.target.value)]})}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${dreamJob.salaryRange[0].toLocaleString()}</span>
                      <span className="text-green-400">${dreamJob.salaryRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Availability</label>
                    <select 
                      value={dreamJob.availability}
                      onChange={(e) => setDreamJob({...dreamJob, availability: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      {availabilityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Clearance Level</label>
                    <select 
                      value={dreamJob.clearanceLevel}
                      onChange={(e) => setDreamJob({...dreamJob, clearanceLevel: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      {clearanceOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (dreamJob.tags.includes(tag)) {
                            setDreamJob({...dreamJob, tags: dreamJob.tags.filter(t => t !== tag)})
                          } else {
                            setDreamJob({...dreamJob, tags: [...dreamJob.tags, tag]})
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          dreamJob.tags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dreamJob.emailAlerts}
                      onChange={(e) => setDreamJob({...dreamJob, emailAlerts: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Email me new matches</span>
                  </label>
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition">
                  Save & Activate Tracker
                </button>

                <div className="mt-4 p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    3 jobs match your Dream Job (last scanned 2 hrs ago)
                  </p>
                </div>
              </div>

              {/* AI Assistant Popup */}
              {aiSuggestion.visible && (
                <div className="mt-4 p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg relative">
                  <button 
                    onClick={() => setAiSuggestion({...aiSuggestion, visible: false})}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-purple-400 mb-1">AI Suggestion</p>
                      <p className="text-sm text-gray-300">{aiSuggestion.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Activity Snapshot */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Activity Snapshot
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Jobs Applied</span>
                  <span className="text-2xl font-bold text-green-400">{activityStats.jobsApplied}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Jobs Saved</span>
                  <span className="text-2xl font-bold text-blue-400">{activityStats.jobsSaved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">AI Resume Reviews</span>
                  <span className="text-2xl font-bold text-purple-400">{activityStats.aiReviews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Interviews Scheduled</span>
                  <span className="text-2xl font-bold text-yellow-400">{activityStats.interviewsScheduled}</span>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Hiring Progress</span>
                    <span className="text-green-400">{activityStats.hiringProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-1000 animate-pulse"
                      style={{ width: `${activityStats.hiringProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Credibility & Badges */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Credibility & Badges
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {badges.map(badge => (
                  <div 
                    key={badge.id}
                    className={`p-4 rounded-lg border ${
                      badge.earned 
                        ? 'bg-gray-700/50 border-gray-600' 
                        : 'bg-gray-800 border-gray-700 opacity-50'
                    } text-center`}
                  >
                    <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.earned ? badge.color : 'text-gray-500'}`} />
                    <p className="text-sm font-medium">{badge.name}</p>
                    {badge.earned ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 mx-auto mt-2" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-500 mx-auto mt-2" />
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setAiSuggestion({...aiSuggestion, visible: true})}
                className="w-full mt-4 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-sm text-gray-300 transition"
              >
                View All Achievements
              </button>
            </div>
          </div>
        </div>
        
        {/* LinkedIn Profile Section - Add to existing profile data */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-400" />
            Professional Network
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-2">LinkedIn Profile</p>
              {profileData.linkedinUrl ? (
                <a 
                  href={profileData.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                >
                  <Linkedin className="w-5 h-5" />
                  View LinkedIn Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <p className="text-gray-500">No LinkedIn profile added</p>
              )}
            </div>
            {isEditing && (
              <input
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={profileData.linkedinUrl}
                onChange={(e) => setProfileData({...profileData, linkedinUrl: e.target.value})}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Message Center Modal */}
      <MessageCenter 
        isOpen={isMessageCenterOpen}
        onClose={() => setIsMessageCenterOpen(false)}
        userId="user123"
      />
    </div>
  )
}