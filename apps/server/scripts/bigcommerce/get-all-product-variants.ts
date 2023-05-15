import bigCommerceFetch from './fetch'
import * as yup from 'yup'

const bigCommerceProductVariantSchema = yup.object().shape({
  id: yup.number().required(),
  sku: yup.string().required(),
})

const getAllProductVariants = async (productId: number) => {
  let page = 1
  let hasNextPage = true
  const variants: yup.Asserts<typeof bigCommerceProductVariantSchema>[] = []

  while (hasNextPage) {
    const res = await bigCommerceFetch(
      `/products/${productId}/variants?limit=50?page=${page}`,
    )

    const { data, meta } = await yup
      .object()
      .shape({
        data: yup.array().of(bigCommerceProductVariantSchema),
        meta: yup.object().shape({
          pagination: yup.object().shape({
            total_pages: yup.number().required(),
          }),
        }),
      })
      .validate(await res.json())

    hasNextPage = meta.pagination.total_pages > page
    page = page + 1

    variants.push(...(data || []))
  }

  return variants
}

export default getAllProductVariants
