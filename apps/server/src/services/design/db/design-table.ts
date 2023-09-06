import { PrismaClient, Design as DesignSchema } from '@prisma/client'
import * as yup from 'yup'

export const Design: yup.ObjectSchema<DesignSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    designRequestId: yup.string().uuid().required(),
    designProofId: yup.string().uuid().required(),
    catalogProductId: yup.string().required(),
    membershipId: yup.string().uuid().defined(),
    organizationId: yup.string().uuid().nullable().defined(),
    primaryImageFileId: yup.string().uuid().nullable().defined(),

    termsConditionsAgreed: yup.boolean().required().default(false),

    name: yup.string().required(),
    description: yup.string().nullable().defined(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Design')

export type DesignRecord = yup.Asserts<typeof Design>

export const table = (db: PrismaClient) => db.design
export type DesignTable = ReturnType<typeof table>
