import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, PhoneIcon, MapPinIcon, ClockIcon, AlertCircleIcon, UsersIcon, FileTextIcon, BriefcaseIcon } from 'lucide-react'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page, announcements

  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  // Fetch announcements only for the homepage
  if (slug === 'home') {
    const payload = await getPayloadHMR({ config: configPromise })
    const announcementData = await payload.find({
      collection: 'announcements',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      limit: 3, // Show 3 most recent for homepage
    })
    announcements = announcementData.docs
  }

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url={url} />

      {/* Hero section - only show on homepage */}
      {slug === 'home' && page.hero && <RenderHero {...page.hero} />}

      {/* Quick Actions Bar - only on homepage */}
      {slug === 'home' && (
        <section className="bg-blue-900 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/pay-bill" className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors">
                <FileTextIcon className="w-5 h-5" />
                <span className="font-medium">Pay Bill</span>
              </Link>
              <Link href="/report-issue" className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors">
                <AlertCircleIcon className="w-5 h-5" />
                <span className="font-medium">Report Issue</span>
              </Link>
              <Link href="/jobs" className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors">
                <BriefcaseIcon className="w-5 h-5" />
                <span className="font-medium">Jobs</span>
              </Link>
              <Link href="/meetings" className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors">
                <UsersIcon className="w-5 h-5" />
                <span className="font-medium">Meetings</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Announcements Section - only on homepage */}
      {slug === 'home' && announcements && announcements.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Announcements</h2>
              <Link href="/announcements" className="text-blue-700 hover:text-blue-800 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {announcements.map((announcement) => (
                <article key={announcement.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {announcement.priority === 'high' && (
                    <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold flex items-center gap-2">
                      <AlertCircleIcon className="w-4 h-4" />
                      URGENT NOTICE
                    </div>
                  )}
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {announcement.content && typeof announcement.content === 'object' && 
                        announcement.content.root?.children?.[0]?.children?.[0]?.text || 
                        'Click to read more...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500">
                        {new Date(announcement.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <Link href={`/announcements/${announcement.id}`} className="text-blue-700 hover:text-blue-800 font-medium text-sm">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Grid - only on homepage */}
      {slug === 'home' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">City Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Public Safety */}
              <Link href="/departments/public-safety" className="group bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Public Safety</h3>
                <p className="text-gray-600">Police, Fire, Emergency Services, and Community Safety Programs</p>
              </Link>

              {/* Public Works */}
              <Link href="/departments/public-works" className="group bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Public Works</h3>
                <p className="text-gray-600">Roads, Water, Sewer, Waste Management, and Infrastructure</p>
              </Link>

              {/* Parks & Recreation */}
              <Link href="/departments/parks-recreation" className="group bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Parks & Recreation</h3>
                <p className="text-gray-600">Parks, Trails, Recreation Programs, and Community Events</p>
              </Link>

              {/* Permits & Licensing */}
              <Link href="/services/permits" className="group bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <FileTextIcon className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Permits & Licensing</h3>
                <p className="text-gray-600">Building Permits, Business Licenses, and Zoning Information</p>
              </Link>

              {/* Utilities */}
              <Link href="/services/utilities" className="group bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                  <svg className="w-8 h-8 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Utilities</h3>
                <p className="text-gray-600">Water, Sewer, Electric Services, and Billing Information</p>
              </Link>

              {/* Community Development */}
              <Link href="/departments/community-development" className="group bg-gray-50 rounded-lg p-8 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <UsersIcon className="w-8 h-8 text-indigo-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Development</h3>
                <p className="text-gray-600">Planning, Zoning, Economic Development, and Housing</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quick Links & Contact - only on homepage */}
      {slug === 'home' && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  <li><Link href="/government/city-council" className="text-blue-700 hover:text-blue-800">City Council</Link></li>
                  <li><Link href="/government/mayor" className="text-blue-700 hover:text-blue-800">Mayor's Office</Link></li>
                  <li><Link href="/documents/city-budget" className="text-blue-700 hover:text-blue-800">City Budget</Link></li>
                  <li><Link href="/bids-rfps" className="text-blue-700 hover:text-blue-800">Bids & RFPs</Link></li>
                  <li><Link href="/employment" className="text-blue-700 hover:text-blue-800">Employment Opportunities</Link></li>
                  <li><Link href="/documents/forms" className="text-blue-700 hover:text-blue-800">Forms & Documents</Link></li>
                </ul>
              </div>

              {/* City Hall Hours */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">City Hall Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Monday - Friday</p>
                      <p className="text-gray-600">8:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">123 Main Street</p>
                      <p className="text-gray-600">City Name, State 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">(555) 123-4567</p>
                      <p className="text-gray-600">General Information</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="font-medium text-gray-900">City Council Meeting</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <CalendarIcon className="w-4 h-4" />
                      Tuesday, June 10, 7:00 PM
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <p className="font-medium text-gray-900">Summer Concert Series</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <CalendarIcon className="w-4 h-4" />
                      Saturday, June 14, 6:00 PM
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <p className="font-medium text-gray-900">Planning Commission</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <CalendarIcon className="w-4 h-4" />
                      Thursday, June 19, 5:30 PM
                    </p>
                  </div>
                </div>
                <Link href="/calendar" className="inline-block mt-6 text-blue-700 hover:text-blue-800 font-medium">
                  View Full Calendar →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular page content */}
      <div className="container mx-auto px-4 py-8">
        <RenderBlocks blocks={page.layout} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})