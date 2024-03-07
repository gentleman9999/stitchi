import process from 'process'
import chalk from 'chalk'
import makeSdks from '../sdk'
import chunkArray from '../utils/chunk-array'

const sdks = makeSdks()

/**
 * This script will create categories in BigCommerce for each category in SSActivewear.
 * It will also add metadata to each category in BigCommerce with the SSActivewear category ID.
 * This script is idempotent, so it can be run multiple times without duplicating categories.
 * This script will not update existing categories in BigCommerce (i.e. name).
 * This script will not delete categories in BigCommerce that do not exist in SSActivewear.
 */
const start = async () => {
  console.info(chalk.green('Starting category sync... \n'))
  console.info(
    chalk.yellow(
      'CONFIG:\n - Create New Categories: true \n - Update Existing Categories: false \n',
    ),
  )

  const ssactivewearCategories = await sdks.ssactivewear.listCategories()

  const bigCommerceCategories = await sdks.bigCommerce.listCategories()

  let ssCategoriesToCreate: typeof ssactivewearCategories = []

  for (const ssCategory of ssactivewearCategories) {
    const existingBigCCategory = bigCommerceCategories.find(
      category =>
        category.metadata?.ssActivewearCategoryId === ssCategory.id.toString(),
    )

    if (!existingBigCCategory) {
      ssCategoriesToCreate.push(ssCategory)
    }
  }

  console.info(
    chalk.green(
      `Found ${ssCategoriesToCreate.length} categories to create in BigCommerce:\n`,
      ssCategoriesToCreate.map(c => c.name).join(',\n'),
    ),
  )

  const chunkedBigCommerceCategoriesToCreate = chunkArray(
    ssCategoriesToCreate,
    // We can't chunk these without hitting rate limits
    1,
  )

  let createdCategoriesCount = 0
  let erroredCategoriesCount = 0

  for (const categoriesChunk of chunkedBigCommerceCategoriesToCreate) {
    const createCategoryPromises = categoriesChunk.map(async category => {
      try {
        const newCategory = await sdks.bigCommerce.createCategory({
          name: category.name,
          metadata: {
            ssactivewearCategoryId: category.id.toString(),
          },
        })
        createdCategoriesCount++
        return newCategory
      } catch (error) {
        console.error('Error creating category', {
          context: { error },
        })
        erroredCategoriesCount++
        return null
      }
    })

    await Promise.allSettled(createCategoryPromises)

    console.info(
      chalk.green(
        `Created ${createdCategoriesCount}/${ssCategoriesToCreate.length} categories in BigCommerce...`,
      ),
    )
  }

  console.info('Completed creating categories in BigCommerce... \n')

  console.info(
    chalk.greenBright(
      `Created ${createdCategoriesCount}/${ssCategoriesToCreate.length} categories in BigCommerce...`,
    ),
  )

  console.info(
    chalk.redBright(
      `Errored on ${erroredCategoriesCount}/${ssCategoriesToCreate.length} categories...`,
    ),
  )
}

start()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .then(() => {
    process.exit(0)
  })
