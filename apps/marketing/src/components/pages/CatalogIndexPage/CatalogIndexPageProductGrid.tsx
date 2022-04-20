import { gql, NetworkStatus, useQuery } from '@apollo/client'

import React from 'react'
import { notEmpty } from '@utils/typescript'
import CatalogIndexPageProduct from './CatalogIndexPageProduct'
import { useCatalogFilters } from './catalog-filters-context'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'
import Link from 'next/link'
import routes from '@lib/routes'
import { Button } from '@components/ui'
import { ArrowRight } from 'icons'
import CatalogIndexPageProductSkeleton from './CatalogIndexPageProductSkeleton'

export const defaultProductFilters = {
  searchTerm: '',
}

export interface Props {}

const CatalogIndexPageProductGrid = ({}: Props) => {
  const { filters } = useCatalogFilters()
  const { data, refetch, networkStatus } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    variables: {
      filters: defaultProductFilters,
    },
  })

  React.useEffect(() => {
    refetch({
      filters: {
        brandEntityIds: filters.brands?.map(({ entityId }) => entityId),
      },
    })
  }, [filters, refetch])

  const products =
    data?.site.search.searchProducts?.products?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  if (networkStatus !== NetworkStatus.ready) {
    return (
      <Grid>
        {Array.from(new Array(6)).map((_, i) => (
          <CatalogIndexPageProductSkeleton key={i} />
        ))}
      </Grid>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-primaryAlt-50 p-10 rounded-2xl w-full max-w-xl text-center m-auto">
        <span className="text-4xl">👀</span>
        <h3 className="text-2xl font-bold mb-2">
          Don&apos;t see what you&apos;re looking for?
        </h3>
        <p className="text-gray-700 text-lg mb-6">
          Not to worry! We work with hundreds of brands and with access to over
          10,000 products. The products on this website just our favorite :)
        </p>
        <Link href={routes.internal.getStarted.href()} passHref>
          <Button endIcon={<ArrowRight strokeWidth="2" />} variant="ghost">
            Find the perfect product
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <Grid>
      {products.map(product => (
        <li key={product.id}>
          <CatalogIndexPageProduct product={product} />
        </li>
      ))}
    </Grid>
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
          products {
            edges {
              node {
                id
                ...CatalogIndexPageProductProductFragment
              }
            }
          }
        }
      }
    }
  `,
}

const GET_DATA = gql`
  ${CatalogIndexPageProductGrid.fragments.site}
  query CatalogIndexPageGetDataQuery($filters: SearchProductsFiltersInput!) {
    site {
      ...CatalogIndexPageProductGridSiteFragment
    }
  }
`

export default CatalogIndexPageProductGrid
