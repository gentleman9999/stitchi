import { gql } from '@apollo/client'
import { UseBrandFiltersSiteFragment_brands_edges_node } from '@generated/UseBrandFiltersSiteFragment'
import { useRouter } from 'next/router'

interface Props {
  brands: UseBrandFiltersSiteFragment_brands_edges_node[]
}

const useBrandFilters = ({ brands }: Props) => {
  const { query, push } = useRouter()
  const { brandIds } = query

  const parsedBrandIds = stringToArray(brandIds?.toString())

  const toggleBrand = (brandSlug: string) => {
    if (parsedBrandIds.includes(brandSlug)) {
      push({
        query: {
          brandIds: arrayToString(
            parsedBrandIds.filter(id => id !== brandSlug),
          ),
        },
      })
    } else {
      push({
        query: {
          brandIds: arrayToString([...parsedBrandIds, brandSlug]),
        },
      })
    }
  }

  const clearBrands = () => {
    const { brandIds, ...params } = query

    push({
      query: params,
    })
  }

  const activeBrands = brands.filter(b => parsedBrandIds.includes(b.path))

  const availableBrands = brands.map(brand => ({
    ...brand,
    active: parsedBrandIds.includes(brand.path),
  }))

  return {
    activeBrands,
    availableBrands,
    toggleBrand,
    clearBrands,
  }
}

const arrayToString = (array: string[]) => {
  return array.join(',')
}

const stringToArray = (string?: string) => {
  if (!string) return []
  try {
    return string.split(',')
  } catch {
    return []
  }
}

useBrandFilters.fragments = {
  site: gql`
    fragment UseBrandFiltersSiteFragment on Site {
      brands {
        edges {
          node {
            id
            name
            path
            entityId
            products(first: 1) {
              edges {
                __typename
              }
            }
          }
        }
      }
    }
  `,
}

export default useBrandFilters
