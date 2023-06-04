import { gql, useQuery } from '@apollo/client'
import { Section } from '@components/common'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import { Container } from '@components/ui'
import {
  ProductBuyPageGetDataQuery,
  ProductBuyPageGetDataQueryVariables,
} from '@generated/ProductBuyPageGetDataQuery'
import routes from '@lib/routes'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import ProductBuyPageForm from './ProductBuyPageForm'

const VARIANT_LIMIT = 250

interface Props {
  productSlug: string
}

const ProductBuyPage = (props: Props) => {
  const router = useRouter()
  const { data, loading, error } = useQuery<
    ProductBuyPageGetDataQuery,
    ProductBuyPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { path: props.productSlug, variantLimit: VARIANT_LIMIT },
  })

  const product = data?.site.route.node

  if (product?.__typename !== 'Product') {
    console.error(
      `Invalid node type passed to product page: ${product?.__typename}. Redirecting to catalog...`,
    )
    router.push(routes.internal.catalog.href())
    return null
  }

  // Select product variants (colors, size, quantity)
  // Gather art requirements

  return (
    <>
      <NextSeo nofollow noindex />
      <Container>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <CatalogProductVariantPreview
              product={product}
              onVariantChange={() => {}}
            />
          </div>
          <div>
            <Section>
              <ProductBuyPageForm product={product} />
            </Section>
          </div>
        </div>
      </Container>
    </>
  )
}

const GET_DATA = gql`
  ${CatalogProductVariantPreview.fragments.product}
  ${ProductBuyPageForm.fragments.product}
  query ProductBuyPageGetDataQuery($path: String!, $variantLimit: Int!) {
    site {
      route(path: $path) {
        node {
          id

          ... on Product {
            id
            ...CatalogProductVariantPreviewProductFragment
            ...ProductBuyPageFormProductFragment
          }
        }
      }
    }
  }
`

export default ProductBuyPage
