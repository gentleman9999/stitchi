import * as yup from 'yup'
import {
  BigCommerceProductOptionType,
  BigCommerceProductVariantOption,
} from '../types'
import makeClient from '../client'
import {
  bigCommerceApiProductOptionSchema,
  bigCommerceApiResponseSchema,
} from '../api-schema'
import { makeProductVariantOption } from '../serializer'

const inputSchema = yup.object().shape({
  id: yup.number().required(),
  productId: yup.number().required(),
  displayName: yup.string().required(),
  type: yup
    .string()
    .oneOf(Object.values(BigCommerceProductOptionType))
    .required(),
  optionValues: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          id: yup.number().optional(),
          label: yup.string().required(),
          sortOrder: yup.number().required(),
          valueData: yup.array().of(yup.string().required()).optional(),
        })
        .required(),
    )
    .required(),
})

type ProductOptionInput = yup.InferType<typeof inputSchema>

export type UpdateProductOptionFn = (
  productOptionInput: ProductOptionInput,
) => Promise<BigCommerceProductVariantOption>

interface Config {
  client: ReturnType<typeof makeClient>
}

const makeUpdateProductOptionFn = (
  { client }: Config = {
    client: makeClient(),
  },
): UpdateProductOptionFn => {
  return async productOption => {
    let validInput

    try {
      validInput = await inputSchema.validate(productOption)
    } catch (error) {
      console.error('Error validating product option input', {
        error,
      })

      throw error
    }

    const { id, productId } = validInput

    // Remove duplicate option values by comparing their label
    const uniqueOptionValues = validInput.optionValues.filter(
      (optionValue, index, self) =>
        index ===
        self.findIndex(
          t =>
            t.label.trim().toLowerCase() ===
            optionValue.label.trim().toLowerCase(),
        ),
    )

    const [error, response] = await client.call(
      `/products/${productId}/options/${id}`,
      bigCommerceApiResponseSchema(
        bigCommerceApiProductOptionSchema.required(),
      ),
      {
        method: 'PUT',
        body: JSON.stringify({
          display_name: validInput.displayName,
          type: validInput.type,
          option_values: uniqueOptionValues.map(optionValue => ({
            id: optionValue.id,
            label: optionValue.label,
            sort_order: optionValue.sortOrder,
            value_data: optionValue.valueData
              ? {
                  colors: optionValue.valueData,
                }
              : undefined,
          })),
        }),
      },
    )

    if (error) {
      console.error('Error updating product option', {
        context: { error },
      })

      throw error
    }

    return makeProductVariantOption(response.data)
  }
}

export default makeUpdateProductOptionFn
