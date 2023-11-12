import { gql, QueryResult } from '@apollo/client'
import React from 'react'
import { notEmpty } from '@lib/utils/typescript'
import CatalogProductLegacy from '../CatalogProductLegacy'

import CatalogProductSkeleton from './CatalogProductSkeleton'
import CatalogProuductZeroState from './CatalogProductZeroState'
import { InfiniteScrollContainer } from '@components/common'
import Link from 'next/link'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
  CatalogProductGridSiteFragment,
} from '@generated/types'

export interface Props {
  loading: boolean
  site?: CatalogProductGridSiteFragment | null
  fetchMore: QueryResult<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >['fetchMore']
}

const CatalogProductGrid = ({ site, loading, fetchMore }: Props) => {
  const products =
    site?.search.searchProducts?.products?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  const { pageInfo } = site?.search.searchProducts?.products || {}

  const handleFetchMore = () => {
    if (pageInfo?.hasNextPage && !loading) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      })
    }
  }

  return (
    <>
      <Grid>
        {products.map((product, i) => (
          <CatalogProductLegacy
            key={product.entityId}
            product={product}
            priority={i < 3}
          />
        ))}
        {loading
          ? Array.from(new Array(6)).map((_, i) => (
              <CatalogProductSkeleton key={i} />
            ))
          : null}
      </Grid>

      <InfiniteScrollContainer onIntersect={handleFetchMore} />

      {pageInfo?.hasNextPage && (
        <Link
          replace
          href={{ query: { after: pageInfo?.endCursor } }}
          className="sr-only"
        >
          Next
        </Link>
      )}
      <div className="mt-20">
        <CatalogProuductZeroState />
      </div>
    </>
  )
}

const Grid = ({ children }: { children: React.ReactNode }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
    {children}
  </ul>
)

CatalogProductGrid.fragments = {
  site: gql`
    ${CatalogProductLegacy.fragments.product}
    fragment CatalogProductGridSiteFragment on Site {
      search {
        searchProducts(filters: $filters, sort: FEATURED) {
          products(first: $first, after: $after) {
            edges {
              node {
                id
                entityId
                ...CatalogProductLegacyProductFragment
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

export default CatalogProductGrid
