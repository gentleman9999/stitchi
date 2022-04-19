import * as yup from 'yup'
import { SizeCreateInput } from '@generated/globalTypes'

const schema: yup.SchemaOf<SizeCreateInput> = yup.object({
  name: yup.string().required(),
  value: yup.string().required(),
})

export type Schema = yup.InferType<typeof schema>
export default schema
