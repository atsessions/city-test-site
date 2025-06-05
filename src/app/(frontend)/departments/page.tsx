import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'City Departments | City of Page',
  description: 'Explore all City of Page departments and services',
}

// Helper function to extract text from rich text
function extractTextFromRichText(richText: any): string {
  try {
    if (!richText?.root?.children?.length) return 'Learn more about this department...'
    
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
    return text || 'Learn more about this department...'
  } catch {
    return 'Learn more about this department...'
  }
}

export default async function DepartmentsPage() {
  const payload = await getPayload({ config: configPromise })
  
  const { docs: departments } = await payload.find({
    collection: 'departments',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: 'name',
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">City Departments</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Link
            key={dept.id}
            href={`/departments/${dept.slug}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700">
              {dept.name}
            </h2>
            {dept.overview && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {extractTextFromRichText(dept.overview)}
              </p>
            )}
            {dept.contacts && Array.isArray(dept.contacts) && dept.contacts.length > 0 && (
            <p className="text-sm text-gray-500 mb-4">
              Contact: {dept.contacts?.[0]?.name}
              {dept.contacts?.[0]?.title && `, ${dept.contacts?.[0]?.title}`}
            </p>
            )}
            <span className="text-blue-700 font-medium inline-flex items-center gap-1">
              Learn More <ChevronRightIcon className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}