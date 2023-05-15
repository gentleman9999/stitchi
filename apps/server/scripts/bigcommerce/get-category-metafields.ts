import bigCommerceFetch from './fetch'
import * as yup from 'yup'

const bigCommerceCategoryMetadataSchema = yup.object().shape({
  id: yup.number().required(),
  key: yup.string(),
  value: yup.string(),
})

const getCategoryMetafields = async (categoryId: number) => {
  const res = await bigCommerceFetch(`/categories/${categoryId}/metafields`)

  const { data } = await yup
    .object()
    .shape({
      data: yup.array().of(bigCommerceCategoryMetadataSchema),
    })
    .validate(await res.json())

  return data || []
}

export default getCategoryMetafields
