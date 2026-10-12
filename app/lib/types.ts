export type DrinkItem = {
  _id: string
  name: string
  comingSoon?: boolean
}

export type MenuCategory = 'savory' | 'sweet' | 'croastie'

export type MenuItem = {
  _id: string
  name: string
  category: MenuCategory
  description?: string
  bestSeller?: boolean
  isNew?: boolean
  photoUrl?: string
}

export type ReviewNote = {
  _id: string
  imageUrl: string
}

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  savory: 'Savory',
  sweet: 'Sweet',
  croastie: 'The Croastie',
}
