import type { Metadata, Viewport } from 'next'
import StudioLoader from './StudioLoader'

export const metadata: Metadata = {
  title: 'Maison du Croissant — Studio',
  robots: 'noindex',
  referrer: 'same-origin',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function StudioPage() {
  return <StudioLoader />
}
