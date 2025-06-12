// src/components/AnnouncementsFeed/index.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { 
  CalendarIcon, 
  AlertCircleIcon, 
  FilterIcon,
  ChevronDownIcon 
} from 'lucide-react'

import type { Announcement as PayloadAnnouncement } from '@/payload-types'

type Announcement = PayloadAnnouncement

type AnnouncementsFeedProps = {
  announcements: Announcement[]
  showFilter?: boolean
  limit?: number
}

const priorityConfig = {
  high: {
    label: 'URGENT NOTICE',
    bgColor: 'bg-red-600',
    textColor: 'text-white',
    borderColor: 'border-red-200',
    icon: AlertCircleIcon
  },
  normal: {
    label: 'ANNOUNCEMENT',
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    borderColor: 'border-blue-200',
    icon: CalendarIcon
  },
  low: {
    label: 'INFO',
    bgColor: 'bg-gray-600',
    textColor: 'text-white',
    borderColor: 'border-gray-200',
    icon: CalendarIcon
  }
}

// Helper function to extract text from rich text
const extractTextFromRichText = (richText: any): string => {
  try {
    if (!richText?.root?.children?.length) return 'Click to read more...'
    
    let text = ''
    const extractText = (nodes: any[]): void => {
      nodes.forEach((node: any) => {
        if (node.text) {
          text += node.text
        } else if (node.children?.length) {
          extractText(node.children)
        }
      })
    }
    
    extractText(richText.root.children)
    return text || 'Click to read more...'
  } catch {
    return 'Click to read more...'
  }
}

export const AnnouncementsFeed: React.FC<AnnouncementsFeedProps> = ({ 
  announcements, 
  showFilter = true,
  limit 
}) => {
  const [filter, setFilter] = useState<'all' | 'high' | 'normal' | 'low'>('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const filteredAnnouncements = announcements
    .filter(announcement => filter === 'all' || announcement.priority === filter)
    .slice(0, limit || announcements.length)

  return (
    <div>
      {/* Header with Filter */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Latest Announcements</h2>
          <p className="text-gray-600 mt-2">Stay informed about important city updates</p>
        </div>
        
        {showFilter && (
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FilterIcon className="w-4 h-4" />
              <span className="capitalize">{filter === 'all' ? 'All' : filter}</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {['all', 'high', 'normal', 'low'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => {
                        setFilter(priority as any)
                        setShowFilterMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        filter === priority ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {priority === 'all' ? 'All Announcements' : `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Announcements Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAnnouncements.map((announcement) => {
          const config = priorityConfig[announcement.priority as keyof typeof priorityConfig] || priorityConfig.normal
          const IconComponent = config.icon
          
          return (
            <article 
              key={announcement.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border-l-4 ${config.borderColor}`}
            >
              {/* Priority Badge */}
              <div className={`${config.bgColor} ${config.textColor} px-4 py-2 text-sm font-bold flex items-center gap-2`}>
                <IconComponent className="w-4 h-4" />
                {config.label}
              </div>

              {/* Featured Image */}
              {announcement.featuredImage && typeof announcement.featuredImage === 'object' && (
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={announcement.featuredImage.url || ''}
                    alt={announcement.featuredImage.alt || announcement.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {announcement.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {extractTextFromRichText(announcement.content)}
                </p>

                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500 flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(announcement.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  
                  <Link 
                    href={`/announcements/${announcement.id}`} 
                    className="text-blue-700 hover:text-blue-800 font-medium text-sm hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* No Results */}
      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'No announcements available at this time.' 
              : `No ${filter} priority announcements found.`
            }
          </p>
        </div>
      )}

      {/* View All Link */}
      {limit && announcements.length > limit && (
        <div className="text-center mt-8">
          <Link 
            href="/announcements" 
            className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            View All Announcements
          </Link>
        </div>
      )}
    </div>
  )
}