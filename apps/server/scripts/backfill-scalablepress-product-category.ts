import { PrismaClient } from '@prisma/client'
import services from '../src/services'

const prisma = new PrismaClient()

async function start() {
  const categories = await services.scalablePress.listCategories()

  console.info('FOUND CATEGORIES: ', categories.length)

  for (const category of categories) {
    const { products } = await services.scalablePress.getCategory(
      category.categoryId,
    )

    console.info(
      `FOUND PRODUCTS FOR CATEGORY ${category.categoryId}: `,
      products.length,
    )

    for (const product of products) {
      const productDetail = await services.scalablePress.getProduct(product.id)

      console.log('PRODUCT DETAIL', productDetail)
      break
    }
    break
  }
}

start()
