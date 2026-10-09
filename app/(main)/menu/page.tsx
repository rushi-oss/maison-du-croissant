import type { Metadata } from 'next'
import { client } from '../../../sanity/lib/client'
import { MENU_ITEMS_QUERY, DRINK_ITEMS_QUERY } from '../../../sanity/lib/queries'
import MenuList from '../../components/MenuList'
import type { MenuItem, DrinkItem } from '../../lib/types'
import { pageMetadata } from '../../lib/metadata'

// Studio edits show up within a minute, without a redeploy.
export const revalidate = 60

export const metadata: Metadata = pageMetadata({
  title: 'Menu',
  description:
    'Savory and sweet filled croissants, the croastie (the croissant toast!), coffee and cold drinks at Maison du Croissant, Sodnac.',
  path: '/menu',
  image: { url: '/hero.jpeg', width: 1270, height: 1600, alt: 'A filled croissant on a pink backdrop' },
})

export default async function MenuPage() {
  const [items, drinks]: [MenuItem[], DrinkItem[]] = await Promise.all([
    client.fetch(MENU_ITEMS_QUERY),
    client.fetch(DRINK_ITEMS_QUERY),
  ])

  return (
    <main className="wrap">
      <section className="menu is-page">
        <h1 className="big menu-title">the menu.</h1>
        <MenuList items={items} drinks={drinks} />
      </section>
    </main>
  )
}
