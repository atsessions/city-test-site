'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon, ChevronDownIcon, SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navigation = [
    {
      name: 'Government',
      href: '/government',
      dropdown: [
        { name: 'Mayor\'s Office', href: '/government/mayor' },
        { name: 'City Council', href: '/government/city-council' },
        { name: 'City Manager', href: '/government/city-manager' },
        { name: 'Boards & Commissions', href: '/government/boards-commissions' },
        { name: 'City Charter', href: '/documents/city-charter' },
      ]
    },
    {
      name: 'Departments',
      href: '/departments',
      dropdown: [
        { name: 'Public Safety', href: '/departments/public-safety' },
        { name: 'Public Works', href: '/departments/public-works' },
        { name: 'Parks & Recreation', href: '/departments/parks-recreation' },
        { name: 'Community Development', href: '/departments/community-development' },
        { name: 'Finance', href: '/departments/finance' },
        { name: 'Human Resources', href: '/departments/human-resources' },
      ]
    },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Pay Utility Bill', href: '/services/pay-bill' },
        { name: 'Report an Issue', href: '/services/report-issue' },
        { name: 'Permits & Licensing', href: '/services/permits' },
        { name: 'Trash & Recycling', href: '/services/trash-recycling' },
        { name: 'Animal Services', href: '/services/animal-services' },
        { name: 'Public Records', href: '/services/public-records' },
      ]
    },
    {
      name: 'Community',
      href: '/community',
      dropdown: [
        { name: 'Events Calendar', href: '/calendar' },
        { name: 'News & Announcements', href: '/announcements' },
        { name: 'Parks & Facilities', href: '/community/parks-facilities' },
        { name: 'Library', href: '/community/library' },
        { name: 'Senior Center', href: '/community/senior-center' },
        { name: 'Youth Programs', href: '/community/youth-programs' },
      ]
    },
    {
      name: 'Business',
      href: '/business',
      dropdown: [
        { name: 'Starting a Business', href: '/business/start' },
        { name: 'Business Licenses', href: '/business/licenses' },
        { name: 'Economic Development', href: '/business/economic-development' },
        { name: 'Bid Opportunities', href: '/business/bids-rfps' },
        { name: 'Zoning & Planning', href: '/business/zoning' },
      ]
    },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6">
        {navigation.map((item) => (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => setActiveDropdown(item.name)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href={item.href}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-700 font-medium py-2"
            >
              {item.name}
              <ChevronDownIcon className="w-4 h-4" />
            </Link>
            
            {/* Dropdown Menu */}
            {activeDropdown === item.name && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-b-lg py-2 z-50">
                {item.dropdown.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Search and Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-700 hover:text-blue-700">
          <SearchIcon className="w-5 h-5" />
        </button>
        <button
          className="lg:hidden p-2 text-gray-700 hover:text-blue-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[120px] bg-white border-t border-gray-200 shadow-lg z-50 max-h-[calc(100vh-120px)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4">
            {navigation.map((item) => (
              <div key={item.name} className="mb-4">
                <Link
                  href={item.href}
                  className="block text-gray-900 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                <div className="ml-4 space-y-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block text-gray-600 py-1 text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}