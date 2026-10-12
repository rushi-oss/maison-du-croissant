import { defineQuery } from 'next-sanity'

// Public queries never select prices: anything fetched here can end up in the page.
export const MENU_ITEMS_QUERY = defineQuery(`
  *[_type == "menuItem" && available != false && category in ["savory", "sweet", "croastie"]] | order(order asc) {
    _id,
    name,
    category,
    description,
    bestSeller,
    isNew,
    "photoUrl": photo.asset->url
  }
`)

export const DRINK_ITEMS_QUERY = defineQuery(`
  *[_type == "drinkItem" && available != false] | order(order asc) {
    _id,
    name,
    comingSoon
  }
`)

// The newest special that's switched on, if any.
export const PROMO_QUERY = defineQuery(`
  *[_type == "promo" && active == true] | order(_updatedAt desc)[0] {
    tag,
    kicker,
    headline,
    text,
    offers[] { _key, price, label },
    "onHero": defined(heroUntil) && heroUntil > now()
  }
`)

export const REVIEW_NOTES_QUERY = defineQuery(`
  *[_type == "reviewNote"] | order(order asc) {
    _id,
    "imageUrl": image.asset->url
  }
`)

// Server-only: prices for the bulk order email. Never pass the result to a client component.
export const BULK_PRICES_QUERY = defineQuery(`
  *[_type == "menuItem" && _id in $ids && available != false] {
    _id,
    name,
    category,
    price,
    b2bPrice
  }
`)
