export type PromoData = {
  tag?: string
  kicker?: string
  headline: string
  text?: string
  offers?: { _key: string; price: number; label: string }[]
}

// A seasonal special as a paper poster taped to the top of the menu. Content comes from Studio.
export default function Promo({ promo }: { promo: PromoData }) {
  return (
    <aside className="poster" aria-label={promo.kicker || 'Special offer'} data-reveal>
      {promo.tag && <span className="tag">{promo.tag}</span>}
      {promo.kicker && <p className="caps poster-kicker">{promo.kicker}</p>}
      <h2 className="big">{promo.headline}</h2>
      {promo.text && <p className="poster-text">{promo.text}</p>}
      {promo.offers && promo.offers.length > 0 && (
        <div className="poster-offers">
          {promo.offers.map((offer) => (
            <div key={offer._key}>
              <span className="poster-price">Rs {offer.price}</span>
              <span className="poster-label">{offer.label}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
