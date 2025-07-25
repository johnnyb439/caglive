'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Award, 
  Plus, 
  Calendar,
  Shield,
  Cloud,
  Network,
  Code,
  Server,
  Database,
  ChevronLeft,
  Edit2,
  Trash2,
  Check,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiry?: string
  credentialId?: string
  category: 'security' | 'cloud' | 'network' | 'development' | 'infrastructure' | 'other'
}

const categoryIcons = {
  security: Shield,
  cloud: Cloud,
  network: Network,
  development: Code,
  infrastructure: Server,
  other: Database
}

const categoryColors = {
  security: 'text-red-500 bg-red-50',
  cloud: 'text-blue-500 bg-blue-50',
  network: 'text-green-500 bg-green-50',
  development: 'text-dynamic-green bg-green-50',
  infrastructure: 'text-orange-500 bg-orange-50',
  other: 'text-gray-500 bg-gray-50'
}

export default function CertificationsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    expiry: '',
    credentialId: '',
    category: 'other' as Certification['category']
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      // Load certifications from localStorage
      const savedCerts = localStorage.getItem('certifications')
      if (savedCerts) {
        setCertifications(JSON.parse(savedCerts))
      } else {
        // Default certifications for demo
        const defaultCerts: Certification[] = [
          {
            id: '1',
            name: 'CompTIA Security+',
            issuer: 'CompTIA',
            date: '2024-01-15',
            expiry: '2027-01-15',
            credentialId: 'COMP001234',
            category: 'security'
          },
          {
            id: '2',
            name: 'AWS Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2023-11-20',
            expiry: '2026-11-20',
            credentialId: 'AWS-SAA-C03',
            category: 'cloud'
          },
          {
            id: '3',
            name: 'CCNA',
            issuer: 'Cisco',
            date: '2023-08-10',
            category: 'network'
          }
        ]
        setCertifications(defaultCerts)
        localStorage.setItem('certifications', JSON.stringify(defaultCerts))
      }
    } else {
      router.push('/login')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingId) {
      // Update existing certification
      const updated = certifications.map(cert => 
        cert.id === editingId 
          ? { ...cert, ...formData, id: editingId }
          : cert
      )
      setCertifications(updated)
      localStorage.setItem('certifications', JSON.stringify(updated))
      setEditingId(null)
    } else {
      // Add new certification
      const newCert: Certification = {
        ...formData,
        id: Date.now().toString()
      }
      const updated = [...certifications, newCert]
      setCertifications(updated)
      localStorage.setItem('certifications', JSON.stringify(updated))
    }
    
    // Reset form
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expiry: '',
      credentialId: '',
      category: 'other'
    })
    setShowAddForm(false)
  }

  const handleEdit = (cert: Certification) => {
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiry: cert.expiry || '',
      credentialId: cert.credentialId || '',
      category: cert.category
    })
    setEditingId(cert.id)
    setShowAddForm(true)
  }

  const handleDelete = (id: string) => {
    const updated = certifications.filter(cert => cert.id !== id)
    setCertifications(updated)
    localStorage.setItem('certifications', JSON.stringify(updated))
  }

  const popularCertifications = [
    { name: 'CompTIA Security+', category: 'security' },
    { name: 'AWS Cloud Practitioner', category: 'cloud' },
    { name: 'CISSP', category: 'security' },
    { name: 'Azure Fundamentals', category: 'cloud' },
    { name: 'CCNA', category: 'network' },
    { name: 'PMP', category: 'other' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dynamic-green"></div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-ops-charcoal py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link 
            href="/dashboard"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-montserrat font-bold mb-2">
                My Certifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track and manage your professional certifications
              </p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true)
                setEditingId(null)
                setFormData({
                  name: '',
                  issuer: '',
                  date: '',
                  expiry: '',
                  credentialId: '',
                  category: 'other'
                })
              }}
              className="bg-dynamic-green text-white px-6 py-3 rounded-full hover:bg-emerald-green transition-colors flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Certification
            </button>
          </div>
        </motion.div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-command-black rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-montserrat font-bold mb-6">
              {editingId ? 'Edit Certification' : 'Add New Certification'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-dynamic-green focus:border-transparent"
                    placeholder="e.g., CompTIA Security+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-dynamic-green focus:border-transparent"
                    placeholder="e.g., CompTIA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-dynamic-green focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-dynamic-green focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={formData.credentialId}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-dynamic-green focus:border-transparent"
                    placeholder="e.g., COMP001234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Certification['category'] })}
                    className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-dynamic-green focus:border-transparent"
                  >
                    <option value="security">Security</option>
                    <option value="cloud">Cloud</option>
                    <option value="network">Network</option>
                    <option value="development">Development</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingId(null)
                  }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-dynamic-green text-white rounded-lg hover:bg-emerald-green transition-colors"
                >
                  {editingId ? 'Update' : 'Add'} Certification
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {certifications.map((cert, index) => {
            const Icon = categoryIcons[cert.category]
            const colorClass = categoryColors[cert.category]
            
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-command-black rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${colorClass}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(cert)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{cert.issuer}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    Issued: {new Date(cert.date).toLocaleDateString()}
                  </div>
                  {cert.expiry && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar size={16} className="mr-2" />
                      Expires: {new Date(cert.expiry).toLocaleDateString()}
                    </div>
                  )}
                  {cert.credentialId && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Award size={16} className="mr-2" />
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Popular Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white dark:bg-command-black rounded-lg shadow-md p-6"
        >
          <h2 className="text-xl font-montserrat font-bold mb-6">
            Popular Certifications for Cleared Professionals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {popularCertifications.map((cert, index) => {
              const Icon = categoryIcons[cert.category as keyof typeof categoryIcons]
              const colorClass = categoryColors[cert.category as keyof typeof categoryColors]
              
              return (
                <div
                  key={index}
                  className="flex items-center p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`p-2 rounded mr-3 ${colorClass}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-medium">{cert.name}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}