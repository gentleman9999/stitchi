import { PrismaClient, Color as ColorSchema } from '@prisma/client'
import * as yup from 'yup'

export const Color: yup.ObjectSchema<ColorSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),

    name: yup.string().required(),
    hex: yup.string().required(),

    pantone: yup.string().nullable().defined(),
    cmykC: yup.number().nullable().defined(),
    cmykM: yup.number().nullable().defined(),
    cmykY: yup.number().nullable().defined(),
    cmykK: yup.number().nullable().defined(),
  })
  .label('Color')

export type ColorRecord = yup.Asserts<typeof Color>

export const table = (db: PrismaClient) => db.color
export type ColorTable = ReturnType<typeof table>
