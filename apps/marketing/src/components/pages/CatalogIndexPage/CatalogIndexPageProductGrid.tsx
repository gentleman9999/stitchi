import { gql, useQuery } from '@apollo/client'

import React from 'react'
import { notEmpty } from '@utils/typescript'
import CatalogIndexPageProduct from './CatalogIndexPageProduct'
import { useCatalogFilters } from './catalog-filters-context'

export interface Props {}

const CatalogIndexPageProductGrid = ({}: Props) => {
  // const { filters } = useCatalogFilters()
  // const { data, refetch } = useQuery<
  //   CatalogIndexPageGetDataQuery,
  //   CatalogIndexPageGetDataQueryVariables
  // >(GET_DATA, {
  //   variables: {
  //     first: 20,
  //     after: null,
  //     // filter: filters,
  //   },
  // })

  // React.useEffect(() => {
  //   refetch({ filter: filters })
  // }, [filters, refetch])

  // const products = data?.catalog?.products?.nodes?.filter(notEmpty) || []
  const products = [] as any[]

  return (
    <ul className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <li key={product.id}>
          <CatalogIndexPageProduct />
        </li>
      ))}
    </ul>
  )
}

// const GET_DATA = gql`
//   query CatalogIndexPageGetDataQuery(
//     $first: Int
//     $after: String
//     $filter: MaterialFilterArg
//   ) {
//     catalog {
//       id
//       products(first: $first, after: $after, filter: $filter) {
//         nodes {
//           id
//           ...CatalogIndexPageProductProductFragment
//         }
//       }
//     }
//   }
// `

export default CatalogIndexPageProductGrid
