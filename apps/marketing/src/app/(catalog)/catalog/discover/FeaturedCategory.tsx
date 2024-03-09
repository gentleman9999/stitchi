'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import {
  CatalogDiscoverPageFeaturedCategoryGetCategoryDataQuery,
  CatalogDiscoverPageFeaturedCategoryGetCategoryDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'

interface Props {
  categoryEntityId: number
}

const FeaturedCategory = ({ categoryEntityId }: Props) => {
  console.log('CATEGORY ENTITY ID', categoryEntityId)
  const { data } = useSuspenseQuery<
    CatalogDiscoverPageFeaturedCategoryGetCategoryDataQuery,
    CatalogDiscoverPageFeaturedCategoryGetCategoryDataQueryVariables
  >(GET_CATEGORY_DATA, {
    variables: {
      categoryEntityId,
    },
  })

  const category = data.site.category

  return (
    <ul className="grid grid-cols-5 gap-4">
      {category?.products.edges
        ?.map(node => node?.node)
        .filter(notEmpty)
        .map(product => (
          <CatalogProductLegacy
            key={product.id}
            productId={product.id}
            href={routes.internal.catalog.product.href({
              productSlug: product.path,
            })}
            priority={false}
          />
        ))}
    </ul>
  )
}

const GET_CATEGORY_DATA = gql`
  ${CatalogProductLegacyFragments.product}
  query CatalogDiscoverPageFeaturedCategoryGetCategoryDataQuery(
    $categoryEntityId: Int!
  ) {
    site {
      category(entityId: $categoryEntityId) {
        id
        name
        defaultImage {
          url(width: 600)
        }
        products(first: 5) {
          edges {
            node {
              id
              path
              ...CatalogProductLegacyProductFragment
            }
          }
        }
      }
    }
  }
`

export default FeaturedCategory
