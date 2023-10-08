import { gql } from '@apollo/client'
import { ProductShowPageHeroProductFragment } from '@generated/ProductShowPageHeroProductFragment'
import routes from '@lib/routes'
import React from 'react'
import { track } from '@lib/analytics'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import { useRouter } from 'next/router'
import useProductOptions from '@components/hooks/useProductOptions'
import { useLogger } from 'next-axiom'
import ProductForm, { FormValues } from './ProductForm'
import useCustomizeProduct from './useCustomizeProduct'
import { makeProductTitle } from '@lib/utils/catalog'
import { CatalogProductCustomizeInput } from '@generated/globalTypes'
import { notEmpty } from '@lib/utils/typescript'

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  const logger = useLogger()
  const router = useRouter()
  const { colors, sizes } = useProductOptions({ product })
  const [handleCustomize] = useCustomizeProduct()
  const [activeVariantId, setActiveVariantId] = React.useState<string | null>(
    null,
  )

  const handleSubmit = async (data: FormValues) => {
    const serializedItems: CatalogProductCustomizeInput['items'] = []

    for (const color of data.colors) {
      for (const size of color.sizes) {
        const foundVariant = product.variants.edges
          ?.map(edge => edge?.node)
          .find(variant => {
            const colorOptionValues = variant?.options.edges
              ?.map(edge => edge?.node)
              .find(option => option?.displayName === 'Color')
              ?.values.edges?.map(edge => edge?.node)
              .filter(notEmpty)

            const sizeOptionValues = variant?.options.edges
              ?.map(edge => edge?.node)
              .find(option => option?.displayName === 'Size')
              ?.values.edges?.map(edge => edge?.node)
              .filter(notEmpty)

            return (
              colorOptionValues?.find(
                value =>
                  value?.entityId.toString() === color.catalogProductColorId,
              ) &&
              sizeOptionValues?.find(
                value =>
                  value?.entityId.toString() === size.catalogSizeEntityId,
              )
            )
          })

        if (foundVariant) {
          serializedItems.push({
            catalogProductVariantId: foundVariant.entityId.toString(),
            quantity: size.quantity || 0,
          })
        }
      }
    }

    const productTitle = makeProductTitle(product)

    const { designRequest, order } = await handleCustomize({
      catalogProductId: product.entityId.toString(),
      name: productTitle,
      description: data.designBrief,
      items: serializedItems,
      fileIds: data.fileIds,
      addons: data.customizations
        .filter(c => c.selected === true)
        .map(c => ({
          name: c.name,
          type: c.type,
        })),
    })

    track.productPrimaryCtaClicked({
      name: productTitle,
      productId: product.entityId.toString(),
    })

    if (!designRequest) {
      logger.error('Invariant error: designRequest is null')
      return
    }

    await router.push(
      routes.internal.closet.designs.show.href({
        designId: designRequest.id,
      }),
    )
  }

  return (
    <div className="w-full flex flex-col sm:flex-row relative z-0">
      <h1 className="font-headingDisplay font-semibold text-2xl text-gray-800 sm:hidden">
        {makeProductTitle(product)}
      </h1>
      <div className="sm:h-[calc(100vh-56px)] sticky top-[56px] sm:w-1/2 z-0">
        <CatalogProductVariantPreview
          product={product}
          activeVariantId={activeVariantId}
        />
      </div>
      <div className="sm:w-1/2 z-10">
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          onActiveColorChange={colorId => {
            setActiveVariantId(
              product.variants.edges
                ?.map(edge => edge?.node)
                .find(variant => {
                  const colorOptionValues = variant?.options.edges
                    ?.map(edge => edge?.node)
                    .find(option => option?.displayName === 'Color')
                    ?.values.edges?.map(edge => edge?.node)
                    .filter(notEmpty)

                  return (
                    colorOptionValues?.find(
                      value => value?.entityId.toString() === colorId,
                    ) !== undefined
                  )
                })?.id || null,
            )
          }}
          colors={colors.map(color => ({
            id: color.entityId.toString(),
            catalogProductColorId: color.entityId.toString(),
            hex: color.hexColors[0],
            name: color.label,
          }))}
          variants={colors.flatMap(color =>
            sizes.map(size => ({
              id: size.entityId.toString(),
              sizeName: size.label,
              catalogProductSizeId: size.entityId.toString(),
              catalogProductColorId: color.entityId.toString(),
            })),
          )}
        />
      </div>
    </div>
  )
}

ProductShowPageHero.fragments = {
  product: gql`
    ${CatalogProductVariantPreview.fragments.product}
    ${useProductOptions.fragments.product}
    ${ProductForm.fragments.product}
    fragment ProductShowPageHeroProductFragment on Product {
      ...CatalogProductVariantPreviewProductFragment
      ...ProductFormProductFragment
      ...UseProductColorsProductFragment

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            options {
              edges {
                node {
                  displayName
                  values {
                    edges {
                      node {
                        entityId
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      id
      entityId
      name
      path
    }
  `,
}

export default ProductShowPageHero
