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
    url: yup.string().required(),
    label: yup.string().required(),
  }),
  additionalImages: yup.array(
    yup.object({
      label: yup.string().required(),
      url: yup.string().required(),
    }),
  ),
  colors: yup.array(
    yup.object({
      name: yup.string().required(),
      hex: yup.string().required(),
      class: yup.string().required(),
      images: yup.array(
        yup.object({
          url: yup.string().required(),
          label: yup.string().required(),
        }),
      ),
      sizes: yup.array(yup.string()),
    }),
  ),
  properties: yup.object({
    brand: yup.string().required(),
    style: yup.string().required(),
    dtg: yup.boolean().default(false),
    embr: yup.boolean().default(false),
    supplierMockups: yup.boolean().default(false),
    screenprint: yup.boolean().default(false),
    startingAtPrice: yup.number().required(),
    rank: yup.number().required(),
    sla: yup.object({
      days: yup.number().required(),
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
