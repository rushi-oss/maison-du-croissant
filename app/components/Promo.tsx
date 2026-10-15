export type PromoData = {
  tag?: string
  kicker?: string
  headline: string
  text?: string
  offers?: { _key: string; price: number; label: string }[]
  onHero?: boolean
}

// A seasonal special as a paper poster. Content comes from Studio. Three looks:
// `full` under the hero buttons, `compact` on the menu page so the dishes still show on the
// first screen, and `hero` taped onto the homepage photo in place of the board note.
export default function Promo({ promo, variant = 'full' }: { promo: PromoData; variant?: 'full' | 'compact' | 'hero' }) {
  const compact = variant !== 'full'
  return (
    <aside
      className={`poster${variant === 'full' ? '' : ` is-${variant}`}`}
      aria-label={promo.kicker || 'Special offer'}
      // The hero one has its own entrance (it drops onto the photo); the others slide in on scroll.
      {...(variant === 'hero' ? {} : { 'data-reveal': '' })}
    >
      {promo.tag && <span className="tag">{promo.tag}</span>}
      {promo.kicker && <p className="caps poster-kicker">{promo.kicker}</p>}
      <h2 className="big">{promo.headline}</h2>
      {promo.text && !compact && <p className="poster-text">{promo.text}</p>}
      {/* Prices are kept in Studio but not shown on the website. */}
    </aside>
  )
}
