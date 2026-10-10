import type { DrinkItem, MenuCategory, MenuItem } from '../lib/types'

const GROUPS: { category: MenuCategory; title: string; sub?: string }[] = [
  { category: 'savory', title: 'savory.' },
  { category: 'sweet', title: 'sweet.' },
  { category: 'croastie', title: 'the croastie.', sub: 'the croissant toast!' },
]

function Dish({ item, index }: { item: MenuItem; index: number }) {
  return (
    <li style={{ '--i': index } as React.CSSProperties}>
      <span className="dish">
        {item.name}
        {item.isNew && <span className="tag">new</span>}
        {item.bestSeller && <span className="tag-quiet">best seller</span>}
      </span>
      {item.description && <span className="desc">{item.description}</span>}
    </li>
  )
}

// The full menu: croissants by category, then drinks. Never shows prices.
export default function MenuList({ items, drinks }: { items: MenuItem[]; drinks: DrinkItem[] }) {
  return (
    <div className="menu-cols">
      {GROUPS.map((group) => {
        const groupItems = items.filter((i) => i.category === group.category)
        if (!groupItems.length) return null
        return (
          <div key={group.category} data-reveal>
            <h3 className="big">{group.title}</h3>
            {group.sub && <p className="sub">{group.sub}</p>}
            <ul>
              {groupItems.map((item, i) => (
                <Dish key={item._id} item={item} index={i} />
              ))}
            </ul>
          </div>
        )
      })}
      <div data-reveal>
        <h3 className="big">the drinks.</h3>
        <ul>
          {drinks.map((drink, i) => (
            <li key={drink._id} style={{ '--i': i } as React.CSSProperties}>
              <span className="dish">{drink.name}</span>
            </li>
          ))}
          <li style={{ '--i': drinks.length } as React.CSSProperties}>
            <span className="desc">Cold no sugar fruit juices available</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
