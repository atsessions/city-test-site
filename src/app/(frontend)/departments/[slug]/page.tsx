// src/app/(frontend)/departments/[slug]/page.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ExternalLinkIcon } from 'lucide-react'
import RichText from '@/components/RichText'

export const dynamic = 'force-dynamic'

export default async function DepartmentPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    collection: 'departments',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const department = docs[0]

  if (!department) {
    return notFound()
  }

  return (
    <article>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        {department.featuredImage && typeof department.featuredImage === 'object' && 'url' in department.featuredImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={department.featuredImage.url || ''}
              alt={('alt' in department.featuredImage && department.featuredImage.alt) || department.name}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Department Overview - Handle both string and rich text */}
            {department.overview && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Department</h2>
                <div className="prose prose-lg max-w-none">
                  {typeof department.overview === 'string' ? (
                    <p className="text-gray-600 whitespace-pre-line">{department.overview}</p>
                  ) : (
                    <RichText data={department.overview} />
                  )}
                </div>
              </section>
            )}
            
            {/* Services Section */}
            {department.services && Array.isArray(department.services) && department.services.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
                <div className="grid gap-4">
                  {department.services.map((service: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-gray-600 mb-2 whitespace-pre-line">{service.description}</p>
                      )}
                      {service.link && (
                        <Link 
                          href={service.link}
                          className="text-blue-700 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                        >
                          Learn More <ExternalLinkIcon className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Content - Handle both string and rich text */}
            {department.content && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
                <div className="prose prose-lg max-w-none">
                  {typeof department.content === 'string' ? (
                    <p className="text-gray-600 whitespace-pre-line">{department.content}</p>
                  ) : (
                    <RichText data={department.content} />
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Department Contacts */}
            {department.contacts && Array.isArray(department.contacts) && department.contacts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Contacts</h3>
                <div className="space-y-4">
                  {department.contacts.map((contact: any, index: number) => (
                    <div key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      {contact.photo && typeof contact.photo === 'object' && 'url' in contact.photo && (
                        <div className="relative w-20 h-20 mb-3">
                          <Image
                            src={contact.photo.url || ''}
                            alt={('alt' in contact.photo && contact.photo.alt) || contact.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{contact.title}</p>
                        <div className="space-y-1">
                          {contact.email && (
                            <a 
                              href={`mailto:${contact.email}`}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700"
                            >
                              <MailIcon className="w-3 h-3" />
                              <span className="break-all">{contact.email}</span>
                            </a>
                          )}
                          {contact.phone && (
                            <a 
                              href={`tel:${contact.phone.replace(/\D/g, '')}`}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700"
                            >
                              <PhoneIcon className="w-3 h-3" />
                              {contact.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Office Information */}
            {department.officeInfo && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Information</h3>
                <div className="space-y-3 text-sm">
                  {department.officeInfo.address && (
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600 whitespace-pre-line">{department.officeInfo.address}</p>
                      </div>
                    </div>
                  )}
                  {department.officeInfo.hours && (
                    <div className="flex items-start gap-2">
                      <ClockIcon className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Office Hours</p>
                        <p className="text-gray-600 whitespace-pre-line">{department.officeInfo.hours}</p>
                      </div>
                    </div>
                  )}
                  {department.officeInfo.mainPhone && (
                    <div className="flex items-start gap-2">
                      <PhoneIcon className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Main Office</p>
                        <a 
                          href={`tel:${department.officeInfo.mainPhone.replace(/\D/g, '')}`}
                          className="text-gray-600 hover:text-blue-700"
                        >
                          {department.officeInfo.mainPhone}
                        </a>
                      </div>
                    </div>
                  )}
                  {department.officeInfo.fax && (
                    <div className="flex items-start gap-2">
                      <PhoneIcon className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Fax</p>
                        <p className="text-gray-600">{department.officeInfo.fax}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Links */}
            {department.quickLinks && Array.isArray(department.quickLinks) && department.quickLinks.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {department.quickLinks.map((link: any, index: number) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        target={link.newTab ? '_blank' : undefined}
                        rel={link.newTab ? 'noopener noreferrer' : undefined}
                        className="text-blue-700 hover:text-blue-800 flex items-center gap-1"
                      >
                        {link.label}
                        {link.newTab && <ExternalLinkIcon className="w-3 h-3" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  const payload = await getPayload({ config: configPromise })
  
  const { docs } = await payload.find({
    collection: 'departments',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const department = docs[0]

  if (!department) {
    return {}
  }

  return {
    title: `${department.name} | City of Page`,
    description: department.overview ? 'Department information' : `Information about the ${department.name} department`,
  }
}