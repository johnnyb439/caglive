'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Briefcase, 
  Award, 
  FileText, 
  Target, 
  Calendar,
  Bell,
  LogOut,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Clock,
  Shield,
  Star,
  Eye,
  MessageSquare,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserData {
  email: string
  name: string
  clearanceLevel: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const stats = [
    { label: 'Profile Completion', value: '75%', icon: User, color: 'text-green-400' },
    { label: 'Jobs Applied', value: '12', icon: Briefcase, color: 'text-blue-400' },
    { label: 'Certifications', value: '3', icon: Award, color: 'text-yellow-400' },
    { label: 'Mock Interviews', value: '5', icon: Target, color: 'text-purple-400' }
  ]

  const recentActivity = [
    { type: 'application', title: 'Applied to Network Administrator at TechCorp', time: '2 hours ago' },
    { type: 'interview', title: 'Completed mock interview for Systems Admin', time: '1 day ago' },
    { type: 'certification', title: 'Added Security+ certification', time: '3 days ago' },
    { type: 'profile', title: 'Updated resume', time: '1 week ago' }
  ]

  const recommendedJobs = [
    { title: 'Cloud Engineer', company: 'AWS Federal', clearance: 'SECRET', match: '92%' },
    { title: 'DevOps Engineer', company: 'Federal Cloud Systems', clearance: 'SECRET', match: '88%' },
    { title: 'Network Security Engineer', company: 'Secure Federal Networks', clearance: 'TS', match: '85%' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-400">
                Clearance Level: <span className="text-green-400 font-semibold">{user.clearanceLevel}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${
                (stat.label === 'Certifications' || stat.label === 'Jobs Applied' || stat.label === 'Mock Interviews') ? 'cursor-pointer hover:bg-gray-700/70 transition' : ''
              }`}
              onClick={() => {
                if (stat.label === 'Certifications') {
                  router.push('/dashboard/certifications')
                } else if (stat.label === 'Jobs Applied') {
                  router.push('/jobs-applied')
                } else if (stat.label === 'Mock Interviews') {
                  router.push('/mock-interview')
                }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-sm text-green-400">+2 new</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/jobs"
                  className="flex items-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700/70 transition"
                >
                  <Briefcase className="text-blue-400 mr-3 w-6 h-6" />
                  <div>
                    <p className="font-semibold">Browse Jobs</p>
                    <p className="text-sm text-gray-400">View cleared positions</p>
                  </div>
                </Link>
                <Link
                  href="/mock-interview"
                  className="flex items-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700/70 transition"
                >
                  <Target className="text-purple-400 mr-3 w-6 h-6" />
                  <div>
                    <p className="font-semibold">Practice Interview</p>
                    <p className="text-sm text-gray-400">AI-powered prep</p>
                  </div>
                </Link>
                <Link
                  href="/resources"
                  className="flex items-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700/70 transition"
                >
                  <BookOpen className="text-green-400 mr-3 w-6 h-6" />
                  <div>
                    <p className="font-semibold">Resources</p>
                    <p className="text-sm text-gray-400">Career guides</p>
                  </div>
                </Link>
                <Link
                  href="/dashboard/resume"
                  className="flex items-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700/70 transition"
                >
                  <FileText className="text-yellow-400 mr-3 w-6 h-6" />
                  <div>
                    <p className="font-semibold">Update Resume</p>
                    <p className="text-sm text-gray-400">Military translation</p>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-gray-200">{activity.title}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Job Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-6">Job Matches</h2>
              <div className="space-y-4">
                {recommendedJobs.map((job, index) => (
                  <Link
                    key={index}
                    href="/jobs"
                    className="block p-4 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700/70 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <span className="text-sm text-green-400 font-semibold">{job.match}</span>
                    </div>
                    <p className="text-sm text-gray-400">{job.company}</p>
                    <p className="text-sm text-gray-500">Requires: {job.clearance}</p>
                  </Link>
                ))}
              </div>
              <Link
                href="/jobs"
                className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition"
              >
                View all matches
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="text-purple-400 mr-3 mt-1 w-5 h-5" />
                  <div>
                    <p className="font-semibold">Virtual Career Fair</p>
                    <p className="text-sm text-gray-400">March 15, 2025 • 2:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="text-purple-400 mr-3 mt-1 w-5 h-5" />
                  <div>
                    <p className="font-semibold">Resume Workshop</p>
                    <p className="text-sm text-gray-400">March 20, 2025 • 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white"
            >
              <div className="flex items-center mb-4">
                <Bell className="w-6 h-6 mr-3" />
                <h3 className="font-semibold">Job Alerts Active</h3>
              </div>
              <p className="text-sm mb-4">
                You're receiving alerts for Network Admin and Cloud Engineer positions.
              </p>
              <button className="text-sm underline hover:no-underline">
                Manage Preferences
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}