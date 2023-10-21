import { gql, useQuery } from '@apollo/client'

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
import {
  SlideOver,
  SlideOverActions,
  SlideOverContent,
  SlideOverHeader,
} from '@components/ui/SlideOver'
import SubmitBanner from './SubmitBanner'

interface Props {
  designId: string
}

const ClosetDesignBuyPage = (props: Props) => {
  const router = useRouter()

  const [addToCart, { error: addToCartError }] = useAddToCart()

  const { data } = useQuery<
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
    await router.replace(
      routes.internal.order.show.pay.href({ orderId: order.id }),
    )
  }

  return (
    <>
      <NextSeo nofollow noindex />

      {product ? (
        <ClosetDesignBuyPageForm
          designProduct={product}
          onSubmit={handleCreateCart}
          error={addToCartError?.message}
          renderContainer={({
            children,
            loading,
            submitting,
            onSubmit,
            error,
            priceCents,
            unitPriceCents,
          }) => (
            <SlideOver
              open
              className="sm:w-full sm:max-w-xl"
              onOpenChange={() =>
                router.replace(
                  routes.internal.closet.inventory.show.products.show.href({
                    designId: props.designId,
                  }),
                )
              }
            >
              <SlideOverHeader title={product?.name} />
              <SlideOverContent>{children}</SlideOverContent>
              <SlideOverActions>
                <SubmitBanner
                  onSubmit={onSubmit}
                  priceCents={priceCents}
                  unitPriceCents={unitPriceCents}
                  submitting={submitting}
                  loading={loading}
                  error={Boolean(error)}
                />
              </SlideOverActions>
            </SlideOver>
          )}
        />
      ) : null}
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
