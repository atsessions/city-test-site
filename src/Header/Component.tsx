import React from 'react'
import Link from 'next/link'
import { PhoneIcon } from 'lucide-react'
import { HeaderNav } from './Nav'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header } from '@/payload-types'

export async function HeaderComponent() {
  const header: Header = await getCachedGlobal('header', 1)()

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-800 text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <a href="tel:555-123-4567" className="flex items-center gap-1 hover:text-gray-300">
                <PhoneIcon className="w-3 h-3" />
                (555) 123-4567
              </a>
              <span className="hidden sm:inline text-gray-400">|</span>
              <Link href="/contact" className="hidden sm:inline hover:text-gray-300">
                Contact Us
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/translate" className="hover:text-gray-300">
                Translate
              </Link>
              <Link href="/accessibility" className="hover:text-gray-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo/City Name */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">City of Example</h1>
                <p className="text-xs text-gray-600">Serving Our Community Since 1850</p>
              </div>
            </Link>

            {/* Navigation */}
            <HeaderNav data={header} />
          </div>
        </div>
      </header>
    </>
  )
}