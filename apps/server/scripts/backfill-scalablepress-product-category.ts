import { ImageUrlType, PrismaClient } from '@prisma/client'
import services from '../src/services'

const VENDOR = {
  name: 'Scalable Press',
  slug: 'scalable-press',
}

const prisma = new PrismaClient()

async function start() {
  const catalog = await prisma.catalog.findFirst()

  if (!catalog) {
    throw new Error('No catalog found')
  }

  const spCategories = await services.scalablePress.listCategories()

  if (!spCategories) {
    throw new Error('No categories found')
  }

  // if vendor, don't create new vendor
  let vendor = await prisma.vendor.findFirst({
    where: { slug: 'scalable-press' },
  })

  if (!vendor) {
    vendor = await prisma.vendor.create({
      data: { ...VENDOR, catalogId: catalog.id },
    })
  }

  console.info('FOUND CATEGORIES: ', spCategories.length)

  for (const spCategory of spCategories) {
    const { products: spProducts } = await services.scalablePress.getCategory(
      spCategory.categoryId,
    )

    if (!spProducts) {
      console.warn('No products found for category: ', spCategory.name)
      continue
    }

    console.info(
      `FOUND PRODUCTS FOR CATEGORY ${spCategory.categoryId}: `,
      spProducts.length,
    )

    for (const spProduct of spProducts) {
      const spProductDetail = await services.scalablePress.getProduct(
        spProduct.id,
      )

      if (!spProductDetail) {
        console.warn('No product detail found for product: ', spProduct.name)
        continue
      }

      // Find manufacturer
      let manufacturer = await prisma.manufacturer.findFirst({
        where: { name: spProductDetail.properties.brand },
      })

      if (!manufacturer) {
        console.info(
          'CREATING MANUFACTURER: ',
          spProductDetail.properties.brand,
        )

        manufacturer = await prisma.manufacturer.create({
          data: {
            name: spProductDetail.properties.brand,
            slug: await services.manufacturer.findUniqueSlug({
              startingSlug: spProductDetail.properties.brand,
            }),
            catalogId: catalog.id,
          },
        })
      }

      if (
        !(await prisma.catalogProduct.findFirst({
          where: { slug: spProductDetail.productId },
        }))
      ) {
        const primaryImageCloud = await services.cloudinary.uploader.upload(
          spProductDetail.image.url,
        )

        const alternativeImagesCloud = await Promise.all(
          spProductDetail.additionalImages?.map(({ url }) =>
            services.cloudinary.uploader.upload(url),
          ) || [],
        )

        await prisma.catalogProduct.create({
          include: {
            primaryImage: true,
          },
          data: {
            name: spProductDetail.name,

            slug: await services.catalogProduct.findUniqueSlug({
              startingSlug: spProductDetail.productId,
            }),
            catalogId: catalog.id,
            manufacturerId: manufacturer.id,
            primaryVendorId: vendor.id,
            active: spProductDetail.available,

            // primaryImage: {
            //   create: {
            //     url: primaryImageCloud.url,
            //     width: primaryImageCloud.width,
            //     height: primaryImageCloud.height,
            //     type: ImageUrlType.CLOUDINARY,
            //   },
            // },
            alternativeImages: {
              create: alternativeImagesCloud.map(({ url, width, height }) => ({
                imageUrl: {
                  create: {
                    url,
                    width,
                    height,
                    type: ImageUrlType.CLOUDINARY,
                  },
                },
              })),
            },
          },
        })
      }
      break
    }
    break
  }
}

start()
