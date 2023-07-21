import { gql, useQuery } from '@apollo/client'
import { queryTypes, useQueryStates } from 'next-usequerystate'
import { UseCatalogFiltersGetDataQuery } from '@generated/UseCatalogFiltersGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import staticData from '@generated/static.json'

interface Props {
  brandEntityId?: number
  categoryEntityId?: number
}

const useCatalogFilters = ({ brandEntityId, categoryEntityId }: Props = {}) => {
  const [, setQueryFilters] = useQueryStates(
    {
      brands: queryTypes.array(queryTypes.integer),
      categories: queryTypes.array(queryTypes.integer),
      fabrics: queryTypes.array(queryTypes.integer),
      collections: queryTypes.array(queryTypes.integer),
      fits: queryTypes.array(queryTypes.integer),
    },
    {
      history: 'push',
    },
  )

  const { data } = useQuery<UseCatalogFiltersGetDataQuery>(GET_DATA)

  const defaultBrand = staticData.brands.find(
    brand => brand.id === brandEntityId,
  )

  const defaultCategory = data?.site.categoryTree?.find(
    category => category.entityId === categoryEntityId,
  )

  const filters = {
    brands: defaultBrand
      ? [defaultBrand]
      : staticData.brands.sort((a, b) => a.name.localeCompare(b.name)) || [],

    categories: defaultCategory
      ? [defaultCategory]
      : data?.site.categoryTree.filter(notEmpty) || [],
    fabrics: data?.site.fabricCategory[0].children || [],
    collections: data?.site.collections[0].children || [],
    fits: data?.site.fit[0].children || [],
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
      fabricCategory: categoryTree(rootEntityId: 506) {
        entityId
        children {
          entityId
          name
        }
      }
      collections: categoryTree(rootEntityId: 516) {
        entityId
        children {
          entityId
          name
        }
      }
      fit: categoryTree(rootEntityId: 508) {
        entityId
        children {
          entityId
          name
        }
      }
    }
  }
`

export default useCatalogFilters
