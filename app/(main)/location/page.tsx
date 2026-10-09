import type { Metadata } from 'next'
import Visit from '../../components/Visit'
import { pageMetadata } from '../../lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Visit us in Sodnac',
  description:
    'Maison du Croissant is on Ave Pelicans, Sodnac, Mauritius. Open Mon to Sat 9:00 to 17:30, Sun 9:00 to 13:00. Free parking.',
  path: '/location',
  image: { url: '/board.jpg', width: 1020, height: 1280, alt: 'The review board by the counter' },
})

export default function LocationPage() {
  return (
    <main className="wrap">
      <Visit asPage />
    </main>
  )
}
