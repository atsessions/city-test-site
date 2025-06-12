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
import { CityServices } from '@/components/CityServices'
import { AnnouncementsFeed } from '@/components/AnnouncementsFeed'
import { EventsCalendar } from '@/components/EventsCalendar'

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

  const page = await queryPageBySlug({
    slug,
  })

  let announcements

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
            <AnnouncementsFeed announcements={announcements} limit={3} />
          </div>
        </section>
      )}

      {/* Services Grid - only on homepage */}
      {slug === 'home' && <CityServices />}

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
                  <li><Link href="/government/mayor" className="text-blue-700 hover:text-blue-800">Mayor&apos;s Office</Link></li>
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
              <EventsCalendar compact={true} />
            </div>
          </div>
        </section>
      )}

      {/* Regular page content - only show on non-homepage */}
      {slug !== 'home' && (
        <div className="container mx-auto px-4 py-8">
          <RenderBlocks blocks={page.layout} />
        </div>
      )}
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
