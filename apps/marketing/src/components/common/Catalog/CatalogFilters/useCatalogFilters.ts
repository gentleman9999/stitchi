import { gql, useQuery } from '@apollo/client'
import { queryTypes, useQueryStates } from 'next-usequerystate'
import { UseCatalogFiltersGetDataQuery } from '@generated/UseCatalogFiltersGetDataQuery'
import { notEmpty } from '@utils/typescript'

interface Props {
  brandEntityId?: number
  categoryEntityId?: number
}

const useCatalogFilters = ({ brandEntityId, categoryEntityId }: Props = {}) => {
  const [, setQueryFilters] = useQueryStates(
    {
      brands: queryTypes.array(queryTypes.integer),
      categories: queryTypes.array(queryTypes.integer),
    },
    {
      history: 'push',
    },
  )

  const { data } = useQuery<UseCatalogFiltersGetDataQuery>(GET_DATA)

  const defaultBrand = data?.site.brands.edges?.find(
    edge => edge?.node.entityId === brandEntityId,
  )?.node

  const defaultCategory = data?.site.categoryTree?.find(
    category => category.entityId === categoryEntityId,
  )

  const filters = {
    brands: defaultBrand
      ? [defaultBrand]
      : data?.site.brands.edges?.map(edge => edge?.node).filter(notEmpty) || [],

    categories: defaultCategory
      ? [defaultCategory]
      : data?.site.categoryTree.filter(notEmpty) || [],
  }

  return {
    availableFilters: filters,
    setFilters: setQueryFilters,
  }
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
        children {
          entityId
          name
          children {
            entityId
            name
          }
        }
      }
    }
  }
`

export default useCatalogFilters
