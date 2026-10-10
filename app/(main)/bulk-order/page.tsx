import type { Metadata } from 'next'
import { client } from '../../../sanity/lib/client'
import { MENU_ITEMS_QUERY } from '../../../sanity/lib/queries'
import type { MenuItem } from '../../lib/types'
import { pageMetadata } from '../../lib/metadata'
import BulkOrderForm, { type BulkItem } from './BulkOrderForm'

// Studio edits show up within a minute, without a redeploy.
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Bulk order',
  description:
    'Build your own croissant box at a special price, for cafés, offices, events and celebrations in Mauritius. Choose your fillings, tell us when, and we come back to you with a quote.',
  path: '/bulk-order',
})

export default async function BulkOrderPage() {
  const menu: MenuItem[] = await client.fetch(MENU_ITEMS_QUERY)
  // Only what the form needs: no descriptions, and the menu query has no prices to begin with.
  const items: BulkItem[] = menu.map(({ _id, name, category }) => ({ _id, name, category }))

  return (
    <main className="wrap bulk">
      <header className="page-head">
        <h1 className="big">bulk order.</h1>
        <p className="box-line">build your own croissant box, at a special price.</p>
        <p className="lede">
          For cafés, offices, events and celebrations. Choose your fillings, tell us when, and we&apos;ll come back
          to you with a quote.
        </p>
      </header>
      <BulkOrderForm items={items} />
    </main>
  )
}
