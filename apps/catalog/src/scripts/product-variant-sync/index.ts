import makeSdks, { BigCommerceProduct } from '../../sdk'
import chunkArray from '../../utils/chunk-array'
import { updateProductVariants } from './update-product-variants'
import generateSummary from './generate-summary'

const { bigCommerce, ssactivewear } = makeSdks()

/**
 * This script will sync product variants from SS Activewear to BigCommerce.
 * This script is idempotent, so it can be run multiple times without duplicating product variants.
 */
const start = async () => {
  console.info('Starting product variant sync...\n')

  // const variants = await ssactivewear.listProductVariants()

  // const variantMap = new Map<string, number>()

  // for (const variant of variants) {
  //   const existing = variantMap.get(variant.sku) || 0

  //   variantMap.set(variant.sku, existing + 1)
  // }

  // console.log(
  //   'VARIANTS THAT HAVE DUPLICATE SKUS',
  //   Array.from(variantMap)
  //     .filter(([_, count]) => count > 1)
  //     .map(([sku, count]) => ({ sku, count })),
  // )

  // return

  const ssActivewearProductVariants = await ssactivewear.listProductVariants()

  const successfulProducts: BigCommerceProduct[] = []
  const erroredProducts: BigCommerceProduct[] = []

  let productListPage = 1
  let productListHasNextPage = true

  while (productListHasNextPage) {
    let products: BigCommerceProduct[] = []

    try {
      const response = await bigCommerce.listProducts(
        {
          limit: 50,
          page: productListPage,
        },
        {
          includeMetadata: true,
          includeCustomFields: true,
        },
      )

      products = response.products
      productListHasNextPage = response.hasNextPage
      productListPage++
    } catch (error) {
      console.error('Error fetching products from BigCommerce', {
        context: { error },
      })

      break
    }

    // products = [
    //   await bigCommerce.getProduct(
    //     { productId: 1764 },
    //     { include: ['metadata', 'custom_fields'] },
    //   ),
    // ]

    const BATCH_SIZE = 25

    const productBatches = chunkArray(products, BATCH_SIZE)

    for (let i = 0; i < productBatches.length; i++) {
      const batch = productBatches[i]

      const productUpdatePromises = batch.map(async product => {
        try {
          await updateProductVariants(
            {
              bigCommerceProduct: product,
              allSsActivewearProductVariants: ssActivewearProductVariants,
            },
            {
              ssactivewear,
              bigCommerce,
            },
          )

          successfulProducts.push(product)
        } catch (error) {
          erroredProducts.push(product)

          console.error('Error updating product', {
            context: { error },
          })
        }
      })

      try {
        await Promise.all(productUpdatePromises)
      } catch (error) {
        console.error('Error updating products', {
          context: { error },
        })
      }
    }
  }

  generateSummary({
    erroredProductsCount: erroredProducts.length,
    successfulProductsCount: successfulProducts.length,
  })
}

start()
  .catch(err => {
    console.error('Unhandled error in start function:', err)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
