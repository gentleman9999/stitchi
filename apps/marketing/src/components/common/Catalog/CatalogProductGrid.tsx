import { gql, QueryResult } from '@apollo/client'
import React from 'react'
import { notEmpty } from '@utils/typescript'
import CatalogProduct from './CatalogProduct'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import CatalogProductSkeleton from './CatalogProductSkeleton'
import CatalogProuductZeroState from './CatalogProductZeroState'
import { InfiniteScrollContainer } from '@components/common'
import Link from 'next/link'
import { CatalogProductGridSiteFragment } from '@generated/CatalogIndexPageProductGridSiteFragment'

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
      <Grid>
        {products.map(product => (
          <CatalogProduct key={product.entityId} product={product} />
        ))}
        {loading &&
          Array.from(new Array(6)).map((_, i) => (
            <CatalogProductSkeleton key={i} />
          ))}
      </Grid>

      <InfiniteScrollContainer onIntersect={handleFetchMore} />

      {pageInfo?.hasNextPage && (
        <Link replace href={{ query: { after: pageInfo?.endCursor } }}>
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
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    {children}
  </ul>
)

CatalogProductGrid.fragments = {
  site: gql`
    ${CatalogProduct.fragments.product}
    fragment CatalogProductGridSiteFragment on Site {
      search {
        searchProducts(filters: $filters) {
          products(first: $first, after: $after) {
            edges {
              node {
                id
                entityId
                ...CatalogProductProductFragment
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