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
import makeLogger from '../../telemetry/logger'
import chunkArray from '../../utils/chunk-array'
import { BigCommerceProductImage } from '../../sdk/bigcommerce/types'
import makeFilenameFromImageUrl from '../../sdk/bigcommerce/utils/make-filename-from-image-url'
import makeGetCustomFieldsFromBigCommerceCategories from './make-get-custom-fields-from-big-commerce-categories'

const sdks = makeSdks()
const logger = makeLogger()

/**
 * Maps a SS Activewear category IDs to corresponding BigCommerce category IDs.
 */
const getBigCommerceCategoryIds = (
  product: SsActivewearProduct,
  categoriesMap: SsCategoryMap,
) =>
  product.categoryIds
    .map(categoryId => categoriesMap.get(categoryId.toString()))
    .filter((id): id is number => Number.isInteger(id))

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

  const p = ssactivewearProducts.filter(
    product => product.title === 'Unisex Jersey Short Sleeve Tee',
  )

  const chunkedProducts = chunkArray(p, 100)

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

      if (bigCProduct) {
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

          const currentUrl = makeProductUrl({
            brandName: product.brandName,
            name: product.title,
          })

          await sdks.bigCommerce.updateProduct({
            customFields,
            metadata: [
              {
                ...(displayNameMetadataId ? { id: displayNameMetadataId } : {}),
                key: 'display_name',
                value: product.title,
                namespace: 'main',
                permission_set: 'write_and_sf_access',
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
            description: product.description,
            sku: product.styleName, // TODO: Figure out better SKU than Style name which may not always be unique
            categoryIds: categoryIds,
            brandName: product.brandName,
            inventoryTracking: 'variant',
            availability: 'available',
            images: imagesToCreate,
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
