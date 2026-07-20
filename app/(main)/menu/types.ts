export type DrinkItem = {
  _id: string
  name: string
  price?: number
}

export type MenuItem = {
  _id: string
  name: string
  category: 'savory' | 'sweet' | 'puff'
  price?: number
  description: string
  dietary?: ('veg' | 'egg')[]
  bestSeller: boolean
}
