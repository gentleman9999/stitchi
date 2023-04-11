import React from 'react'
import { gql, NetworkStatus, useQuery } from '@apollo/client'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import { SearchProductsFiltersInput } from '@generated/globalTypes'
import {
  CatalogFiltersProvider,
  useCatalogFilters,
} from './catalog-filters-context'
import { useRouter } from 'next/router'
import CatalogFilters from './CatalogFilters'
import CatalogProductGrid from './CatalogProductGrid'

export const makeDefaultQueryVariables = ({
  brandEntityId,
}: {
  brandEntityId?: number
} = {}) => ({
  first: 16,
  filters: {
    brandEntityIds: brandEntityId ? [brandEntityId] : undefined,
    categoryEntityIds: undefined,
    searchSubCategories: true,
  },
})

interface Props {
  // Filters all results to specific brand
  brandEntityId?: number
}

const Catalog = ({ brandEntityId }: Props) => {
  const { query, replace } = useRouter()
  const gridEndRef = React.useRef<HTMLDivElement>(null)

  const {
    activeFilters: { brands, categories },
  } = useCatalogFilters()

  const formattedFilters: SearchProductsFiltersInput = React.useMemo(
    () => ({
      ...makeDefaultQueryVariables({ brandEntityId }).filters,
      // Do not apply brand filter if default brand set
      ...(brandEntityId
        ? {}
        : {
            brandEntityIds: brands.length
              ? brands.map(({ entityId }) => entityId)
              : undefined,
          }),
      categoryEntityIds: categories.length
        ? categories.map(({ entityId }) => entityId)
        : undefined,
    }),
    [brandEntityId, brands, categories],
  )

  const { data, refetch, networkStatus, fetchMore } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      ...makeDefaultQueryVariables({ brandEntityId }),
      after: typeof query.after === 'string' ? query.after : undefined,
      filters: formattedFilters,
    },
  })

  React.useEffect(() => {
    refetch({
      filters: formattedFilters,
    })
  }, [formattedFilters, refetch])

  React.useEffect(() => {
    const { after } = query
    if (typeof after === 'string') {
      fetchMore({
        variables: { after },
      })

      const newQuery = { ...query }
      delete newQuery.after

      replace({ query: newQuery })
    }
  }, [query, fetchMore, replace])

  return (
    <div>
      <CatalogFilters
        catalogEndRef={gridEndRef}
        hideBrands={Boolean(brandEntityId)}
      />

      <div className="mt-4 grid grid-cols-1 gap-10">
        <div className="col-span-1">
          <CatalogProductGrid
            fetchMore={fetchMore}
            site={data?.site}
            loading={networkStatus !== NetworkStatus.ready}
          />
        </div>
      </div>
      <div ref={gridEndRef} />
    </div>
  )
}

const withFilterContext = (Component: React.ComponentType<Props>) => {
  const filterContext = (props: Props) => {
    return (
      <CatalogFiltersProvider brandEntityId={props.brandEntityId}>
        <Component {...props} />
      </CatalogFiltersProvider>
    )
  }

  return filterContext
}

export const GET_DATA = gql`
  ${CatalogProductGrid.fragments.site}
  query CatalogIndexPageGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $first: Int!
    $after: String
  ) {
    site {
      ...CatalogProductGridSiteFragment
    }
  }
`

export default withFilterContext(Catalog)
