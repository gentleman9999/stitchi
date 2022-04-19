import * as yup from 'yup'
import { ColorCreateInput } from '@generated/globalTypes'

const schema: yup.SchemaOf<ColorCreateInput> = yup.object({
  name: yup.string().required(),
  hex: yup.string().required(),
})

export type Schema = yup.InferType<typeof schema>

export default schema
