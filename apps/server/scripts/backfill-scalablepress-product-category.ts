export {}
// import { ColorCategory, ImageType, PrismaClient, Size } from '@prisma/client'
// import { exit } from 'process'
// import slugify from 'slugify'
// import services from '../src/services'
// import { notEmpty } from '../src/utils'

// const VENDOR = {
//   name: 'Scalable Press',
//   slug: 'scalable-press',
// }

// const prisma = new PrismaClient()

// async function start() {
//   const catalog = await prisma.catalog.findFirst()

//   if (!catalog) {
//     throw new Error('No catalog found')
//   }

//   const spCategories = await services.scalablePress.listCategories()

//   if (!spCategories) {
//     throw new Error('No categories found')
//   }

//   // if vendor, don't create new vendor
//   let vendor = await prisma.vendor.findFirst({
//     where: { slug: VENDOR.slug },
//   })

//   if (!vendor) {
//     vendor = await prisma.vendor.create({
//       data: { ...VENDOR, catalogId: catalog.id },
//     })
//   }

//   console.info('FOUND CATEGORIES: ', spCategories.length)

//   for (const spCategory of spCategories) {
//     const { products: spProducts } = await services.scalablePress
//       .getCategory(spCategory.categoryId)
//       .catch(e => {
//         console.error(e)
//         return { products: [] }
//       })

//     // Only import categories that contain products
//     if (!spProducts?.length) {
//       console.warn('No products found for category: ', spCategory.name)
//       continue
//     }

//     console.info(
//       `FOUND PRODUCTS FOR CATEGORY ${spCategory.categoryId}: `,
//       spProducts.length,
//     )

//     const categoryType = spCategory.type
//       ? await prisma.category.upsert({
//           where: {
//             catalogId_slug: {
//               slug: slugify(spCategory.type),
//               catalogId: catalog.id,
//             },
//           },
//           create: {
//             name: spCategory.type,
//             slug: await services.catalog.category.findUniqueSlug({
//               startingSlug: spCategory.type,
//             }),
//             catalogId: catalog.id,
//           },
//           update: {},
//         })
//       : null

//     const categoryFamily = spCategory.family
//       ? await prisma.category.upsert({
//           where: {
//             catalogId_slug: {
//               slug: slugify(spCategory.family),
//               catalogId: catalog.id,
//             },
//           },
//           create: {
//             name: spCategory.family,
//             slug: await services.catalog.category.findUniqueSlug({
//               startingSlug: spCategory.family,
//             }),
//             catalogId: catalog.id,
//             parentCategoryId: categoryType?.id,
//           },
//           update: {},
//         })
//       : null

//     const category = await prisma.category.upsert({
//       where: {
//         catalogId_slug: {
//           catalogId: catalog.id,
//           slug: spCategory.categoryId,
//         },
//       },
//       create: {
//         name: spCategory.name,
//         slug: await services.catalog.category.findUniqueSlug({
//           startingSlug: spCategory.categoryId,
//         }),
//         catalogId: catalog.id,
//         parentCategoryId: categoryFamily?.id || categoryType?.id,
//       },
//       update: {},
//     })

//     for (const spProduct of spProducts) {
//       const spProductDetail = await services.scalablePress
//         .getProduct(spProduct.id)
//         .catch(e => {
//           console.error(e)
//           return null
//         })

//       if (!spProductDetail) {
//         console.warn('No product detail found for product: ', spProduct.name)
//         continue
//       }

//       // Find or create manufacturer
//       if (!spProductDetail.properties.brand) {
//         console.warn('No manufacture found for product: ', spProduct.name)
//         continue
//       }

//       const manufacturer = await prisma.manufacturer.upsert({
//         where: {
//           catalogId_slug: {
//             catalogId: catalog.id,
//             slug: slugify(spProductDetail.properties.brand),
//           },
//         },
//         create: {
//           name: spProductDetail.properties.brand,
//           slug: await services.catalog.manufacturer.findUniqueSlug({
//             startingSlug: spProductDetail.properties.brand,
//           }),
//           catalogId: catalog.id,
//         },
//         update: {},
//       })

//       if (
//         !(await prisma.material.findFirst({
//           where: { slug: spProductDetail.productId },
//         }))
//       ) {
//         const materialVariants = await services.scalablePress
//           .getProductVariants(spProductDetail.productId)
//           .catch(e => {
//             console.error(e)

//             return null
//           })

//         if (!materialVariants?.length) {
//           console.warn(
//             'No material variants found for product: ',
//             spProduct.name,
//           )
//           continue
//         }

//         const hydratedMaterialVariants = materialVariants
//           .map(variant => {
//             const matchingColor = spProductDetail.colors?.find(
//               color =>
//                 color.name.toLowerCase() === variant.colorId?.toLowerCase(),
//             )

//             if (matchingColor) {
//               return {
//                 ...variant,
//                 ...matchingColor,
//               }
//             }
//           })
//           .filter(notEmpty)

//         if (!hydratedMaterialVariants.length) {
//           console.warn(
//             'No hydrated material variants found for product: ',
//             spProduct.name,
//           )
//           continue
//         }

//         const imageCloud = spProductDetail.image.url
//           ? await services.cloudinary.uploader
//               .upload(spProductDetail.image.url)
//               .catch(e => {
//                 console.error(e)
//                 return null
//               })
//           : null

//         const materialVariantImage = imageCloud
//           ? await prisma.image.create({
//               data: {
//                 url: imageCloud.url,
//                 width: imageCloud.width,
//                 height: imageCloud.height,
//                 type: ImageType.CLOUDINARY,
//               },
//             })
//           : null

//         const material = await prisma.material.create({
//           data: {
//             name: spProductDetail.name,
//             slug: await services.catalog.material.findUniqueSlug({
//               startingSlug: spProductDetail.productId,
//             }),
//             active: spProductDetail.available,
//             materialDescription: spProductDetail.properties.material,
//             manufacturerStyleName: spProductDetail.properties.style,
//             catalogId: catalog.id,
//             manufacturerId: manufacturer.id,
//             primaryVendorId: vendor.id,
//             imageFileId: materialVariantImage?.id,
//             materialCategories: {
//               create: {
//                 categoryId: category.id,
//               },
//             },
//           },
//         })

//         console.info('CREATED MATERIAL: ', material.name)

//         // Create material variants (Scalable Press "colors")
//         for (const variant of hydratedMaterialVariants) {
//           if (!variant.gtin) {
//             console.warn('No GTIN found for variant: ', variant.name)
//             continue
//           }

//           // CHECK IF VARIANT ALREADY EXISTS, SKIP IF SO
//           if (
//             await prisma.materialVariant.findFirst({
//               where: {
//                 materialId: material.id,
//                 // Using GTIN as unique identifier bc Scalable Press doesn't have another unique identifier for product variants
//                 gtin: variant.gtin,
//               },
//             })
//           ) {
//             console.info('VARIANT ALREADY EXISTS: ', variant.name)
//             continue
//           }
//           // FIND OR CREATE COLOR CATEGORY
//           const colorCategory = variant.class
//             ? await prisma.colorCategory.upsert({
//                 where: {
//                   catalogId_name: {
//                     catalogId: catalog.id,
//                     name: variant.class,
//                   },
//                 },
//                 create: {
//                   name: variant.class,
//                   catalogId: catalog.id,
//                 },
//                 update: {},
//               })
//             : null

//           // CREATE UNIQUE COLOR
//           const color = await prisma.color.create({
//             data: {
//               name: variant.colorId,
//               hex: variant.hex,
//               colorCategoryId: colorCategory?.id,
//               catalogId: catalog.id,
//             },
//           })

//           // FIND OR CREATE SIZE
//           const size = variant.sizeId
//             ? await prisma.size.upsert({
//                 where: {
//                   catalogId_value: {
//                     catalogId: catalog.id,
//                     value: variant.sizeId,
//                   },
//                 },
//                 create: {
//                   value: variant.sizeId,
//                   catalogId: catalog.id,
//                 },
//                 update: {},
//               })
//             : null

//           const variantImagesCloud = await Promise.all(
//             variant.images
//               ?.map(({ url }) =>
//                 url ? services.cloudinary.uploader.upload(url) : null,
//               )
//               .filter(notEmpty) || [],
//           ).catch(e => {
//             console.error(
//               `Error uploading image for product: ${spProduct.name}`,
//               { context: { error: e } },
//             )
//             return []
//           })

//           const imageData = variantImagesCloud.map(image => ({
//             url: image.url,
//             width: image.width,
//             height: image.height,
//             type: ImageType.CLOUDINARY,
//           }))

//           const imageRecords = await Promise.all(
//             imageData.map(data => prisma.image.create({ data })),
//           ).catch(e => {
//             console.error(
//               `Error creating image records for product: ${spProduct.name}`,
//               { context: { error: e } },
//             )
//             return []
//           })

//           const materialVariant = await prisma.materialVariant.create({
//             data: {
//               active: true,
//               materialId: material.id,
//               vendorPartNumber: spProductDetail.productId,
//               vendorId: vendor.id,
//               colorId: color.id,
//               gtin: variant.gtin,
//               sizeId: size?.id,
//               materialVariantImages: {
//                 createMany: {
//                   data: imageRecords.map(image => ({
//                     imageFileId: image.id,
//                   })),
//                 },
//               },
//             },
//           })

//           console.info(
//             `CREATED VARIANT ${materialVariant.id} for MATERIAL ${material.id} `,
//           )
//         }
//       }
//       break
//     }
//     // break
//   }
// }

// start()
//   .catch(e => console.error(e))
//   .then(() => exit(0))
