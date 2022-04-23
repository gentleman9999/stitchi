import { gql } from '@apollo/client'
import { UseBrandFiltersSiteFragment } from '@generated/UseBrandFiltersSiteFragment'
import { notEmpty } from '@utils/typescript'
import useQueryParamArray from './useQueryParamArray'

type Site = UseBrandFiltersSiteFragment | null | undefined

interface Props {
  site?: Site
}

const useBrandFilters = ({ site }: Props) => {
  const brands = makeBrands(site)
  const {
    value: brandIds,
    handleClear: handleClearBrandIds,
    handleToggle: handleToggleBrandId,
  } = useQueryParamArray({ param: 'brandIds' })

  const activeBrands = brands.filter(b => brandIds.includes(b.path))

  const availableBrands = brands.map(brand => ({
    ...brand,
    active: brandIds.includes(brand.path),
  }))

  return {
    activeBrands,
    availableBrands,
    toggleBrand: handleToggleBrandId,
    clearBrands: handleClearBrandIds,
  }
}

const makeBrands = (site: Site) => {
  return site?.brands.edges?.map(edge => edge?.node).filter(notEmpty) || []
}

useBrandFilters.fragments = {
  site: gql`
    fragment UseBrandFiltersSiteFragment on Site {
      brands(first: 50) {
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
