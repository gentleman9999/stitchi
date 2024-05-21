import process from 'process'
import makeSdks, { BigCommerceProduct, SsActivewearProduct } from '../../sdk'
import generateSummary from './generate-summary'
import env from '../../environment'
import makeUniqueProductName from '../../sdk/bigcommerce/utils/make-unique-product-name'
import { makeProductUrl } from '../../sdk/bigcommerce/utils/make-product-url'
import fetchAndMapCategories, {
  SsCategoryMap,
} from './fetch-and-map-categories'
import fetchAndMapStyleMetadata from './fetch-and-map-style-metadata'
import { getAvailPrintingMethods } from './get-avail-printing-methods'
import makeLogger from '../../telemetry/logger'
import chunkArray from '../../utils/chunk-array'
import {
  BigCommerceProductImage,
  BigCommerceProductVariant,
} from '../../sdk/bigcommerce/types'
import makeFilenameFromImageUrl from '../../sdk/bigcommerce/utils/make-filename-from-image-url'
import makeGetCustomFieldsFromBigCommerceCategories from './make-get-custom-fields-from-big-commerce-categories'
import { isFeaturedBrand } from './is-featured-brand'

const sdks = makeSdks()
const logger = makeLogger()

/**
 * Maps a SS Activewear category IDs to corresponding BigCommerce category IDs.
 */
const getBigCommerceCategoryIds = (
  product: SsActivewearProduct,
  categoriesMap: SsCategoryMap,
) => {
  const bigCCategoryIds = product.categoryIds
    .map(categoryId => categoriesMap.get(categoryId.toString()))
    .filter((id): id is number => Number.isInteger(id))

  const SHORT_SLEEVE_ID = 57
  const LONG_SLEEVE_ID = 56
  const T_SHIRT_ID = 21

  if (product.categoryIds.includes(T_SHIRT_ID)) {
    if (
      product.categoryIds.includes(SHORT_SLEEVE_ID) &&
      env.BIGC_CATEGORY_SHORT_SLEEVE_T_SHIRTS
    ) {
      bigCCategoryIds.push(Number(env.BIGC_CATEGORY_SHORT_SLEEVE_T_SHIRTS))
    }

    if (product.categoryIds.includes(LONG_SLEEVE_ID)) {
      bigCCategoryIds.push(Number(env.BIGC_CATEGORY_LONG_SLEEVE_T_SHIRTS))
    }
  }

  return bigCCategoryIds
}

/**
 * This script will create or update products in BigCommerce for each product in SSActivewear.
 * It will also add metadata to each product in BigCommerce with the SSActivewear product ID.
 * This script is idempotent, so it can be run multiple times without duplicating products.
 */
const start = async () => {
  logger.info('Starting product sync...\n')

  const metadataMap = await fetchAndMapStyleMetadata({
    bigCommerce: sdks.bigCommerce,
  })

  logger.info(`Metadata mapping complete. \n`)

  const ssactivewearProducts = await sdks.ssactivewear.listProducts()

  logger.info(
    `Fetched ${ssactivewearProducts.length} products from SS Activewear. \n`,
  )

  logger.info(
    'CONFIG:\n - Create New Products: true \n - Update Existing Products: true \n',
  )

  const mode = process.env.MODE

  if (!mode || !['create', 'update', 'all'].includes(mode)) {
    logger.error(
      'Invalid mode. Please provide a valid mode: create, update, all',
    )
    process.exit(1)
  }

  let productsToCreateCount = 0
  let createdProductsCount = 0
  let erroredCreatedProductsCount = 0

  let productsToUpdateCount = 0
  let updatedProductsCount = 0
  let erroredUpdatedProductsCount = 0

  const allBigCommerceCategories = await sdks.bigCommerce.listCategories()

  allBigCommerceCategories.map(c => c.name)

  const categoriesMap = await fetchAndMapCategories({
    bigCommerceCategories: allBigCommerceCategories,
  })

  logger.info(`Categories mapping complete. \n`)

  const getCustomFieldsFromBigCommerceCategories =
    makeGetCustomFieldsFromBigCommerceCategories(allBigCommerceCategories)

  const chunkedProducts = chunkArray(ssactivewearProducts, 100)

  for (const productChunk of chunkedProducts) {
    const productPromises = productChunk.map(async product => {
      const productSkuMetadata = metadataMap.get(product.styleId.toString())

      let bigCProduct: BigCommerceProduct | null = null

      if (productSkuMetadata?.resourceId) {
        try {
          bigCProduct = await sdks.bigCommerce.getProduct(
            {
              productId: productSkuMetadata.resourceId,
            },
            {
              include: ['metadata', 'custom_fields', 'images'],
            },
          )
        } catch (error) {
          // Treat product as not found
        }
      }

      if (!bigCProduct) {
        try {
          bigCProduct = await sdks.bigCommerce.getProductBySku(
            product.styleName,
            {
              include: ['metadata', 'custom_fields', 'images'],
            },
          )
        } catch (error) {
          // Treat product as not found
        }
      }

      const categoryIds = getBigCommerceCategoryIds(product, categoriesMap)

      const customFields = getCustomFieldsFromBigCommerceCategories(
        categoryIds,
        bigCProduct?.customFields || [],
      )

      const supportedPrintingMethods = await getAvailPrintingMethods(categoryIds, product.title)

      if (bigCProduct) {
        if (!['update', 'all'].includes(mode)) {
          logger.info(`Skipping update for product ${product.title}. \n`)
          return
        }

        productsToUpdateCount++

        try {
          let existingProductImages: BigCommerceProductImage[] = []

          let page = 1
          let hasNextPage = true

          while (hasNextPage) {
            const { images, pagination } =
              await sdks.bigCommerce.listProductImages({
                productId: bigCProduct.id,
                filter: {
                  limit: 250,
                  page,
                },
              })

            existingProductImages.push(...images)
            hasNextPage = pagination.hasNextPage
            page++
          }

          page = 1
          hasNextPage = true

          const productVariants: BigCommerceProductVariant[] = []

          while (hasNextPage) {
            const { productVariants: response, hasNextPage: next } =
              await sdks.bigCommerce.listProductVariants({
                productId: bigCProduct.id,
                limit: 250,
                page,
              })

            productVariants.push(...response)
            hasNextPage = next
            page++
          }

          const minVariantPrice = productVariants.reduce((min, variant) => {
            if (variant.price === null) {
              return min
            }

            if (min === 0) {
              return variant.price
            }

            return Math.min(min, variant.price)
          }, 0)

          const imageInput = product.styleImage
            ? [
                {
                  imageUrl: `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${product.styleImage}`,
                  isThumbnail: true,
                },
              ]
            : null

          // Get all existing images. Create any missing ones.
          const imagesToCreate =
            imageInput?.filter(image => {
              const fileName = makeFilenameFromImageUrl(image.imageUrl)

              return (
                fileName &&
                !existingProductImages?.some(existingImage =>
                  existingImage.imageFile.includes(fileName),
                )
              )
            }) || []

          const displayNameMetadataId = bigCProduct.metadata?.find(
            data => data.key === 'display_name',
          )?.id

          const styledIdMetadataId = bigCProduct.metadata?.find(
            data => data.key === 'style_id',
          )?.id

          const sourceMetadataId = bigCProduct.metadata?.find(
            data => data.key === 'source',
          )?.id

          const currentUrl = makeProductUrl({
            brandName: product.brandName,
            name: product.title,
          })

          await sdks.bigCommerce.updateProduct({
            customFields,
            // BigCommerce requires the parent product to have a price if we want to filter by price.
            // It cannot use the variant's prices to filter.
            price: minVariantPrice,
            metadata: [
              {
                ...(displayNameMetadataId ? { id: displayNameMetadataId } : {}),
                key: 'display_name',
                value: product.title,
                namespace: 'main',
                permission_set: 'write_and_sf_access',
              },
              {
                ...(styledIdMetadataId ? { id: styledIdMetadataId } : {}),
                key: 'style_id',
                value: product.styleId.toString(),
                namespace: 'main',
                permission_set: 'write',
              },
              {
                ...(sourceMetadataId ? { id: sourceMetadataId } : {}),
                key: 'source',
                value: 'ss-activewear',
                namespace: 'main',
                permission_set: 'write',
              },
              {
                key: 'avail_printing_methods',
                value: supportedPrintingMethods.join(', '),
                namespace: 'main',
                permission_set: 'write',
              },
            ],
            id: bigCProduct.id,
            visible: true,
            name: makeUniqueProductName({
              name: product.title,
              brandName: product.brandName,
              sku: product.styleName,
            }),
            url: currentUrl !== bigCProduct.url ? currentUrl : undefined,
            // DON'T update description - we generate these with another script
            // description: product.description,
            sku: product.styleName, // TODO: Figure out better SKU than Style name which may not always be unique
            categoryIds: categoryIds,
            brandName: product.brandName,
            inventoryTracking: 'variant',
            // If no variants, set availability to 'disabled' [product with 1 variant is parent]
            availability: productVariants.length > 1 ? 'available' : 'disabled',
            images: imagesToCreate,
            sortOrder:
              isFeaturedBrand(product.brandName) && bigCProduct.sortOrder > -1
                ? -1
                : undefined,
          })

          logger.info(
            `Updated product ${product.title} (${product.styleName}) in BigCommerce. \n`,
          )

          updatedProductsCount++
        } catch (error) {
          logger.error('Failed to update product', {
            context: { error, product },
          })
          erroredUpdatedProductsCount++
        }
      } else {
        if (!['create', 'all'].includes(mode)) {
          logger.info(`Skipping create for product ${product.title}. \n`)
          return
        }

        productsToCreateCount++
        try {
          await sdks.bigCommerce.createProduct({
            customFields,
            visible: true,
            name: makeUniqueProductName({
              brandName: product.brandName,
              name: product.title,
              sku: product.styleName,
            }),
            url: makeProductUrl({
              brandName: product.brandName,
              name: product.title,
            }),
            description: product.description || '',
            sku: product.styleName, // TODO: Figure out better SKU than Style name which may not always be unique
            categoryIds: categoryIds,
            brandName: product.brandName,
            inventoryTracking: 'variant',
            availability: 'available',
            sortOrder: isFeaturedBrand(product.brandName) ? -1 : undefined,
            images: product.styleImage
              ? [
                  {
                    imageUrl: `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${product.styleImage}`,
                    isThumbnail: true,
                  },
                ]
              : null,
            metadata: [
              {
                key: 'style_id',
                value: product.styleId.toString(),
                namespace: 'main',
                permission_set: 'write',
              },
              {
                key: 'source',
                value: 'ss-activewear',
                namespace: 'main',
                permission_set: 'write',
              },
              {
                key: 'display_name',
                value: product.title,
                namespace: 'main',
                permission_set: 'write_and_sf_access',
              },
              {
                key: 'avail_printing_methods',
                value: supportedPrintingMethods.join(', '),
                namespace: 'main',
                permission_set: 'write',
              },
            ],
          })
          logger.info(
            `Created product ${product.title} (${product.styleName}) in BigCommerce. \n`,
          )
          createdProductsCount++
        } catch (error) {
          logger.error('Error creating product', {
            context: { error, product },
          })
          erroredCreatedProductsCount++
        }
      }
    })

    await Promise.allSettled(productPromises)
  }

  generateSummary({
    createdProductsCount,
    updatedProductsCount,
    erroredCreatedProductsCount,
    erroredUpdatedProductsCount,
    productsToCreateCount: productsToCreateCount,
    productsToUpdateCount: productsToUpdateCount,
  })
}

start()
  .catch(err => {
    logger.error('Unhandled error in start function:', err)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
