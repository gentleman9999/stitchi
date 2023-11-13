import { gql } from '@apollo/client'
import routes from '@lib/routes'
import React from 'react'
import { track } from '@lib/analytics'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import { useRouter } from 'next/router'
import useProductOptions from '@components/hooks/useProductOptions/useProductOptions'
import { useLogger } from 'next-axiom'
import ProductForm, { FormValues } from './ProductForm'
import useCustomizeProduct from './useCustomizeProduct'
import { makeProductTitle } from '@lib/utils/catalog'
import { CatalogProductCustomizeInput } from '@generated/globalTypes'
import { notEmpty } from '@lib/utils/typescript'
import { ProductShowPageHeroProductFragment } from '@generated/types'
import { UseProductOptionsFragments } from '@components/hooks/useProductOptions'

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  const logger = useLogger()
  const router = useRouter()
  const { colors } = useProductOptions({ product })
  const [handleCustomize] = useCustomizeProduct()
  const [activeVariantId, setActiveVariantId] = React.useState<string | null>(
    null,
  )

  const variants =
    product.variants.edges
      ?.map(edge => edge?.node)
      .map(node => {
        const size = node?.options.edges?.find(
          edge => edge?.node.displayName === 'Size',
        )?.node.values.edges?.[0]?.node

        const color = node?.options.edges?.find(
          edge => edge?.node.displayName === 'Color',
        )?.node.values.edges?.[0]?.node

        if (!size || !color) return null

        return {
          catalogProductVariantId: node?.entityId.toString(),
          sizeName: size.label,
          colorName: color.label,
          catalogProductSizeId: size.entityId.toString(),
          catalogProductColorId: color.entityId.toString(),
        }
      })
      .filter(notEmpty) || []

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

    const designRequestPath = routes.internal.closet.designs.show.href({
      designId: designRequest.id,
    })

    if (!designRequest?.membershipId) {
      // No logged in user
      await router.push(
        routes.internal.signup.href({
          redirectTo: designRequestPath,
        }),
      )
    } else {
      await router.push(designRequestPath)
    }
  }

  return (
    <div className="w-full flex flex-col sm:flex-row relative z-0">
      <h1 className="font-headingDisplay font-semibold text-2xl text-gray-800 sm:hidden">
        {makeProductTitle(product)}
      </h1>
      <div className="flex flex-col md:flex-row w-full gap-2">
        <div className="flex-1 z-0">
          <div className={`w-full sticky top-topbar-height`}>
            <CatalogProductVariantPreview
              product={product}
              activeVariantId={activeVariantId}
            />
          </div>
        </div>
        <div className="flex-1 z-10 sm:max-w-2xl ml-auto shrink">
          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            onActiveColorChange={colorId => {
              setActiveVariantId(
                variants.find(
                  variant => variant.catalogProductColorId === colorId,
                )?.catalogProductVariantId || null,
              )
            }}
            colors={colors.map(color => ({
              id: color.entityId.toString(),
              catalogProductColorId: color.entityId.toString(),
              hex: color.hexColors[0],
              name: color.label,
            }))}
            variants={variants}
          />
        </div>
      </div>
    </div>
  )
}

ProductShowPageHero.fragments = {
  product: gql`
    ${CatalogProductVariantPreview.fragments.product}
    ${UseProductOptionsFragments.product}
    ${ProductForm.fragments.product}
    fragment ProductShowPageHeroProductFragment on Product {
      ...CatalogProductVariantPreviewProductFragment
      ...ProductFormProductFragment
      ...UseProductColorsProductFragment

      variants(first: $variantsFirst) {
        edges {
          node {
            id
            entityId
            options {
              edges {
                node {
                  displayName
                  values {
                    edges {
                      node {
                        entityId
                        label
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
