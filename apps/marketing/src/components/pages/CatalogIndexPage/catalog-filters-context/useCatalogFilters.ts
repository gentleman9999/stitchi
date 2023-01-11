import { gql, useQuery } from '@apollo/client'
import { queryTypes, useQueryStates } from 'next-usequerystate'
import { notEmpty } from '@utils/typescript'
import { UseCatalogFiltersGetDataQuery } from '@generated/UseCatalogFiltersGetDataQuery'

type Site = UseCatalogFiltersGetDataQuery['site'] | null | undefined

interface Props {}

const useCatalogFilters = ({}: Props = {}) => {
  const [queryFilters, setQueryFilters] = useQueryStates(
    {
      brands: queryTypes.array(queryTypes.string),
      categories: queryTypes.array(queryTypes.string),
    },
    {
      history: 'push',
    },
  )

  const { data } = useQuery<UseCatalogFiltersGetDataQuery>(GET_DATA)

  const filters = {
    brands: makeBrands(data?.site, queryFilters),
    categories: makeCategories(data?.site, queryFilters),
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

const GET_DATA = gql`
  query UseCatalogFiltersGetDataQuery {
    site {
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
        entityId
        name
      }
    }
  }
`

export default useCatalogFilters
