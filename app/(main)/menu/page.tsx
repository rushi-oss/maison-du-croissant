import { client } from '../../../sanity/lib/client'
import { MENU_ITEMS_QUERY, DRINK_ITEMS_QUERY } from '../../../sanity/lib/queries'
import { playfair } from './fonts'
import { MenuSections } from './MenuSections'
import type { MenuItem, DrinkItem } from './types'

export default async function MenuPage() {
  const [items, drinks]: [MenuItem[], DrinkItem[]] = await Promise.all([
    client.fetch(MENU_ITEMS_QUERY),
    client.fetch(DRINK_ITEMS_QUERY),
  ])

  return (
    <main className="min-h-screen bg-[#FDF6EC] pt-36 pb-24 px-4 max-w-lg mx-auto">

      {/* Page header */}
      <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
        Maison du Croissant
      </p>
      <h1 className={`${playfair.className} text-4xl text-[#540244] mb-2`}>Our Menu</h1>
      <div className="w-10 h-0.5 bg-[#C4973B] mb-10" />

      <MenuSections items={items} drinks={drinks} />

    </main>
  )
}
