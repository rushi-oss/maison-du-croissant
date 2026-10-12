import type { Metadata } from 'next'
import { SITE_NAME } from './site'

export const SITE_DESCRIPTION =
  'Filled croissants and the croastie, made fresh in Sodnac, Mauritius. Open Mon to Sat 9:00 to 17:30, Sun 9:00 to 13:00.'

type OgImage = { url: string; width: number; height: number; alt: string }

// Landscape preview cards (logo beside a round photo), built by scripts/make-og-images.mjs.
export const DEFAULT_OG_IMAGE: OgImage = {
  url: '/og.jpg',
  width: 1200,
  height: 630,
  alt: 'Maison du Croissant: croissants on a deep purple surface',
}

// Next replaces a layout's openGraph instead of merging it, so every page sends the full set.
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title?: string
  description: string
  path: string
  image?: OgImage
}): Metadata {
  const ogTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Filled Croissants in Sodnac, Mauritius`
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_MU',
      url: path,
      title: ogTitle,
      description,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description, images: [image.url] },
  }
}
