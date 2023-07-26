import * as yup from 'yup'

const customFieldSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().nullable().defined(),
  value: yup.string().nullable().defined(),
})

const imageSchema = yup.object().shape({
  id: yup.number().required(),
  image_file: yup.string().notRequired(),
  is_thumbnail: yup.boolean().notRequired(),
  sort_order: yup.number().notRequired(),
  description: yup.string().notRequired(),
  url_standard: yup.string().notRequired(),
})

const productSchema = yup.object().shape({
  id: yup.number().required(),
  sku: yup.string().notRequired(),
  name: yup.string().required(),
  description: yup.string().notRequired(),
  weight: yup.number().required(),
  price: yup.number().min(0).required(),
  brand_id: yup.number().notRequired(),
  is_visible: yup.boolean().notRequired(),
  categories: yup.array(yup.number().required()).optional(),
  related_products: yup.array(yup.number().required()).optional(),
  custom_fields: yup.array(customFieldSchema.required()).notRequired(),
  images: yup.array(imageSchema.required()).notRequired(),
  date_created: yup.string().notRequired(),
  date_modified: yup.string().notRequired(),
  custom_url: yup
    .object()
    .shape({
      url: yup.string().required(),
    })
    .required(),
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

const brandSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  custom_url: yup.object().shape({
    url: yup.string().required(),
  }),
})

const categorySchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
})

export type Product = yup.InferType<typeof productSchema>
export type ProductVariant = yup.InferType<typeof productVariantSchema>
export type Brand = yup.InferType<typeof brandSchema>
export type Category = yup.InferType<typeof categorySchema>

export const makeProduct = (data: any): Product => {
  return productSchema.validateSync(data)
}

export const makeProductVariant = (data: any): ProductVariant => {
  return productVariantSchema.validateSync(data)
}

export const makeBrand = (data: any): Brand => {
  return brandSchema.validateSync(data)
}

export const makeCategory = (data: any): Category => {
  return categorySchema.validateSync(data)
}
