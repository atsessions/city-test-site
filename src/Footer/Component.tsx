import React from 'react'
import Link from 'next/link'
import { FacebookIcon, TwitterIcon, YoutubeIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'

export const FooterComponent: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* City Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">City of Example</h3>
                <p className="text-sm text-gray-400">Serving Since 1850</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  123 Main Street<br />
                  City Name, State 12345
                </span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" />
                <a href="tel:555-123-4567" className="hover:text-white">(555) 123-4567</a>
              </p>
              <p className="flex items-center gap-2">
                <MailIcon className="w-5 h-5" />
                <a href="mailto:info@cityexample.gov" className="hover:text-white">info@cityexample.gov</a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/services/pay-bill" className="hover:text-white">Pay Utility Bill</Link></li>
              <li><Link href="/services/report-issue" className="hover:text-white">Report an Issue</Link></li>
              <li><Link href="/employment" className="hover:text-white">Job Opportunities</Link></li>
              <li><Link href="/bids-rfps" className="hover:text-white">Bids & RFPs</Link></li>
              <li><Link href="/documents/forms" className="hover:text-white">Forms & Documents</Link></li>
              <li><Link href="/faqs" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Departments</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/departments/public-safety" className="hover:text-white">Public Safety</Link></li>
              <li><Link href="/departments/public-works" className="hover:text-white">Public Works</Link></li>
              <li><Link href="/departments/parks-recreation" className="hover:text-white">Parks & Recreation</Link></li>
              <li><Link href="/departments/community-development" className="hover:text-white">Community Development</Link></li>
              <li><Link href="/departments/finance" className="hover:text-white">Finance</Link></li>
              <li><Link href="/departments" className="hover:text-white">View All Departments →</Link></li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-gray-300 mb-4">
              Get the latest news and updates from the City of Example.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>© 2025 City of Example. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms-of-use" className="hover:text-white">Terms of Use</Link>
              <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
              <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}