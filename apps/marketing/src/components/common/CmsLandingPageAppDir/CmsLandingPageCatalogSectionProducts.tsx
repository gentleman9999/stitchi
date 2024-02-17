import { gql } from '@apollo/client'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '../CatalogProductLegacy'
import { notEmpty } from '@lib/utils/typescript'
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
    skip: !notEmpty(categoryId),
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
              priority={false}
              href={routes.internal.catalog.product.href({
                brandSlug: product.brand?.path || ``,
                productSlug: product.path,
              })}
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
        products(first: 4) {
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