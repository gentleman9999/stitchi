import { gql, useQuery } from '@apollo/client'

import React from 'react'
import { notEmpty } from '@utils/typescript'
import CatalogIndexPageProduct from './CatalogIndexPageProduct'
import { useCatalogFilters } from './catalog-filters-context'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/CatalogIndexPageGetDataQuery'

export interface Props {}

const CatalogIndexPageProductGrid = ({}: Props) => {
  // const { filters } = useCatalogFilters()
  const { data, refetch } = useQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      filters: {
        searchTerm: '',
      },
    },
  })

  // React.useEffect(() => {
  //   refetch({ filter: filters })
  // }, [filters, refetch])

  const products =
    data?.site.search.searchProducts?.products?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(product => (
        <li key={product.id}>
          <CatalogIndexPageProduct product={product} />
        </li>
      ))}
    </ul>
  )
}

const GET_DATA = gql`
  ${CatalogIndexPageProduct.fragments.product}
  query CatalogIndexPageGetDataQuery($filters: SearchProductsFiltersInput!) {
    site {
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
  }
`

export default CatalogIndexPageProductGrid
