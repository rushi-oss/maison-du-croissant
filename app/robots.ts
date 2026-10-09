import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    // The Studio and the oven API are for the bakery, not for search results.
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
