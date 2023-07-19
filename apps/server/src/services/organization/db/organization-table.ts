import {
  PrismaClient,
  Organization as OrganizationSchema,
} from '@prisma/client'
import * as yup from 'yup'

export enum OrganizationRecordGlobalRole {
  SUPERADMIN = 'SUPERADMIN',
  CUSTOMER = 'CUSTOMER',
}

export const Organization: yup.ObjectSchema<OrganizationSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    role: yup
      .mixed<OrganizationRecordGlobalRole>()
      .oneOf(Object.values(OrganizationRecordGlobalRole))
      .required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    deletedAt: yup.date().nullable().defined(),
  })
  .label('Organization')

export type OrganizationRecord = yup.Asserts<typeof Organization>

export const table = (db: PrismaClient) => db.organization
export type OrganizationTable = ReturnType<typeof table>
