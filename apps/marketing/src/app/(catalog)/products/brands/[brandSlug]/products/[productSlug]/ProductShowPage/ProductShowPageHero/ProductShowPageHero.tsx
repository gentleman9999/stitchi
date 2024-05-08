import routes from '@lib/routes'
import React from 'react'
import { track } from '@lib/analytics'
import CatalogProductVariantPreview from '@components/common/CatalogProductVariantPreview'
import { useRouter } from 'next/navigation'
import useProductOptions from '@components/hooks/useProductOptions/useProductOptions'
import { useLogger } from 'next-axiom'
import ProductForm, { FormValues } from './ProductForm'
import useCustomizeProduct from '../useCustomizeProduct'
import { getSizeRange, normalizeAndSortSizes } from '@lib/utils/catalog'
import { CatalogProductCustomizeInput } from '@generated/globalTypes'
import { notEmpty } from '@lib/utils/typescript'
import { ProductShowPageHeroProductFragment } from '@generated/types'
import { useUser } from '@auth0/nextjs-auth0/client'
import ProductTitle from './ProductTitle'
import ProductFormPreview from './ProductFormPreview'
import Alert from '@components/ui/Alert'
import Button from '@components/ui/ButtonV2/Button'
import { useIntercom } from 'react-use-intercom'
import { parseAsString, useQueryState } from 'nuqs'
import { addBusinessDays, format } from 'date-fns'
import { BoltIcon } from '@heroicons/react/24/outline'

interface Props {
  product: ProductShowPageHeroProductFragment
}

const ProductShowPageHero = ({ product }: Props) => {
  const logger = useLogger()
  const router = useRouter()
  const { user } = useUser()
  const intercom = useIntercom()

  const { colors, sizes } = useProductOptions({ productId: product.id })
  const [handleCustomize] = useCustomizeProduct()

  const variants = React.useMemo(
    () =>
      product.variants?.edges
        ?.map(edge => edge?.node)
        .map(node => {
          const size = node?.options?.edges?.find(
            edge => edge?.node?.displayName === 'Size',
          )?.node?.values?.edges?.[0]?.node

          const color = node?.options?.edges?.find(
            edge => edge?.node?.displayName === 'Color',
          )?.node?.values?.edges?.[0]?.node

          if (!size?.entityId || !color?.entityId || !node?.entityId)
            return null

          return {
            catalogProductVariantId: node?.entityId.toString(),
            sizeName: size.label,
            colorName: color.label,
            catalogProductSizeId: size.entityId.toString(),
            catalogProductColorId: color.entityId.toString(),
          }
        })
        .filter(notEmpty) || [],
    [product.variants?.edges],
  )

  const [activeColorId, setActiveColorId] = useQueryState(
    'color',
    parseAsString,
  )

  const [activeSizeId, setActiveSizeId] = useQueryState('size', parseAsString)

  const activeVariantId = React.useMemo(() => {
    let filteredVariants = variants

    if (activeColorId) {
      filteredVariants = variants.filter(
        variant => variant.catalogProductColorId === activeColorId,
      )
    }

    if (activeSizeId) {
      filteredVariants = filteredVariants.filter(
        variant => variant.catalogProductSizeId === activeSizeId,
      )
    }

    return filteredVariants[0]?.catalogProductVariantId || null
  }, [activeColorId, activeSizeId, variants])

  const productTitle = product.humanizedName

  const handleSubmit = async (data: FormValues) => {
    const serializedItems: CatalogProductCustomizeInput['items'] = []

    for (const color of data.colors) {
      for (const size of color.sizes) {
        const foundVariant = product.variants?.edges
          ?.map(edge => edge?.node)
          .find(variant => {
            const colorOptionValues = variant?.options?.edges
              ?.map(edge => edge?.node)
              .find(option => option?.displayName === 'Color')
              ?.values?.edges?.map(edge => edge?.node)
              .filter(notEmpty)

            const sizeOptionValues = variant?.options?.edges
              ?.map(edge => edge?.node)
              .find(option => option?.displayName === 'Size')
              ?.values?.edges?.map(edge => edge?.node)
              .filter(notEmpty)

            return (
              colorOptionValues?.find(
                value =>
                  value?.entityId?.toString() === color.catalogProductColorId,
              ) &&
              sizeOptionValues?.find(
                value =>
                  value?.entityId?.toString() === size.catalogSizeEntityId,
              )
            )
          })

        if (foundVariant?.entityId) {
          serializedItems.push({
            catalogProductVariantId: foundVariant.entityId.toString(),
            quantity: size.quantity || 0,
          })
        }
      }
    }

    let designRequest

    if (product.entityId) {
      const res = await handleCustomize({
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

      designRequest = res.designRequest

      track.productPrimaryCtaClicked({
        name: productTitle,
        productId: product.entityId.toString(),
      })
    }

    if (!designRequest) {
      logger.error('Invariant error: designRequest is null')
      return
    }

    const designRequestPath = routes.internal.closet.designs.show.href({
      designId: designRequest.id,
    })

    if (!designRequest?.membershipId) {
      // No logged in user
      router.push(
        routes.internal.signup.href({
          redirectTo: designRequestPath,
        }),
      )
    } else {
      router.push(designRequestPath)
    }
  }

  const handleActiveColorChange = (colorId: string | null) => {
    setActiveColorId(colorId)
  }

  const mappedColors = colors.map(color => ({
    id: color.entityId.toString(),
    catalogProductColorId: color.entityId.toString(),
    hex: color.hexColors[0],
    name: color.label,
  }))

  const { reviewSummary } = product

  return (
    <div className="@container w-full">
      <div className="w-full flex flex-col @2xl:flex-row relative z-0">
        <div className="flex flex-col @2xl:flex-row w-full gap-2">
          <div className="flex-1 z-0">
            <div className={`w-full sticky top-topbar-height`}>
              <CatalogProductVariantPreview
                product={product}
                activeVariantId={activeVariantId}
              />
            </div>
          </div>
          <div className="flex-1 z-10 @2xl:max-w-md ml-auto shrink w-full">
            <div className="relative flex flex-col gap-8 mb-8 bg-paper">
              <ProductTitle
                pretitle={`${product.brand?.name} ${product.sku}`}
                title={productTitle}
                rating={reviewSummary?.summationOfRatings}
                ratingCount={reviewSummary?.numberOfReviews}
              />

              <div className="rounded-sm p-4 bg-gray-100 flex flex-row items-center gap-4">
                <BoltIcon className="w-6 h-6 text-lime-500" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm">
                    Get this delivered by{' '}
                    <b>
                      {format(addBusinessDays(new Date(), 12), 'EEEE, MMMM d')}
                    </b>
                    .
                  </p>
                  <p className="text-xs">Rush options available at checkout.</p>
                </div>
              </div>

              {!variants.length ? (
                <Alert
                  title="Product out of stock"
                  description={
                    <>
                      Please{' '}
                      <Button
                        className="underline"
                        onClick={() => intercom.showNewMessage()}
                        variant="naked"
                      >
                        chat with us
                      </Button>{' '}
                      if you need assitance.
                    </>
                  }
                />
              ) : (
                <>
                  {user ? (
                    <>
                      {product.entityId ? (
                        <ProductForm
                          productEntityId={product.entityId?.toString()}
                          productId={product.id}
                          defaultColorId={activeColorId || undefined}
                          onSubmit={handleSubmit}
                          onActiveColorChange={handleActiveColorChange}
                          colors={mappedColors}
                          variants={variants}
                          requireLogin={!user}
                        />
                      ) : null}
                    </>
                  ) : (
                    <ProductFormPreview
                      minPrice={product.prices?.price.value || 0}
                      colors={mappedColors}
                      activeColorId={activeColorId}
                      onSelectColor={color =>
                        handleActiveColorChange(color.catalogProductColorId)
                      }
                      sizeRange={getSizeRange(
                        normalizeAndSortSizes(sizes.map(size => size.label)),
                      )}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductShowPageHero
