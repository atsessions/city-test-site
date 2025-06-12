// src/components/EventsCalendar/index.tsx
'use client'
import { useState } from 'react'
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon
} from 'lucide-react'
import Link from 'next/link'

type Event = {
  id: string
  title: string
  description?: string
  date: string
  time: string
  location?: string
  type: 'meeting' | 'event' | 'workshop' | 'hearing'
  department?: string
}

// Sample events data - in real app this would come from Payload CMS
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'City Council Meeting',
    description: 'Regular monthly city council meeting open to the public',
    date: '2025-06-10',
    time: '7:00 PM',
    location: 'City Hall Council Chambers',
    type: 'meeting',
    department: 'City Council'
  },
  {
    id: '2',
    title: 'Summer Concert Series',
    description: 'Free outdoor concert featuring local musicians',
    date: '2025-06-14',
    time: '6:00 PM',
    location: 'Central Park Bandshell',
    type: 'event',
    department: 'Parks & Recreation'
  },
  {
    id: '3',
    title: 'Planning Commission Meeting',
    description: 'Review of zoning applications and development proposals',
    date: '2025-06-19',
    time: '5:30 PM',
    location: 'City Hall Conference Room A',
    type: 'meeting',
    department: 'Planning'
  },
  {
    id: '4',
    title: 'Community Workshop: Budget 2026',
    description: 'Public input session for the upcoming city budget',
    date: '2025-06-25',
    time: '6:30 PM',
    location: 'Community Center',
    type: 'workshop',
    department: 'Finance'
  },
  {
    id: '5',
    title: 'Public Hearing: Main Street Redesign',
    description: 'Public hearing on proposed Main Street infrastructure improvements',
    date: '2025-07-02',
    time: '7:00 PM',
    location: 'City Hall Council Chambers',
    type: 'hearing',
    department: 'Public Works'
  }
]

const eventTypeConfig = {
  meeting: {
    label: 'Meeting',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: UsersIcon
  },
  event: {
    label: 'Event',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CalendarIcon
  },
  workshop: {
    label: 'Workshop',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: UsersIcon
  },
  hearing: {
    label: 'Public Hearing',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: UsersIcon
  }
}

type EventsCalendarProps = {
  events?: Event[]
  showFilter?: boolean
  compact?: boolean
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ 
  events = sampleEvents, 
  showFilter = true,
  compact = false 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list')
  const [filterType, setFilterType] = useState<'all' | Event['type']>('all')

  // Get current month events
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  const filteredEvents = events
    .filter(event => {
      if (filterType !== 'all' && event.type !== filterType) return false
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  if (compact) {
    // Compact version for sidebar/homepage
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          <Link href="/calendar" className="text-blue-700 hover:text-blue-800 font-medium text-sm">
            View Full Calendar →
          </Link>
        </div>
        
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => {
            const config = eventTypeConfig[event.type]
            const IconComponent = config.icon
            
            return (
              <div key={event.id} className="border-l-4 border-blue-600 pl-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-blue-600 mt-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{event.title}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <CalendarIcon className="w-3 h-3" />
                      {formatDate(event.date)}, {event.time}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Full calendar view
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">City Events Calendar</h1>
          <p className="text-gray-600 mt-2">Stay informed about upcoming city meetings and events</p>
        </div>
        
        {showFilter && (
          <div className="flex gap-2 mt-4 md:mt-0">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Events</option>
              <option value="meeting">Meetings</option>
              <option value="event">Events</option>
              <option value="workshop">Workshops</option>
              <option value="hearing">Public Hearings</option>
            </select>
          </div>
        )}
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigateMonth('prev')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Previous Month
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Next Month
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const config = eventTypeConfig[event.type]
          const IconComponent = config.icon
          
          return (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                      <IconComponent className="w-3 h-3" />
                      {config.label}
                    </span>
                    {event.department && (
                      <span className="text-sm text-gray-500">{event.department}</span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  
                  {event.description && (
                    <p className="text-gray-600 mb-3">{event.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {event.time}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* No Events */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            No events scheduled for {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  )
}