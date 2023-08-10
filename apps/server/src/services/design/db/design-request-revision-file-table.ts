import * as yup from 'yup'
import {
  PrismaClient,
  DesignRequestRevisionFile as DesignRequestRevisionFileSchema,
} from '@prisma/client'

export const DesignRequestRevisionFile: yup.ObjectSchema<DesignRequestRevisionFileSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      designRequestRevisionId: yup.string().uuid().required(),
      fileId: yup.string().uuid().required(),
    })
    .label('Design Request Revision File')

export type DesignRequestRevisionFileRecord = yup.Asserts<
  typeof DesignRequestRevisionFile
>

export const table = (db: PrismaClient) => db.designRequestRevisionFile

export type DesignRequestRevisionFileTable = ReturnType<typeof table>
