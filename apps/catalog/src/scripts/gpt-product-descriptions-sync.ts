import chalk from 'chalk'
import process from 'process'
import makeSdks from '../sdk'
import chunkArray from '../utils/chunk-array'
import { notEmpty } from '../utils/typescript'
import { BigCommerceBrand, BigCommerceProduct } from '../sdk/bigcommerce/types'
import { BatchCreateProductMetadataInput } from '../sdk/bigcommerce/repository/product-metadata/batch-create'
import { BatchUpdateProductMetadataInput } from '../sdk/bigcommerce/repository/product-metadata/batch-update'
import makeLogger from '../telemetry/logger'
import env from '../environment'
import Table from 'cli-table'

const sdks = makeSdks()
const logger = makeLogger()

/**
 * This script is used to update default product descriptions in BigCommerce with GPT-optimized descriptions.
 * If we've previously created a GPT-optimized description, we should not overwrite it.
 */
const start = async () => {
  logger.info(chalk.green('Starting product GPT description sync... \n'))

  const bigCommerceCategories = await sdks.bigCommerce.listCategories()
  const ssactivewearProducts = await sdks.ssactivewear.listProducts()

  const updatedProducts: BigCommerceProduct[] = []
  const skippedProducts: BigCommerceProduct[] = []
  const failedProducts: BigCommerceProduct[] = []

  const brands: BigCommerceBrand[] = []

  let hasNextPage = true
  let page = 1

  while (hasNextPage) {
    const { brands: fetchedBrands, pagination } =
      await sdks.bigCommerce.listBrands({
        page,
        limit: 250,
      })

    brands.push(...fetchedBrands)
    hasNextPage = pagination.hasNextPage
    page++
  }

  page = 1
  hasNextPage = true

  while (hasNextPage) {
    const { products, hasNextPage: next } = await sdks.bigCommerce.listProducts(
      {
        page,
        limit: 250,
      },
      { includeMetadata: true, includeCustomFields: true },
    )

    hasNextPage = next
    page++

    const chunkedProducts = chunkArray(products, 50)

    for (const productChunk of chunkedProducts) {
      const productPromises = productChunk.map(async product => {
        let updatedDescription

        const updatedAtField = product.metadata?.find(
          field => field.key === 'updated_description_at',
        )

        if (updatedAtField && env.SKIP_UPDATING_EXISTING_AI_DESCRIPTIONS) {
          logger.info(
            `Product ${product.name} already has an updated description. Skipping.`,
          )

          skippedProducts.push(product)

          return
        }

        const categories = product.categoryIds
          .map(categoryId => {
            const category = bigCommerceCategories.find(
              category => category.id === categoryId,
            )

            return category?.name
          })
          .filter(notEmpty)

        const brand = brands.find(brand => brand.id === product.brandId)

        const ssActivewearProduct = ssactivewearProducts.find(
          ssProduct =>
            ssProduct.styleId.toString() === product.metadataMap?.styleId,
        )

        if (!ssActivewearProduct) {
          // If we don't have the base description, we should avoid using AI to update
          logger
            .child({ product })
            .error(`Could not find SS Activewear product for ${product.name}`)

          skippedProducts.push(product)

          return
        }

        try {
          updatedDescription = await sdks.ai.generateProductDescription({
            name: product.name.split('[')[0],
            brand: brand?.name || '',
            categories: categories,
            description: ssActivewearProduct.description || '',
          })
        } catch (error) {
          logger
            .child({
              error,
              product,
            })
            .error(`Error generating description for ${product.name}`)

          failedProducts.push(product)

          return
        }

        const originalDescriptionField = product.metadata?.find(
          field => field.key === 'original_description',
        )

        const metadata:
          | BatchCreateProductMetadataInput['metadata']
          | BatchUpdateProductMetadataInput['metadata'] = [
          {
            ...(updatedAtField?.id && { id: updatedAtField.id }),
            key: 'updated_description_at',
            value: new Date().toISOString(),
            namespace: 'main',
            permission_set: 'write_and_sf_access',
          } as const,
        ]

        if (!originalDescriptionField && ssActivewearProduct.description) {
          // Only set the original description if it doesn't already exist
          metadata.push({
            key: 'original_description',
            value: ssActivewearProduct.description || '',
            namespace: 'main',
            permission_set: 'write_and_sf_access',
          } as const)
        }

        let updatedProduct

        logger.info(`Updating description for ${product.name}...`)

        try {
          updatedProduct = await sdks.bigCommerce.updateProduct({
            metadata,
            id: product.id,
            description: updatedDescription,
          })

          updatedProducts.push(updatedProduct)
        } catch (error) {
          logger
            .child({ error, product })
            .error(`Error updating description for ${product.name}`)

          failedProducts.push(product)
        }
      })

      await Promise.allSettled(productPromises)
    }
  }

  const table = new Table({
    head: ['Action', 'Count'],
    rows: [
      ['Products updated', updatedProducts.length.toString()],
      ['Products skipped', skippedProducts.length.toString()],
      ['Products failed', failedProducts.length.toString()],
    ],
  })

  logger.info(`
    ***********************************************\n
                   SYNC SUMMARY\n
    ***********************************************\n
    ${table.toString()}\n
    ***********************************************\n
  `)
}

start()
  .catch(err => {
    logger.error(err)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
