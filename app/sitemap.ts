import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/menu`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/location`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE_URL}/bulk-order`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/preorder`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/giving-back`, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
