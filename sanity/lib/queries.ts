import { defineQuery } from 'next-sanity'

export const MENU_ITEMS_QUERY = defineQuery(`
  *[_type == "menuItem" && available != false] | order(order asc) {
    _id,
    name,
    category,
    price,
    description,
    dietary,
    bestSeller
  }
`)

export const DRINK_ITEMS_QUERY = defineQuery(`
  *[_type == "drinkItem" && available != false] | order(order asc) {
    _id,
    name,
    price
  }
`)
