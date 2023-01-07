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
import Link from 'next/link'
import { useRouter } from 'next/router'

export const DEFUALT_QUERY_VARIABLES = {
  first: 30,
  filters: {
    brandEntityIds: [],
    categoryEntityIds: [],
    searchSubCategories: true,
  },
}

export interface Props {}

const CatalogIndexPageProductGrid = ({}: Props) => {
  const { replace, query } = useRouter()

  const {
    activeFilters: { brands, categories },
  } = useCatalogFilters()

  const formattedFilters: SearchProductsFiltersInput = React.useMemo(
    () => ({
      ...DEFUALT_QUERY_VARIABLES.filters,
      brandEntityIds: brands.length
        ? brands.map(({ entityId }) => entityId)
        : undefined,
      categoryEntityIds: categories.length
        ? categories.map(({ entityId }) => entityId)
        : null,
    }),
    [brands, categories],
  )

  const { data, refetch, networkStatus, fetchMore } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      ...DEFUALT_QUERY_VARIABLES,
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
      <>{JSON.stringify(products)}</>
      <InfiniteScrollContainer onLoadMore={handleFetchMore}>
        <Grid>
          {products.map(product => (
            <CatalogIndexPageProduct key={product.entityId} product={product} />
          ))}
          {networkStatus !== NetworkStatus.ready &&
            Array.from(new Array(6)).map((_, i) => (
              <CatalogIndexPageProductSkeleton key={i} />
            ))}
        </Grid>
      </InfiniteScrollContainer>
      {pageInfo?.hasNextPage && (
        <Link
          replace
          rel="noindex"
          href={{ query: { after: pageInfo?.endCursor } }}
        >
          Next
        </Link>
      )}
      <div className="mt-20">
        <CatalogIndexPageProuductZeroState />
      </div>
    </>
  )
}

const Grid = ({ children }: { children: React.ReactNode }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                entityId
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
