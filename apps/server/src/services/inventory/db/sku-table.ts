import * as yup from 'yup'
import { PrismaClient, Sku as SkuSchema, Prisma } from '@prisma/client'

export const Sku: yup.ObjectSchema<SkuSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    designVariantId: yup.string().uuid().required(),
    quantity: yup.number().required().default(0),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    deletedAt: yup.date().nullable().defined(),
  })
  .label('Sku')

export type SkuRecord = yup.Asserts<typeof Sku>

export const table = (db: PrismaClient) => db.sku

export type SkuTable = ReturnType<typeof table>
