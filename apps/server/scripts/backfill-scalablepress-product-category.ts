import { ImageUrlType, PrismaClient } from '@prisma/client'
import { exit } from 'process'
import services from '../src/services'
import { notEmpty } from '../src/utils'

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
    const { products: spProducts } = await services.scalablePress
      .getCategory(spCategory.categoryId)
      .catch(e => {
        console.error(e)
        return { products: [] }
      })

    if (!spProducts?.length) {
      console.warn('No products found for category: ', spCategory.name)
      continue
    }

    console.info(
      `FOUND PRODUCTS FOR CATEGORY ${spCategory.categoryId}: `,
      spProducts.length,
    )

    for (const spProduct of spProducts) {
      const spProductDetail = await services.scalablePress
        .getProduct(spProduct.id)
        .catch(e => {
          console.error(e)
          return null
        })

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

        if (!spProductDetail.properties.brand) {
          console.warn('No brand found for product: ', spProduct.name)
          continue
        }

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
        const primaryImageCloud = spProductDetail.image.url
          ? await services.cloudinary.uploader
              .upload(spProductDetail.image.url)
              .catch(e => {
                console.error(e)
                return null
              })
          : null

        const alternativeImagesCloud = await Promise.all(
          spProductDetail.additionalImages
            ?.map(({ url }) =>
              url ? services.cloudinary.uploader.upload(url) : null,
            )
            .filter(notEmpty) || [],
        ).catch(e => {
          console.error(
            `Error uploading image for product: ${spProduct.name}`,
            { context: { error: e } },
          )
          return []
        })

        const alternativeImageData = alternativeImagesCloud.map(image => ({
          url: image.url,
          width: image.width,
          height: image.height,
          type: ImageUrlType.CLOUDINARY,
        }))

        const images = await prisma.$transaction([
          ...(primaryImageCloud
            ? [
                prisma.imageUrl.create({
                  data: {
                    url: primaryImageCloud.url,
                    width: primaryImageCloud.width,
                    height: primaryImageCloud.height,
                    type: ImageUrlType.CLOUDINARY,
                  },
                }),
              ]
            : []),
          ...alternativeImageData
            .filter(notEmpty)
            .map(data => prisma.imageUrl.create({ data })),
        ])

        const catalogProduct = await prisma.catalogProduct.create({
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
            primaryImageId: images[0]?.id,
            alternativeImages: {
              createMany: {
                data: images
                  .splice(0, 1)
                  .filter(notEmpty)
                  .map(({ id }) => ({
                    imageUrlId: id,
                  })),
              },
            },
          },
        })

        console.info('CREATED CATALOG PRODUCT: ', catalogProduct.name)
      }
      // break
    }
    // break
  }
}

start()
  .catch(e => console.error(e))
  .then(() => exit(0))
