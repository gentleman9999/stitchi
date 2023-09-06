import { DesignProof as DesignProofSchema, PrismaClient } from '@prisma/client'
import * as yup from 'yup'

export const DesignProof: yup.ObjectSchema<DesignProofSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),

    artistMembershipId: yup.string().uuid().required(),
    catalogProductId: yup.string().required(),
    primaryImageFileId: yup.string().uuid().required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Design Proof')

export type DesignProofRecord = yup.Asserts<typeof DesignProof>

export const table = (db: PrismaClient) => db.designProof
export type DesignProofTable = ReturnType<typeof table>
