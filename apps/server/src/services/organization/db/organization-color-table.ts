import {
  PrismaClient,
  OrganizationColor as OrganizationColorSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const OrganizationColor: yup.ObjectSchema<OrganizationColorSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    organizationId: yup.string().uuid().required(),

    hex: yup.string().required(),
    name: yup.string().required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    deletedAt: yup.date().nullable().defined(),
  })
  .label('OrganizationColor')

export type OrganizationColorRecord = yup.Asserts<typeof OrganizationColor>

export const table = (db: PrismaClient) => db.organizationColor
export type OrganizationColorTable = ReturnType<typeof table>
