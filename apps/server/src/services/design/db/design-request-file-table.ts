import * as yup from 'yup'
import {
  PrismaClient,
  DesignRequestFile as DesignRequestFileSchema,
} from '@prisma/client'

export const DesignRequestFile: yup.ObjectSchema<DesignRequestFileSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    designRequestId: yup.string().uuid().required(),
    fileId: yup.string().uuid().required(),
  })
  .label('Design Request File')

export type DesignRequestFileRecord = yup.Asserts<typeof DesignRequestFile>

export const table = (db: PrismaClient) => db.designRequestFile

export type DesignRequestFileTable = ReturnType<typeof table>
