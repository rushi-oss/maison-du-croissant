'use client'

import { useState } from 'react'
import { playfair } from './fonts'
import type { MenuItem, DrinkItem } from './types'

type Tab = 'croissants' | 'drinks' | 'puff'

const TABS: { id: Tab; label: string }[] = [
  { id: 'croissants', label: 'Our Croissants' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'puff', label: 'Puff' },
]

function MenuItemRow({ item }: { item: MenuItem }) {
  const icons = (item.dietary ?? []).map((d) => (d === 'veg' ? '🌱' : '🥚')).join(' ')
  return (
    <div className="py-4 border-b border-[#e0d5c5] last:border-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`${playfair.className} font-semibold text-[#540244]`}>{item.name}</span>
        <span className="text-sm leading-none">{icons}</span>
        {item.bestSeller && (
          <span className="text-[10px] font-semibold tracking-wide uppercase text-[#C4973B] border border-[#C4973B] rounded-full px-2 py-0.5 leading-none">
            ⭐ Best Seller
          </span>
        )}
      </div>
      {item.description && (
        <p className="text-sm text-[#c9a88a] mt-1 leading-relaxed">{item.description}</p>
      )}
    </div>
  )
}

function DrinkRow({ item }: { item: DrinkItem }) {
  return (
    <div className="py-3 border-b border-[#e0d5c5] last:border-0">
      <span className="font-sans text-[#540244]">{item.name}</span>
    </div>
  )
}

export function MenuSections({ items, drinks }: { items: MenuItem[]; drinks: DrinkItem[] }) {
  const [activeTab, setActiveTab] = useState<Tab | null>(null)

  const savoryItems = items.filter((i) => i.category === 'savory')
  const sweetItems = items.filter((i) => i.category === 'sweet')
  const puffItems = items.filter((i) => i.category === 'puff')

  return (
    <div>
      {/* Category buttons */}
      <div className="flex flex-wrap gap-3 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full border text-sm font-semibold tracking-wide transition-colors ${
              activeTab === tab.id
                ? 'bg-[#540244] text-[#FDF6EC] border-[#540244]'
                : 'bg-transparent text-[#540244] border-[#540244]/40 hover:border-[#540244]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── CROISSANTS ── */}
      {activeTab === 'croissants' && (
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
      )}

      {/* ── PUFF ── */}
      {activeTab === 'puff' && (
        <section className="mb-12">
          <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
            Something different
          </p>
          <h2 className={`${playfair.className} text-2xl text-[#540244] mb-2`}>Puff</h2>
          <div className="w-10 h-0.5 bg-[#C4973B] mb-8" />
          {puffItems.length > 0 ? (
            puffItems.map((item) => <MenuItemRow key={item._id} item={item} />)
          ) : (
            <p className="text-sm text-[#c9a88a]">Coming soon.</p>
          )}
        </section>
      )}

      {/* ── DRINKS ── */}
      {activeTab === 'drinks' && (
        <section className="mb-10">
          <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
            To drink
          </p>
          <h2 className={`${playfair.className} text-2xl text-[#540244] mb-2`}>Drinks</h2>
          <div className="w-10 h-0.5 bg-[#C4973B] mb-2" />
          {drinks.length > 0 ? (
            drinks.map((item) => <DrinkRow key={item._id} item={item} />)
          ) : (
            <p className="text-sm text-[#c9a88a]">Coming soon.</p>
          )}
        </section>
      )}
    </div>
  )
}
