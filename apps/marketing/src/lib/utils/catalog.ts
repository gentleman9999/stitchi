export const makeProductTitle = (product: {
  name?: string
  brand?: { name?: string } | null
}) => {
  return `${product.brand ? `${product.brand.name} ` : ''}${product.name}`
}
