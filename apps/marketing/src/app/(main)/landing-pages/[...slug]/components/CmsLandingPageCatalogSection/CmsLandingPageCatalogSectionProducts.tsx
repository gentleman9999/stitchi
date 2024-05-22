'use client'

import { gql } from '@apollo/client'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '../../../../../../components/common/CatalogProductLegacy'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import routes from '@lib/routes'
import {
  CmsLandingPageCatalogSectionProductsGetDataQuery,
  CmsLandingPageCatalogSectionProductsGetDataQueryVariables,
} from '@generated/types'
import React from 'react'

interface Props {
  categoryId: number
}

const CmsLandingPageCatalogSectionProducts = ({ categoryId }: Props) => {
  const { data } = useSuspenseQuery<
    CmsLandingPageCatalogSectionProductsGetDataQuery,
    CmsLandingPageCatalogSectionProductsGetDataQueryVariables
  >(GET_DATA, {
    variables: { categoryId },
  })

  const { products } = data?.site?.category || {}

  return (
    <>
      {products?.edges
        ?.map(edge => edge?.node)
        .map(product =>
          product ? (
            <CatalogProductLegacy
              key={product.id}
              productId={product.id}
              href={routes.internal.catalog.product.href({
                productSlug: product.path,
              })}
              imageSizes="(max-width: 400px): 190px, (max-width: 525px) 230px, 284px"
            />
          ) : null,
        )}
    </>
  )
}

const GET_DATA = gql`
  ${CatalogProductLegacyFragments.product}
  query CmsLandingPageCatalogSectionProductsGetDataQuery($categoryId: Int!) {
    site {
      category(entityId: $categoryId) {
        id
        products(first: 4, sortBy: DEFAULT) {
          edges {
            node {
              id

              ...CatalogProductLegacyProductFragment
            }
          }
        }
      }
    }
  }
`

export default CmsLandingPageCatalogSectionProducts
