import { gql, useQuery } from '@apollo/client'
import { queryTypes, useQueryStates } from 'next-usequerystate'
import { UseCatalogFiltersGetDataQuery } from '@generated/UseCatalogFiltersGetDataQuery'
import { notEmpty } from '@utils/typescript'
import { brands } from '@generated/static.json'

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

  const defaultBrand = brands.find(brand => brand.id === brandEntityId)

  const defaultCategory = data?.site.categoryTree?.find(
    category => category.entityId === categoryEntityId,
  )

  const filters = {
    brands: defaultBrand
      ? [defaultBrand]
      : brands.sort((a, b) => a.name.localeCompare(b.name)) || [],

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
