import * as yup from 'yup'
import fs from 'fs'
import csv from 'csv-parser'
import process from 'process'
import path from 'path'
import fetch, { RequestInit } from 'node-fetch'
import chunkArray from './chunk-array'
import getAllProductVariants from './bigcommerce/get-all-product-variants'

const PRODUCT_CSV_PATH = process.env.PRODUCT_CSV_PATH || null

if (!PRODUCT_CSV_PATH) {
  console.error('CSV_PATH environment variable is required.')
  process.exit(1)
}

const bigCommerceProductSchema = yup.object().shape({
  id: yup.number().required(),
  sku: yup.string().required(),
  name: yup.string().required(),
  custom_fields: yup
    .array(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          name: yup.string().required(),
          value: yup.string().required(),
        })
        .required(),
    )
    .optional(),
})

const bigCommerceProductVariantOptionSchema = yup.object().shape({
  id: yup.number().required(),
  product_id: yup.number().required(),
  display_name: yup.string().required(),
  option_values: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          label: yup.string().required(),
        })
        .required(),
    )
    .required(),
})

const variantSchema = yup.object().shape({
  sku: yup.string().required(),
  gtin: yup.string().optional(),
  styleID: yup.number().required(),
  brandName: yup.string().required(),
  styleName: yup.string().required(),
  colorName: yup.string().required(),
  colorCode: yup.number().required(),
  colorGroup: yup.number().required(),
  colorFamily: yup.string().required(),
  colorSwatchImage: yup.string().optional(),
  colorFrontImage: yup.string().optional(),
  colorSideImage: yup.string().optional(),
  colorBackImage: yup.string().optional(),
  colorDirectSideImage: yup.string().optional(),
  colorOnModelFrontImage: yup.string().optional(),
  colorOnModelSideImage: yup.string().optional(),
  colorOnModelBackImage: yup.string().optional(),
  color1: yup.string().optional(),
  color2: yup.string().optional(),
  sizeName: yup.string().required(),
  sizeCode: yup.number().required(),
  unitWeight: yup.number().optional(),
  customerPrice: yup.number().required(),
})

// Set up the BigCommerce API details
const storeHash = 'ycjcgspsys'
const accessToken = 'o6t22c84y4aaoeaepzfqvqceiwn0luw'

async function parseCSV<T>(
  filePath: string,
  schema: yup.Schema<T>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const data: T[] = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async row => {
        try {
          const validDate = await schema.validate(row)
          data.push(validDate)
        } catch (error) {
          console.error('Error validating row:', error)
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed.')
        resolve(data)
      })
      .on('error', error => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })

    return data
  })
}

const bigCommerceFetch = async <T>(
  url: string,
  schema: yup.Schema<T>,
  init?: RequestInit,
): Promise<T | null> => {
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog${url}`,
    {
      ...init,
      headers: {
        ...init?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    },
  )

  const json = await res.json()

  if (res.status === 409) {
    console.log('Not unique, skipping', {
      context: {
        status: res.status,
        statusText: res.statusText,
        errors: json.errors,
      },
    })
    return null
  }

  if (res.status !== 200 && json.errors) {
    console.error('Error fetching from BigCommerce:', {
      context: {
        status: res.status,
        statusText: res.statusText,
        errors: json.errors,
      },
    })
    return null
  }

  try {
    return schema.validate(json)
  } catch (error) {
    console.error('Error validating response:', { context: { error } })
    return null
  }
}

const start = async () => {
  let importedProductCount = 0
  let importedVariantCount = 0
  let updatedVariantCount = 0
  let erroredVariantCount = 0

  console.info('Starting variant import...')
  const variants = await parseCSV(
    path.join(__dirname, PRODUCT_CSV_PATH),
    variantSchema,
  )

  console.info("Successfully parsed CSV file. Let's get started...")

  const limit = 60
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    // Get all bigcommerce products

    const products = await bigCommerceFetch(
      `/products?limit=${limit}&page=${page}&include=custom_fields`,
      yup.object().shape({
        data: yup.array().of(bigCommerceProductSchema).required(),
        meta: yup.object().shape({
          pagination: yup.object().shape({
            total_pages: yup.number().required(),
          }),
        }),
      }),
    )

    if (!products?.data) {
      console.error('Error fetching products from BigCommerce')
      process.exit(1)
    }

    hasNextPage = products.meta.pagination.total_pages > page
    page = page + 1

    const productChunks = chunkArray(products.data, 30)

    for (const productChunk of productChunks) {
      const productUpdatePromises = productChunk.map(async product => {
        importedProductCount++
        // Update product variants
        console.log('Starting to update product:', product.name)

        const styleId = product.custom_fields?.find(
          field => field.name === 'style_id',
        )?.value

        if (!styleId) {
          console.log('Not managed by SS activewear. Skipping', product.name)
          return
        }

        const productVariants = variants.filter(
          variant => variant.styleID.toString() === styleId,
        )

        if (!productVariants.length) {
          console.log('No variants found for product:', product.name)
          return
        }

        console.log('Getting all variant options for the product...')
        const productVariantOptions = await bigCommerceFetch(
          `/products/${product.id}/options`,
          yup.object().shape({
            data: yup.array().of(bigCommerceProductVariantOptionSchema),
          }),
        )

        const existingColorOption = productVariantOptions?.data?.find(
          option => option.display_name === 'Color',
        )

        const existingSizeOption = productVariantOptions?.data?.find(
          option => option.display_name === 'Size',
        )

        const colorMap = new Map<string, yup.Asserts<typeof variantSchema>>(
          productVariants.map(variant => [variant.colorName, variant]),
        )

        const sizeMap = new Map<string, { sizeName: string; sizeCode: number }>(
          productVariants.map(variant => [variant.sizeName, variant]),
        )

        let colorOption: yup.Asserts<
          typeof bigCommerceProductVariantOptionSchema
        > | null = null

        if (colorMap.size > 0) {
          console.info(
            `${
              existingColorOption ? 'Updating' : 'Creating'
            } 'Color' option...`,
          )
          try {
            const res = await bigCommerceFetch(
              `/products/${product.id}/options${
                existingColorOption ? `/${existingColorOption.id}` : ''
              }`,
              yup.object().shape({
                data: bigCommerceProductVariantOptionSchema,
              }),
              {
                method: existingColorOption ? 'PUT' : 'POST',
                body: JSON.stringify({
                  ...existingColorOption,
                  display_name: 'Color',
                  type: 'swatch',
                  product_id: product.id,
                  option_values: Array.from(colorMap.values()).map(variant => {
                    const existingColorOptionValue =
                      existingColorOption?.option_values?.find(
                        optionValue => optionValue.label === variant.colorName,
                      )

                    return {
                      ...existingColorOptionValue,
                      label: variant.colorName,
                      sort_order: 0,
                      value_data: {
                        colors: [variant.color1],
                      },
                    }
                  }),
                }),
              },
            )

            colorOption = res?.data || null
            console.info(
              `Successfully ${
                existingColorOption ? 'updated' : 'created'
              } 'Color' option.`,
            )
          } catch (error) {
            console.error(
              `Error ${
                existingColorOption ? 'updating' : 'creating'
              } color option:`,
              { context: { error } },
            )
          }
        } else {
          console.info('No color options found.')
        }

        let sizeOptions: yup.Asserts<
          typeof bigCommerceProductVariantOptionSchema
        > | null = null

        if (sizeMap.size > 0) {
          console.info(
            `${existingSizeOption ? 'Updating' : 'Creating'} 'Size' option...`,
          )

          try {
            const res = await bigCommerceFetch(
              `/products/${product.id}/options${
                existingSizeOption ? `/${existingSizeOption.id}` : ''
              }`,
              yup.object().shape({
                data: bigCommerceProductVariantOptionSchema,
              }),
              {
                method: existingSizeOption ? 'PUT' : 'POST',
                body: JSON.stringify({
                  ...existingSizeOption,
                  display_name: 'Size',
                  type: 'dropdown',
                  product_id: product.id,
                  option_values: Array.from(sizeMap.values()).map(variant => {
                    const existingSizeOptionValue =
                      existingSizeOption?.option_values?.find(
                        optionValue => optionValue.label === variant.sizeName,
                      )

                    return {
                      ...existingSizeOptionValue,
                      label: variant.sizeName,
                      sort_order: 0,
                    }
                  }),
                }),
              },
            )

            sizeOptions = res?.data || null
            console.info(
              `Successfully ${
                existingSizeOption ? 'updated' : 'created'
              } 'Size' option.`,
            )
          } catch (error) {
            console.error(
              `Error ${
                existingSizeOption ? 'updating' : 'creating'
              } size option:`,
              { context: { error } },
            )
          }
        } else {
          console.info('No size options found.')
        }

        let existingVariantsData: Awaited<
          ReturnType<typeof getAllProductVariants>
        > = []

        try {
          existingVariantsData = await getAllProductVariants(product.id)
        } catch (error) {
          console.error(
            `Error getting existing variants for product: ${product.name}`,
            { context: { error } },
          )
          return
        }

        // Batch endpoint allows for 50 variants at a time
        const productVariantBatchChunks = chunkArray(productVariants, 50)

        for (const productVariantBatchChunk of productVariantBatchChunks) {
          const productVariantInput = productVariantBatchChunk.map(variant => {
            console.info(`Updating variant ${variant.styleName}...`)
            importedVariantCount++

            const colorOptionValue = colorOption?.option_values.find(
              optionValue => optionValue.label === variant.colorName,
            )

            const sizeOptionValue = sizeOptions?.option_values.find(
              optionValue => optionValue.label === variant.sizeName,
            )

            if (!colorOptionValue && !sizeOptionValue) {
              console.error(
                `Error finding option values for variant: ${variant.styleName}`,
              )
              return
            }

            const existingVariant = existingVariantsData?.find(
              existingVariant => existingVariant.sku === variant.sku,
            )

            const variantData = {
              ...existingVariant,
              sku: variant.sku,
              price: variant.customerPrice,
              product_id: product.id,
              option_values: [
                {
                  id: colorOptionValue?.id,
                  option_display_name: 'Color',
                  option_value: colorOptionValue?.label,
                  option_id: colorOption?.id,
                },
                {
                  id: sizeOptionValue?.id,
                  option_display_name: 'Size',
                  option_value: sizeOptionValue?.label,
                  option_id: sizeOptions?.id,
                },
              ],
            }

            return variantData
          })

          try {
            const updatedVariants = await bigCommerceFetch(
              `/variants`,
              yup.object().shape({
                data: yup.array().of(
                  yup
                    .object()
                    .shape({
                      id: yup.number().required(),
                      sku: yup.string().required(),
                    })
                    .required(),
                ),
              }),
              {
                method: 'PUT',
                body: JSON.stringify(productVariantInput),
              },
            )

            updatedVariantCount =
              updatedVariantCount + (updatedVariants?.data?.length || 0)

            const productVariantImagePromises = productVariantBatchChunk.map(
              async variant => {
                if (variant.colorFrontImage) {
                  const existingVariant = updatedVariants?.data?.find(
                    updatedVariant => updatedVariant.sku === variant.sku,
                  )

                  if (!existingVariant) {
                    console.error(
                      `Error finding variant for thumbnail image: ${variant.styleName}`,
                    )
                    return
                  }

                  try {
                    // create thumbnail image
                    await bigCommerceFetch(
                      `/products/${product.id}/variants/${existingVariant.id}/image`,

                      yup.object().shape({}),
                      {
                        method: 'POST',
                        body: JSON.stringify({
                          image_url: `https://store-ycjcgspsys.mybigcommerce.com/product_images/import/SS/${variant.colorFrontImage}`,
                        }),
                      },
                    )

                    console.info(
                      "Successfully created variant's thumbnail image.",
                    )
                  } catch (error) {
                    console.error(
                      `Error creating variant's thumbnail image: ${variant.styleName}`,
                      { context: { error } },
                    )
                  }
                }
              },
            )

            const batchedImagePromises = chunkArray(
              productVariantImagePromises,
              30,
            )

            for (const batch of batchedImagePromises) {
              await Promise.all(batch)
            }
          } catch (error) {
            erroredVariantCount =
              erroredVariantCount + productVariantInput.length

            console.error(
              `Error updating variants for product: ${product.name}`,
              { context: { error } },
            )
          }

          console.log(
            `Products: ${importedProductCount} - Variants: ${importedVariantCount} - Updated: ${updatedVariantCount} -  Errored: ${erroredVariantCount}`,
          )
        }
      })

      // resolve promises in batches of 10
      const batches = productUpdatePromises.reduce((acc, curr, i) => {
        const batchIndex = Math.floor(i / 10)
        acc[batchIndex] = [...(acc[batchIndex] || []), curr]
        return acc
      }, [] as Promise<void>[][])

      for (const batch of batches) {
        try {
          await Promise.all(batch)
        } catch (error) {
          console.error('Error processing batch', { context: { error } })
        }
      }
    }
  }
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
