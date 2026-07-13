import { Playfair_Display } from 'next/font/google'
import { client } from '../../../sanity/lib/client'
import { MENU_ITEMS_QUERY, DRINK_ITEMS_QUERY } from '../../../sanity/lib/queries'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

type DrinkItem = {
  _id: string
  name: string
  price: number
}

type MenuItem = {
  _id: string
  name: string
  category: 'savory' | 'sweet' | 'puff'
  price: number
  description: string
  dietary?: ('veg' | 'egg')[]
  bestSeller: boolean
}

function MenuItemRow({ item }: { item: MenuItem }) {
  const icons = (item.dietary ?? []).map((d) => (d === 'veg' ? '🌱' : '🥚')).join(' ')
  return (
    <div className="py-4 border-b border-[#e0d5c5] last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`${playfair.className} font-semibold text-[#540244]`}>{item.name}</span>
          <span className="text-sm leading-none">{icons}</span>
          {item.bestSeller && (
            <span className="text-[10px] font-semibold tracking-wide uppercase text-[#C4973B] border border-[#C4973B] rounded-full px-2 py-0.5 leading-none">
              ⭐ Best Seller
            </span>
          )}
        </div>
        <span className="font-serif text-lg text-[#C4973B] whitespace-nowrap shrink-0">
          Rs {item.price}
        </span>
      </div>
      {item.description && (
        <p className="text-sm text-[#c9a88a] mt-1 leading-relaxed">{item.description}</p>
      )}
    </div>
  )
}

function DrinkRow({ item }: { item: DrinkItem }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#e0d5c5] last:border-0">
      <span className="font-sans text-[#540244]">{item.name}</span>
      <span className="font-serif text-lg text-[#C4973B]">Rs {item.price}</span>
    </div>
  )
}

export default async function MenuPage() {
  const [items, drinks]: [MenuItem[], DrinkItem[]] = await Promise.all([
    client.fetch(MENU_ITEMS_QUERY),
    client.fetch(DRINK_ITEMS_QUERY),
  ])
  const savoryItems = items.filter((i) => i.category === 'savory')
  const sweetItems = items.filter((i) => i.category === 'sweet')
  const puffItems = items.filter((i) => i.category === 'puff')

  return (
    <main className="min-h-screen bg-[#FDF6EC] pt-36 pb-24 px-4 max-w-lg mx-auto">

      {/* Page header */}
      <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
        Maison du Croissant
      </p>
      <h1 className={`${playfair.className} text-4xl text-[#540244] mb-2`}>Our Menu</h1>
      <div className="w-10 h-0.5 bg-[#C4973B] mb-10" />

      {/* ── CROISSANTS ── */}
      <section className="mb-12">
        <h2 className={`${playfair.className} text-2xl text-[#540244] mb-3`}>Our Croissants</h2>

        <div className="flex flex-col gap-1 mb-2 text-sm text-[#c9a88a]">
          <span>🌱 Veg Croissant — The Original One</span>
          <span>🥚 Egg-Washed Croissant — The Better Version</span>
        </div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#c9a88a] mb-8">
          Choose your croissant &amp; filling
        </p>

        <p className="text-base font-semibold text-[#c9a88a] text-center mb-6">
          + Rs 5 for takeaway packaging
        </p>

        {savoryItems.length > 0 && (
          <div className="mb-8">
            <h3 className={`${playfair.className} italic text-xl text-[#540244] pb-3 border-b border-[#e0d5c5] mb-1`}>
              Savory
            </h3>
            {savoryItems.map((item) => (
              <MenuItemRow key={item._id} item={item} />
            ))}
          </div>
        )}

        {sweetItems.length > 0 && (
          <div>
            <h3 className={`${playfair.className} italic text-xl text-[#540244] pb-3 border-b border-[#e0d5c5] mb-1`}>
              Sweet
            </h3>
            {sweetItems.map((item) => (
              <MenuItemRow key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* ── PUFF ── */}
      {puffItems.length > 0 && (
        <section className="mb-12">
          <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
            Something different
          </p>
          <h2 className={`${playfair.className} text-2xl text-[#540244] mb-2`}>Puff</h2>
          <div className="w-10 h-0.5 bg-[#C4973B] mb-8" />
          {puffItems.map((item) => (
            <MenuItemRow key={item._id} item={item} />
          ))}
        </section>
      )}

      {/* ── DRINKS ── */}
      {drinks.length > 0 && (
        <section className="mb-10">
          <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
            To drink
          </p>
          <h2 className={`${playfair.className} text-2xl text-[#540244] mb-2`}>Drinks</h2>
          <div className="w-10 h-0.5 bg-[#C4973B] mb-2" />
          {drinks.map((item) => (
            <DrinkRow key={item._id} item={item} />
          ))}
        </section>
      )}

      {/* Legend */}
      <div className="pt-6 border-t border-[#e0d5c5] flex flex-col gap-1.5 text-sm text-[#c9a88a]">
        <span>🌱 Vegetarian</span>
        <span>🥚 Contains egg</span>
        <span>⭐ Best Seller</span>
      </div>

    </main>
  )
}
