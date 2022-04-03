import * as yup from 'yup'
import {
  MaterialCreateInput,
  MaterialVariantCreateInput,
} from '@generated/globalTypes'

const variantSchema: yup.SchemaOf<MaterialVariantCreateInput> = yup.object({
  gtin: yup.string(),
  vendorPartNumber: yup.string(),
})

const schema: yup.SchemaOf<Omit<MaterialCreateInput, 'slug'>> = yup
  .object({
    name: yup.string().required(),
    variants: yup.array(variantSchema).required(),
  })
  .required()

export type Schema = yup.InferType<typeof schema>

export default schema
