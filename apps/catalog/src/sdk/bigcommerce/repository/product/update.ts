import * as yup from 'yup'
import { BigCommerceProduct } from '../../types'
import makeClient from '../../client'
import {
  bigCommerceApiResponseSchema,
  bigCommerceCustomFieldApiSchema,
  bigCommerceProductApiSchema,
} from '../../api-schema'
import { makeProduct } from '../../serializer'
import filterValidImages from '../../utils/filter-valid-images'

const inputSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().optional(),
  brandName: yup.string().optional(),
  visible: yup.boolean().optional(),
  description: yup.string().optional(),
  sku: yup.string().optional(),
  categoryIds: yup.array(yup.number().required()).optional(),
  price: yup.number().optional(),
  sortOrder: yup.number().optional(),
  inventoryTracking: yup
    .string()
    .oneOf(['none', 'variant', 'product'])
    .optional(),
  availability: yup
    .string()
    .oneOf(['available', 'disabled', 'preorder'])
    .optional(),
  url: yup.string().optional(),
  images: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          imageUrl: yup.string().required(),
          isThumbnail: yup.boolean().required(),
        })
        .required(),
    )
    .nullable(),

  customFields: yup.array().of(
    bigCommerceCustomFieldApiSchema
      .omit(['id'])
      .concat(
        yup.object().shape({
          id: yup.number().optional(),
        }),
      )
      .required(),
  ),
})

export type UpdateProductInput = yup.InferType<typeof inputSchema>

export type UpdateProductFn = (
  productInput: UpdateProductInput,
  config?: {
    include?: Array<'images'>
  },
) => Promise<BigCommerceProduct>

interface Client {
  client: ReturnType<typeof makeClient>
}

const makeUpdateProductFn = ({ client }: Client): UpdateProductFn => {
  return async (product, config) => {
    let validInput

    try {
      validInput = await inputSchema.validate(product)
    } catch (error) {
      console.error('Error validating product input', {
        context: { error },
      })

      throw error
    }

    let include = ''

    if (config?.include) {
      include = `?include=${Array.from(new Set(config.include)).join(',')}`
    }

    const validImages = await filterValidImages(validInput.images || [])

    let productData

    try {
      const [error, productResponse] = await client.call(
        `/products/${validInput.id}${include}`,
        bigCommerceApiResponseSchema(bigCommerceProductApiSchema.required()),
        {
          method: 'PUT',
          body: JSON.stringify({
            name: validInput.name,
            type: 'physical',
            description: validInput.description,
            sku: validInput.sku,
            price: validInput.price,
            categories: validInput.categoryIds,
            availability: validInput.availability,
            is_visible: validInput.visible,
            brand_name: validInput.brandName,
            inventory_tracking: validInput.inventoryTracking,
            sort_order: validInput.sortOrder,
            ...(validInput.url
              ? {
                  custom_url: {
                    url: validInput.url,
                    is_customized: true,
                  },
                }
              : {}),
            images: validImages.map(image => ({
              image_url: image.imageUrl,
              is_thumbnail: image.isThumbnail,
            })),
            custom_fields: validInput.customFields?.map(field => ({
              id: field.id || undefined,
              name: field.name,
              value: field.value,
            })),
          }),
        },
      )

      if (error) {
        throw error
      }

      productData = productResponse.data
    } catch (error) {
      console.error('Error creating product', {
        context: { error },
      })

      throw error
    }

    return makeProduct({ ...productData, metadata: [] })
  }
}

export default makeUpdateProductFn
