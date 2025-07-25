'use client'

import { Search, Filter, ChevronDown } from 'lucide-react'
import { JobStatus } from '@/types/job-application'

interface FilterBarProps {
  selectedStatus: JobStatus | 'all'
  setSelectedStatus: (status: JobStatus | 'all') => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: 'newest' | 'oldest' | 'match'
  setSortBy: (sort: 'newest' | 'oldest' | 'match') => void
}

const statusOptions: Array<{ value: JobStatus | 'all', label: string }> = [
  { value: 'all', label: 'All Status' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'on-hold', label: 'On Hold' }
]

const sortOptions: Array<{ value: 'newest' | 'oldest' | 'match', label: string }> = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'match', label: 'Best Match %' }
]

export default function FilterBar({
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy
}: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-command-black rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-dynamic-green focus:border-transparent dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as JobStatus | 'all')}
              className="appearance-none bg-gray-50 dark:bg-gray-800 border dark:border-gray-600 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-dynamic-green focus:border-transparent cursor-pointer"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'match')}
              className="appearance-none bg-gray-50 dark:bg-gray-800 border dark:border-gray-600 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-dynamic-green focus:border-transparent cursor-pointer"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}