import type { Config } from '@/payload-types'
import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  const payload = await getPayloadHMR({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })