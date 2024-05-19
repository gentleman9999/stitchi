import type { BigCommerceProductVariant } from '../types'
import makeBigCommerceRepository, { BigCommerceRepository } from '../repository'
import { BatchUpdateProductVariantsInput } from '../repository/product-variant/batch-update'
import makeFilenameFromSSImageUrl from '../utils/make-filename-from-image-url'
import chunkArray from '../../../utils/chunk-array'
import makeFilenameFromBigCImageUrl from '../utils/make-filename-from-bigc-url'

type VariantInput = BatchUpdateProductVariantsInput['variants'][number]

export interface BatchUpdateProductVariantsFnInput {
  productId: number
  variants: (VariantInput & {
    primaryImageUrl?: string | null
    secondaryImageUrls?: string[]
  })[]
}

export type BatchUpdateProductVariantsFn = (
  input: BatchUpdateProductVariantsFnInput,
) => Promise<BigCommerceProductVariant[]>

interface Config {
  repository: BigCommerceRepository
}

const makeBatchUpdateProductVariantsFn =
  (
    { repository }: Config = {
      repository: makeBigCommerceRepository(),
    },
  ): BatchUpdateProductVariantsFn =>
  async input => {
    let updatedVariants

    try {
      updatedVariants = await repository.batchUpdateProductVariants({
        productId: input.productId,
        variants: input.variants.map(variant => {
          // Remove the image from the variant input
          const { primaryImageUrl, secondaryImageUrls, ...rest } = variant

          return rest
        }),
      })
    } catch (error) {
      console.error('Error updating product variants', {
        context: { error },
      })

      throw error
    }

    const createdPrimaryImageSSUrls: string[] = []

    const variantPrimaryImageUpdatePromises = updatedVariants.map(
      async bigCommerceVariant => {
        const { primaryImageUrl } =
          input.variants.find(
            variant =>
              ('id' in variant && variant.id === bigCommerceVariant.id) ||
              ('sku' in variant && variant.sku === bigCommerceVariant.sku),
          ) || {}

        if (primaryImageUrl) {
          try {
            await repository.updateProductVariantImage({
              variantId: bigCommerceVariant.id,
              productId: bigCommerceVariant.productId,
              imageUrl: primaryImageUrl,
            })
            const ssUrl = makeFilenameFromSSImageUrl(primaryImageUrl)

            if (ssUrl) {
              createdPrimaryImageSSUrls.push(ssUrl)
            }
          } catch (error) {
            console.error('Error creating product variant image', {
              context: { error },
            })
          }
        }
      },
    )

    const variantPrimaryImageUpdatePromiseChunks = chunkArray(
      variantPrimaryImageUpdatePromises,
      50,
    )

    for (const chunk of variantPrimaryImageUpdatePromiseChunks) {
      await Promise.all(chunk)
    }

    // Ensure we remove duplicates, since multiple variants can have the same image
    const secondaryImages = Array.from(
      new Set(
        input.variants
          .map(variant => variant.secondaryImageUrls)
          .flat()
          .filter((url): url is string => Boolean(url)),
      ),
    )

    // Make sure the product variant has an image
    let existingProductImages

    try {
      const { images } = await repository.listProductImages({
        productId: input.productId,
        filter: {
          limit: 1000,
          page: 1,
        },
      })

      existingProductImages = images
    } catch (error) {
      console.error('Error fetching product images', {
        context: { error },
      })

      throw error
    }

    const copiedExistingProductImages = [...existingProductImages]

    const productImagesToDelete = copiedExistingProductImages.filter(image => {
      const bigCImageFilename = makeFilenameFromBigCImageUrl(image.imageFile)

      return (
        bigCImageFilename &&
        createdPrimaryImageSSUrls.includes(bigCImageFilename)
      )
    })

    for (const image of productImagesToDelete) {
      repository.deletedProductImage({
        imageId: image.id,
        productId: input.productId,
      })
    }

    const productImagesToCreate = secondaryImages.filter(imageUrl => {
      const fileName = makeFilenameFromSSImageUrl(imageUrl)

      return (
        fileName &&
        !copiedExistingProductImages?.some(
          existingImage =>
            makeFilenameFromBigCImageUrl(existingImage.imageFile) === fileName,
        )
      )
    })

    try {
      await repository.updateProduct({
        id: input.productId,
        images: productImagesToCreate.map(imageUrl => ({
          imageUrl,
          isThumbnail: false,
        })),
      })
    } catch (error) {
      console.error('Error updating product images', {
        context: { error },
      })

      throw error
    }

    return updatedVariants
  }

export default makeBatchUpdateProductVariantsFn
