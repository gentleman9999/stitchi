import { gql, useQuery } from '@apollo/client'
import { Section } from '@components/common'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import { Container } from '@components/ui'
import {
  ProductBuyPageGetDataQuery,
  ProductBuyPageGetDataQueryVariables,
  ProductBuyPageGetDataQuery_site_route_node_Product_variants_edges_node as ProductVariant,
} from '@generated/ProductBuyPageGetDataQuery'
import routes from '@lib/routes'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import { getProductVariantByOptions } from './get-product-variant-by-options'
import ProductBuyPageForm, { FormValues } from './ProductBuyPageForm'
import useAddToCart from './useAddToCart'

interface Props {
  productSlug: string
}

const ProductBuyPage = (props: Props) => {
  const router = useRouter()

  const [addToCart, { error: addToCartError }] = useAddToCart()

  const { data, loading, error } = useQuery<
    ProductBuyPageGetDataQuery,
    ProductBuyPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { path: props.productSlug },
  })

  const product = data?.site.route.node

  if (loading) {
    return null
  }

  if (product?.__typename !== 'Product') {
    console.error(
      `Invalid node type passed to product page: ${product?.__typename}. Redirecting to catalog...`,
    )
    router.push(routes.internal.catalog.href())
    return null
  }

  const handleCreateCart = async (input: FormValues) => {
    const possibleProductVariants: {
      colorEntityId: number | null
      sizeEntityId: number | null
      quantity: number
    }[] = []

    input.colors.forEach(color => {
      color.sizes?.forEach(size => {
        if (!size.quantity) return

        possibleProductVariants.push({
          colorEntityId: color.colorEntityId,
          sizeEntityId: size.sizeEntityId,
          quantity: size.quantity,
        })
      })
    })

    const colorOptionEntityId = product.productOptions.edges?.find(
      edge => edge?.node.displayName === 'Color',
    )?.node.entityId

    const sizeOptionEntityId = product.productOptions.edges?.find(
      edge => edge?.node.displayName === 'Size',
    )?.node.entityId

    const productVariants: {
      productVariantEntityId: number
      quantity: number
    }[] = []

    for (const productVariant of possibleProductVariants) {
      let optionValueIds: {
        optionEntityId: number
        valueEntityId: number
      }[] = []

      if (colorOptionEntityId && productVariant.colorEntityId) {
        optionValueIds.push({
          optionEntityId: colorOptionEntityId,
          valueEntityId: productVariant.colorEntityId,
        })
      }

      if (sizeOptionEntityId && productVariant.sizeEntityId) {
        optionValueIds.push({
          optionEntityId: sizeOptionEntityId,
          valueEntityId: productVariant.sizeEntityId,
        })
      }

      console.log('OPTION VALUE IDS', optionValueIds)

      const variant = await getProductVariantByOptions({
        optionValueIds,
        productEntityId: product.entityId,
      })

      if (variant) {
        productVariants.push({
          productVariantEntityId: variant.entityId,
          quantity: productVariant.quantity,
        })
      }
    }

    const order = await addToCart({
      productEntityId: product.entityId,
      shippingAddressId: null,
      printLocations: input.printLocations,
      includeFulfillment: input.includeFulfillment,
      items: productVariants,
    })

    if (!order) {
      // do error handling
      return
    }
    await router.push(
      routes.internal.order.show.pay.href({ orderId: order.id }),
    )
  }

  // Select product variants (colors, size, quantity)
  // Gather art requirements

  return (
    <>
      <NextSeo nofollow noindex />
      <Container>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <CatalogProductVariantPreview product={product} />
          </div>
          <div>
            <Section>
              <ProductBuyPageForm
                product={product}
                onSubmit={handleCreateCart}
                error={addToCartError?.message}
              />
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
  query ProductBuyPageGetDataQuery($path: String!, $variantsFirst: Int = 250) {
    site {
      route(path: $path) {
        node {
          id

          ... on Product {
            id
            entityId

            productOptions {
              edges {
                node {
                  entityId
                  displayName
                }
              }
            }

            ...CatalogProductVariantPreviewProductFragment
            ...ProductBuyPageFormProductFragment
          }
        }
      }
    }
  }
`

export default ProductBuyPage
