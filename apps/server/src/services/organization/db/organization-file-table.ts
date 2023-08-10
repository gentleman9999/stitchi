import {
  PrismaClient,
  OrganizationFile as OrganizationFileSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const OrganizationFile: yup.ObjectSchema<OrganizationFileSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    userId: yup.string().required(),
    organizationId: yup.string().uuid().required(),
    fileId: yup.string().uuid().required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    deletedAt: yup.date().nullable().defined(),
  })
  .label('OrganizationFile')

export type OrganizationFileRecord = yup.Asserts<typeof OrganizationFile>

export const table = (db: PrismaClient) => db.organizationFile
export type OrganizationFileTable = ReturnType<typeof table>
