import { gql, useQuery } from '@apollo/client'
import { Section } from '@components/common'
import { Container } from '@components/ui'
import {
  ClosetDesignBuyPageGetDataQuery,
  ClosetDesignBuyPageGetDataQueryVariables,
} from '@generated/ClosetDesignBuyPageGetDataQuery'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import ClosetDesignBuyPageForm, { FormValues } from './ClosetDesignBuyPageForm'
import useAddToCart from './useAddToCart'
import ClosetDesignBuyPagePeview from './ClosetDesignBuyPagePeview'
import routes from '@lib/routes'

interface Props {
  designId: string
}

const ClosetDesignBuyPage = (props: Props) => {
  const router = useRouter()

  const [addToCart, { error: addToCartError }] = useAddToCart()

  const { data, loading, error } = useQuery<
    ClosetDesignBuyPageGetDataQuery,
    ClosetDesignBuyPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId: props.designId },
  })

  const product = data?.designProduct

  const handleCreateCart = async (input: FormValues) => {
    if (!product?.catalogProductId) {
      return
    }

    const productVariants: {
      productVariantEntityId: string
      quantity: number
    }[] = []

    for (const color of input.colors) {
      for (const size of color.sizes ?? []) {
        const foundVariant = product.variants.find(
          variant =>
            variant.catalogProductColorId === color.catalogProductColorId &&
            variant.catalogProductSizeId === size.catalogSizeEntityId,
        )

        if (foundVariant) {
          productVariants.push({
            productVariantEntityId: foundVariant.catalogProductVariantId,
            quantity: size.quantity || 0,
          })
        }
      }
    }

    const order = await addToCart({
      designProductId: props.designId,
      shippingAddressId: null,
      orderItems: productVariants
        .map(variant => ({
          catalogProductVariantId: variant.productVariantEntityId,
          quantity: variant.quantity,
        }))
        .filter(item => item.quantity > 0),
    })

    if (!order) {
      // do error handling
      return
    }
    await router.push(
      routes.internal.order.show.pay.href({ orderId: order.id }),
    )
  }

  return (
    <>
      <NextSeo nofollow noindex />
      <Container>
        <div className="grid grid-cols-12 md:gap-14">
          <div className="col-span-12 md:col-span-6 lg:col-span-7 md:order-2">
            <div className="md:sticky top-14">
              <ClosetDesignBuyPagePeview
                designProduct={product}
                loading={loading}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <Section gutter="sm">
              <h1 className="text-4xl font-heading font-semibold">
                {product?.name}
              </h1>
            </Section>
            <Section gutter="sm">
              {product ? (
                <ClosetDesignBuyPageForm
                  designProduct={product}
                  onSubmit={handleCreateCart}
                  error={addToCartError?.message}
                />
              ) : null}
            </Section>
          </div>
        </div>
      </Container>
    </>
  )
}

const GET_DATA = gql`
  ${ClosetDesignBuyPageForm.fragments.designProduct}
  ${ClosetDesignBuyPagePeview.fragments.designProduct}
  query ClosetDesignBuyPageGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      name
      description
      colors {
        id
        name
        hex
        catalogProductColorId
      }
      variants {
        id
        catalogProductVariantId
        catalogProductColorId
        catalogProductSizeId
        sizeName
      }
      ...ClosetDesignBuyPageFormDesignProductFragment
      ...ClosetDesignBuyPagePeviewDesignProductFragment
    }
  }
`

export default ClosetDesignBuyPage
