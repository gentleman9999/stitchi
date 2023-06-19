import * as yup from 'yup'
import { PrismaClient, File as FileSchema, Prisma } from '@prisma/client'

export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  UNKNOWN = 'UNKNOWN',
}

export const File: yup.ObjectSchema<FileSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    userId: yup.string().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),
    fileType: yup.mixed<FileType>().oneOf(Object.values(FileType)).required(),
    url: yup.string().required(),
    originalFilename: yup.string().required(),
    name: yup.string().required(),
    bytes: yup.number().required(),
    format: yup.string().required(),

    cloudinaryAssetId: yup.string().nullable().defined(),
    width: yup.number().nullable().defined(),
    height: yup.number().nullable().defined(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('File')

export type FileRecord = yup.Asserts<typeof File>

export const table = (db: PrismaClient) => db.file

export type FileTable = ReturnType<typeof table>
