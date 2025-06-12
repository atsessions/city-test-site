// src/components/CityServices/index.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { 
  ShieldIcon, 
  BuildingIcon, 
  TreePineIcon, 
  FileTextIcon, 
  ZapIcon, 
  UsersIcon,
  ChevronRightIcon,
  SearchIcon
} from 'lucide-react'
import { Input } from '@/components/ui/input'

const services = [
  {
    id: 'public-safety',
    title: 'Public Safety',
    description: 'Police, Fire, Emergency Services, and Community Safety Programs',
    icon: ShieldIcon,
    color: 'blue',
    href: '/departments/public-safety',
    subServices: ['Police Department', 'Fire Department', 'Emergency Management', 'Code Enforcement']
  },
  {
    id: 'public-works',
    title: 'Public Works',
    description: 'Roads, Water, Sewer, Waste Management, and Infrastructure',
    icon: BuildingIcon,
    color: 'green',
    href: '/departments/public-works',
    subServices: ['Street Maintenance', 'Water/Sewer', 'Waste Collection', 'Snow Removal']
  },
  {
    id: 'parks-recreation',
    title: 'Parks & Recreation',
    description: 'Parks, Trails, Recreation Programs, and Community Events',
    icon: TreePineIcon,
    color: 'emerald',
    href: '/departments/parks-recreation',
    subServices: ['Parks & Trails', 'Youth Programs', 'Senior Programs', 'Special Events']
  },
  {
    id: 'permits',
    title: 'Permits & Licensing',
    description: 'Building Permits, Business Licenses, and Zoning Information',
    icon: FileTextIcon,
    color: 'purple',
    href: '/services/permits',
    subServices: ['Building Permits', 'Business Licenses', 'Zoning Applications', 'Inspections']
  },
  {
    id: 'utilities',
    title: 'Utilities',
    description: 'Water, Sewer, Electric Services, and Billing Information',
    icon: ZapIcon,
    color: 'yellow',
    href: '/services/utilities',
    subServices: ['Utility Billing', 'Service Connections', 'Outage Reporting', 'Conservation']
  },
  {
    id: 'community-development',
    title: 'Community Development',
    description: 'Planning, Zoning, Economic Development, and Housing',
    icon: UsersIcon,
    color: 'indigo',
    href: '/departments/community-development',
    subServices: ['City Planning', 'Economic Development', 'Housing Programs', 'Grant Programs']
  }
]

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 group-hover:bg-blue-200',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  green: {
    bg: 'bg-green-100 group-hover:bg-green-200',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  emerald: {
    bg: 'bg-emerald-100 group-hover:bg-emerald-200',
    text: 'text-emerald-700',
    border: 'border-emerald-200'
  },
  purple: {
    bg: 'bg-purple-100 group-hover:bg-purple-200',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  yellow: {
    bg: 'bg-yellow-100 group-hover:bg-yellow-200',
    text: 'text-yellow-700',
    border: 'border-yellow-200'
  },
  indigo: {
    bg: 'bg-indigo-100 group-hover:bg-indigo-200',
    text: 'text-indigo-700',
    border: 'border-indigo-200'
  }
}

export const CityServices = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.subServices.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">City Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find the services and resources you need quickly and easily
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const IconComponent = service.icon
            const colors = colorClasses[service.color as keyof typeof colorClasses]
            const isExpanded = expandedService === service.id

            return (
              <div key={service.id} className="group">
                <div 
                  className={`bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-200 cursor-pointer border ${colors.border}`}
                  onClick={() => setExpandedService(isExpanded ? null : service.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-colors ${colors.bg}`}>
                      <IconComponent className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <ChevronRightIcon 
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  {/* Expanded sub-services */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Available Services:</h4>
                      <ul className="space-y-1">
                        {service.subServices.map((subService, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                            {subService}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Link 
                    href={service.href} 
                    className={`inline-flex items-center gap-1 font-medium text-sm mt-2 ${colors.text} hover:underline`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn More 
                    <ChevronRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No services found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </section>
  )
}