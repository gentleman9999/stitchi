import * as yup from 'yup'

const ListCategoriesResponse = yup.array(
  yup.object({
    type: yup.string(),
    name: yup.string().required(),
    family: yup.string(),
    categoryId: yup.string().required(),
  }),
)

export const makeListCategoriesResponse = async (
  categories: any,
): Promise<yup.Asserts<typeof ListCategoriesResponse>> => {
  return ListCategoriesResponse.validate(categories)
}

const GetProductResponse = yup.object({
  productId: yup.string().required(),
  name: yup.string().required(),
  categoryIdentifier: yup.string().required(),
  type: yup.string(),
  comments: yup.string(),
  description: yup.string(),
  available: yup.boolean().default(false),
  image: yup.object({
    url: yup.string(),
    label: yup.string(),
  }),
  additionalImages: yup.array(
    yup.object({
      label: yup.string(),
      url: yup.string(),
    }),
  ),
  colors: yup.array(
    yup.object({
      name: yup.string().required(),
      hex: yup.string(),
      class: yup.string(),
      images: yup.array(
        yup.object({
          url: yup.string(),
          label: yup.string(),
        }),
      ),
      sizes: yup.array(yup.string()),
    }),
  ),
  properties: yup.object({
    style: yup.string().required(),
    brand: yup.string(),
    material: yup.string(),
    dtg: yup.boolean().default(false),
    embr: yup.boolean().default(false),
    supplierMockups: yup.boolean().default(false),
    screenprint: yup.boolean().default(false),
    startingAtPrice: yup.number().nullable().default(null),
    rank: yup.number(),
    sla: yup.object({
      days: yup.number().nullable().default(null),
    }),
  }),
})

export const makeGetProductResponse = async (
  product: any,
): Promise<yup.Asserts<typeof GetProductResponse>> => {
  return GetProductResponse.validate(product)
}

const GetCategoryResponse = yup.object({
  type: yup.string(),
  name: yup.string().required(),
  family: yup.string(),
  categoryId: yup.string().required(),
  products: yup.array(
    yup.object({
      name: yup.string(),
      style: yup.string(),
      image: yup.object({
        url: yup.string(),
        label: yup.string(),
      }),
      id: yup.string().required(),
    }),
  ),
})

export const makeGetCategoryResponse = async (
  category: any,
): Promise<yup.Asserts<typeof GetCategoryResponse>> => {
  return GetCategoryResponse.validate(category)
}

const GetProductVariantsResponse = yup.object({})

const ProductVariantColor = yup.object({})

const ProductVaraintSize = yup.object({
  quantity: yup.number(),
  price: yup.number(),
  weight: yup.number(),
  size: yup.string(),
  color: yup.string(),
  GTIN: yup.string(),
  tags: yup.array(yup.string()),
})

export interface ProductVariant {
  productId: string
  colorId?: string
  sizeId?: string
  gtin?: string
}

export const makeGetProductVariantsResponse = async (
  productId: string,
  variant: any,
): Promise<ProductVariant[]> => {
  const response = await GetProductVariantsResponse.validate(variant)

  let variants: ProductVariant[] = []

  for (const colorKey of Object.keys(response)) {
    const variantColor = await ProductVariantColor.validate(
      response[colorKey as keyof typeof response],
    )

    for (const sizeKey of Object.keys(variantColor)) {
      const variantSize = await ProductVaraintSize.validate(
        variantColor[sizeKey as keyof typeof variantColor],
      )

      variants.push({
        productId,
        colorId: colorKey,
        sizeId: sizeKey,
        gtin: variantSize.GTIN,
      })
    }
  }

  return variants
}
