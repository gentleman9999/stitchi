import { gql } from '@apollo/client'
import { UseFiltersSiteFragment } from '@generated/UseFiltersSiteFragment'
import { queryTypes, useQueryStates } from 'next-usequerystate'
import { notEmpty } from '@utils/typescript'

type Site = UseFiltersSiteFragment | null | undefined

interface Props {
  site?: Site
}

const useFilters = ({ site }: Props) => {
  const [queryFilters, setQueryFilters] = useQueryStates(
    {
      brands: queryTypes.array(queryTypes.string),
      categories: queryTypes.array(queryTypes.string),
    },
    {
      history: 'push',
    },
  )

  const filters = {
    brands: makeBrands(site, queryFilters),
    categories: makeCategories(site, queryFilters),
  }

  const activeFilters = {
    brands: filters.brands.filter(b => b.active),
    categories: filters.categories.filter(c => c.active),
  }

  return {
    availableFilters: filters,
    activeFilters,
    setFilters: setQueryFilters,
  }
}

const makeCategories = (
  site: Site,
  filters: ReturnType<typeof useQueryStates>[0],
) => {
  return (
    site?.categoryTree.map(catagory => ({
      ...catagory,
      active: filters.categories?.includes(catagory.entityId.toString()),
    })) || []
  )
}

const makeBrands = (
  site: Site,
  filters: ReturnType<typeof useQueryStates>[0],
) => {
  return (
    site?.brands.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty)
      .map(brand => ({
        ...brand,
        active: filters.brands?.includes(brand.path),
      })) || []
  )
}

const CATEGORY_FRAGMENT = gql`
  fragment UseFiltersCategoryFragment on CategoryTreeItem {
    entityId
    name
  }
`

useFilters.fragments = {
  site: gql`
    ${CATEGORY_FRAGMENT}
    fragment UseFiltersSiteFragment on Site {
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
      categoryTree {
        ...UseFiltersCategoryFragment
      }
    }
  `,
}

export default useFilters
