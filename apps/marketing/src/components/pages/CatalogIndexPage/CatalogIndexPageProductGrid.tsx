import { gql, QueryResult } from '@apollo/client'
import React from 'react'
import { notEmpty } from '@utils/typescript'
import CatalogIndexPageProduct from './CatalogIndexPageProduct'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import CatalogIndexPageProductSkeleton from './CatalogIndexPageProductSkeleton'
import CatalogIndexPageProuductZeroState from './CatalogIndexPageProductZeroState'
import { InfiniteScrollContainer } from '@components/common'
import Link from 'next/link'
import { CatalogIndexPageProductGridSiteFragment } from '@generated/CatalogIndexPageProductGridSiteFragment'

export interface Props {
  loading: boolean
  site?: CatalogIndexPageProductGridSiteFragment | null
  fetchMore: QueryResult<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >['fetchMore']
}

const CatalogIndexPageProductGrid = ({ site, loading, fetchMore }: Props) => {
  const products =
    site?.search.searchProducts?.products?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  const { pageInfo } = site?.search.searchProducts?.products || {}

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
            <CatalogIndexPageProduct key={product.entityId} product={product} />
          ))}
          {loading &&
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

export default CatalogIndexPageProductGrid
