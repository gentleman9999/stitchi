import * as yup from 'yup'

const productSchema = yup.object().shape({
  id: yup.number().required(),
  sku: yup.string().required(),
  name: yup.string().required(),
  custom_fields: yup
    .array(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          name: yup.string().nullable().defined(),
          value: yup.string().nullable().defined(),
        })
        .required(),
    )
    .optional(),
})

const productVariantSchema = yup.object().shape({
  id: yup.number().required(),
  product_id: yup.number().required(),
  sku: yup.string().required(),
  price: yup.number().min(0).required(),
  option_values: yup
    .array(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          option_id: yup.number().required(),
          option_display_name: yup.string().required(),
          label: yup.string().nullable().defined(),
        })
        .required(),
    )
    .optional(),
})

export type Product = yup.InferType<typeof productSchema>
export type ProductVariant = yup.InferType<typeof productVariantSchema>

export const makeProduct = (data: any): Product => {
  return productSchema.validateSync(data)
}

export const makeProductVariant = (data: any): ProductVariant => {
  return productVariantSchema.validateSync(data)
}
