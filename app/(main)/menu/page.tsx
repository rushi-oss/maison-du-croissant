import type { Metadata } from 'next'
import { client } from '../../../sanity/lib/client'
import { MENU_ITEMS_QUERY, DRINK_ITEMS_QUERY, PROMO_QUERY } from '../../../sanity/lib/queries'
import MenuList from '../../components/MenuList'
import Promo, { type PromoData } from '../../components/Promo'
import type { MenuItem, DrinkItem } from '../../lib/types'
import { pageMetadata } from '../../lib/metadata'

// Studio edits show up within a minute, without a redeploy.
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Menu',
  description:
    'Savory and sweet filled croissants, the croastie (the croissant toast!), coffee and cold drinks at Maison du Croissant, Sodnac.',
  path: '/menu',
  image: { url: '/og-menu.jpg', width: 1200, height: 630, alt: 'Maison du Croissant: a filled croissant on a pink backdrop' },
})

export default async function MenuPage() {
  const [items, drinks, promo]: [MenuItem[], DrinkItem[], PromoData | null] = await Promise.all([
    client.fetch(MENU_ITEMS_QUERY),
    client.fetch(DRINK_ITEMS_QUERY),
    client.fetch(PROMO_QUERY),
  ])

  return (
    <main className="wrap">
      <section className="menu is-page">
        <h1 className="big menu-title">the menu.</h1>
        {promo && <Promo promo={promo} />}
        <MenuList items={items} drinks={drinks} />
      </section>
    </main>
  )
}
