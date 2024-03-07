export const makeProductTitle = (product: {
  name?: string
  brand?: { name?: string } | null
}) => {
  return `${product.name}`
}

type Size = string | number

export const normalizeAndSortSizes = (sizes: Size[]): Size[] => {
  // Mapping standard sizes to a scale
  const sizeMap: { [key: string]: number } = {
    xxs: 1,
    xs: 2,
    'extra-small': 2,
    s: 3,
    sm: 3,
    small: 3,
    m: 4,
    md: 4,
    medium: 4,
    l: 5,
    lg: 5,
    large: 5,
    xl: 6,
    'extra-large': 6,
    '2xl': 7,
    xxl: 7,
    '3xl': 8,
    xxxl: 8,
    '4xl': 9,
    xxxxl: 9,
  }

  // Check if all sizes are numeric
  const allNumeric = sizes.every(size => typeof size === 'number')

  if (allNumeric) {
    // If numeric, sort numerically
    return sizes.sort((a, b) => (a as number) - (b as number))
  } else {
    // If standard, map sizes to the scale and sort
    return sizes.sort((a, b) => {
      return (
        (sizeMap[a.toString().toLowerCase()] || 0) -
        (sizeMap[b.toString().toLowerCase()] || 0)
      )
    })
  }
}

export const getSizeRange = (sizes: Size[]): string => {
  const normalizedSizes = normalizeAndSortSizes(sizes)

  if (normalizedSizes.length === 1) {
    return `${normalizedSizes[0]}`
  }

  return `${normalizedSizes[0]}-${normalizedSizes[normalizedSizes.length - 1]}`
}
