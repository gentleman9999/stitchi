'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import {
  ClosetDesignBuyPageGetDataQuery,
  ClosetDesignBuyPageGetDataQueryVariables,
} from '@generated/ClosetDesignBuyPageGetDataQuery'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import ClosetDesignBuyPageForm, { FormValues } from './ClosetDesignBuyPageForm'
import useAddToCart from './useAddToCart'
import ClosetDesignBuyPagePeview from './ClosetDesignBuyPagePeview'
import routes from '@lib/routes'

import SubmitBanner from './SubmitBanner'
import { CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/20/solid'

const Page = () => {
  const router = useRouter()
  const params = useParams<{ designId: string }>()

  const [addToCart, { error: addToCartError }] = useAddToCart()

  const { data } = useSuspenseQuery<
    ClosetDesignBuyPageGetDataQuery,
    ClosetDesignBuyPageGetDataQueryVariables
  >(GET_DATA, {
    skip: !params?.designId,
    variables: { designId: `${params?.designId}` },
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
    router.replace(routes.internal.order.show.pay.href({ orderId: order.id }))
  }

  return (
    <>
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
            <>
              <CardHeader>
                <div className="flex gap-4 justify-between items-center">
                  <CardTitle title={product.name} />
                  <Button
                    size="xs"
                    variant="naked"
                    Component={Link}
                    href={routes.internal.closet.inventory.href()}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent>{children}</CardContent>

              <CardContent>
                <SubmitBanner
                  onSubmit={onSubmit}
                  priceCents={priceCents}
                  unitPriceCents={unitPriceCents}
                  submitting={submitting}
                  loading={loading}
                  error={Boolean(error)}
                />
              </CardContent>
            </>
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

export default Page
