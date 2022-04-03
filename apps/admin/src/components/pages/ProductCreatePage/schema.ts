import * as yup from 'yup'
import {
  MaterialCreateInput,
  MaterialVariantCreateInput,
} from '@generated/globalTypes'

const variantSchema: yup.SchemaOf<MaterialVariantCreateInput> = yup.object({
  gtin: yup.string(),
  vendorPartNumber: yup.string(),
  sizeId: yup.string(),
  colorId: yup.string(),
})

const schema: yup.SchemaOf<Omit<MaterialCreateInput, 'slug'>> = yup
  .object({
    name: yup.string().required(),
    description: yup.string().nullable(),
    variants: yup.array(variantSchema).nullable(),
  })
  .required()

export type Schema = yup.InferType<typeof schema>

export default schema
