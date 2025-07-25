'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, Trophy, TrendingUp } from 'lucide-react'

interface AnalyticsProps {
  analytics: {
    total: number
    interviews: number
    offers: number
    rejected: number
    successRate: number
  }
}

export default function AnalyticsWidget({ analytics }: AnalyticsProps) {
  const stats = [
    {
      label: 'Total Applied',
      value: analytics.total,
      icon: Briefcase,
      color: 'text-dynamic-blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Interviews',
      value: analytics.interviews,
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      label: 'Offers',
      value: analytics.offers,
      icon: Trophy,
      color: 'text-dynamic-green',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      label: 'Success Rate',
      value: `${analytics.successRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}