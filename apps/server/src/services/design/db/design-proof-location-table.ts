import {
  DesignProofLocation as DesignProofLocationSchema,
  PrismaClient,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignProofLocation: yup.ObjectSchema<DesignProofLocationSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      designProofId: yup.string().uuid().required(),
      fileId: yup.string().uuid().required(),

      placement: yup.string().nullable().defined(),
      colorCount: yup.number().min(0).nullable().defined(),
    })
    .label('Design Proof Location')

export type DesignProofLocationRecord = yup.Asserts<typeof DesignProofLocation>

export const table = (db: PrismaClient) => db.designProofLocation
export type DesignProofLocationTable = ReturnType<typeof table>
