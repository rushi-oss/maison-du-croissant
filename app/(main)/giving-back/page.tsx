import type { Metadata } from 'next'
import GivingBack from '../../components/GivingBack'
import { pageMetadata } from '../../lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Giving back',
  description:
    'Maison du Croissant baked for the MauRevive and NAFCO bake sale fundraiser, supporting children with special needs, and taught young volunteers to bake.',
  path: '/giving-back',
})

export default function GivingBackPage() {
  return (
    <main className="wrap">
      <GivingBack asPage />
    </main>
  )
}
