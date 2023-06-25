import {
  DesignProofFile as DesignProofFileSchema,
  PrismaClient,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignProofFile: yup.ObjectSchema<DesignProofFileSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    designProofId: yup.string().uuid().required(),
    fileId: yup.string().uuid().required(),
  })
  .label('Design Proof File')

export type DesignProofFileRecord = yup.Asserts<typeof DesignProofFile>

export const table = (db: PrismaClient) => db.designProofFile
export type DesignProofFileTable = ReturnType<typeof table>
