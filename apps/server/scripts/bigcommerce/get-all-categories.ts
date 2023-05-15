import bigCommerceFetch from './fetch'
import * as yup from 'yup'

const bigCommerceCategorySchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().optional(),
})

const bigCommerceCategoryMetadataSchema = yup.object().shape({
  pagination: yup.object().shape({
    total_pages: yup.number().required(),
  }),
})

const responseSchema = yup.object().shape({
  data: yup.array().of(bigCommerceCategorySchema.required()).required(),
  meta: bigCommerceCategoryMetadataSchema.required(),
})

const getAllCategories = async () => {
  const limit = 100
  let page = 1
  let hasNextPage = true

  let categories: yup.Asserts<typeof bigCommerceCategorySchema>[] = []

  while (hasNextPage) {
    const res = await bigCommerceFetch(
      `/categories?limit=${limit}&page=${page}`,
    )

    const { data, meta } = await responseSchema.validate(await res.json())

    categories = [...categories, ...data]

    hasNextPage = meta.pagination.total_pages > page
    page = page + 1
  }

  return categories
}

export { getAllCategories }
