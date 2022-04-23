import { gql, NetworkStatus, useQuery } from '@apollo/client'
import React from 'react'
import { notEmpty } from '@utils/typescript'
import CatalogIndexPageProduct from './CatalogIndexPageProduct'
import { useCatalogFilters } from './catalog-filters-context'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import CatalogIndexPageProductSkeleton from './CatalogIndexPageProductSkeleton'
import CatalogIndexPageProuductZeroState from './CatalogIndexPageProductZeroState'
import { InfiniteScrollContainer } from '@components/common'
import { SearchProductsFiltersInput } from '@generated/globalTypes'

export interface Props {}

const CatalogIndexPageProductGrid = ({}: Props) => {
  const { filters } = useCatalogFilters()

  const formattedFilters: SearchProductsFiltersInput = React.useMemo(
    () => ({
      brandEntityIds: filters.brands.length
        ? filters.brands.map(({ entityId }) => entityId)
        : undefined,
      categoryEntityIds: filters.categories.length
        ? filters.categories.map(({ entityId }) => entityId)
        : null,
      searchSubCategories: true,
    }),
    [filters.brands, filters.categories],
  )
  const { data, refetch, networkStatus, fetchMore } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      filters: formattedFilters,
      first: 30,
    },
  })

  React.useEffect(() => {
    refetch({
      filters: formattedFilters,
    })
  }, [formattedFilters, refetch])

  const products =
    data?.site.search.searchProducts?.products?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  const { pageInfo } = data?.site.search.searchProducts?.products || {}

  const handleFetchMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      })
    }
  }

  return (
    <>
      <InfiniteScrollContainer onLoadMore={handleFetchMore}>
        <Grid>
          {products.map(product => (
            <li key={product.id}>
              <CatalogIndexPageProduct product={product} />
            </li>
          ))}
          {networkStatus !== NetworkStatus.ready &&
            Array.from(new Array(6)).map((_, i) => (
              <CatalogIndexPageProductSkeleton key={i} />
            ))}
        </Grid>
      </InfiniteScrollContainer>
      <div className="mt-20">
        <CatalogIndexPageProuductZeroState />
      </div>
    </>
  )
}

const Grid: React.FC = ({ children }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {children}
  </ul>
)

CatalogIndexPageProductGrid.fragments = {
  site: gql`
    ${CatalogIndexPageProduct.fragments.product}
    fragment CatalogIndexPageProductGridSiteFragment on Site {
      search {
        searchProducts(filters: $filters) {
          products(first: $first, after: $after) {
            edges {
              node {
                id
                ...CatalogIndexPageProductProductFragment
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    }
  `,
}

const GET_DATA = gql`
  ${CatalogIndexPageProductGrid.fragments.site}
  query CatalogIndexPageGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $first: Int!
    $after: String
  ) {
    site {
      ...CatalogIndexPageProductGridSiteFragment
    }
  }
`

export default CatalogIndexPageProductGrid
