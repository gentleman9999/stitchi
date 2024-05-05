const featuredBrands = [
  'Comfort Colors',
  'Adidas',
  'Alternative',
  'BELLA + CANVAS',
  'Champion',
  'Independent Trading Co.',
  'Oakley',
]

export const isFeaturedBrand = (brand: string) => {
  return featuredBrands.includes(brand)
}
