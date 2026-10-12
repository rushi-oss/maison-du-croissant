import type { Metadata } from 'next'
import Visit from '../../components/Visit'
import { pageMetadata } from '../../lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Visit us in Sodnac',
  description:
    'Maison du Croissant is on Ave Pelicans, Sodnac, Mauritius. Open Mon to Sat 9:00 to 17:30, Sun 9:00 to 13:00. Free parking.',
  path: '/location',
  image: { url: '/og-visit.jpg', width: 1200, height: 630, alt: 'Maison du Croissant: the review board by the counter' },
})

export default function LocationPage() {
  return (
    <main className="wrap">
      <Visit asPage />
    </main>
  )
}
