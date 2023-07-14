import {
  DesignProofVariant as DesignProofVariantSchema,
  PrismaClient,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignProofVariant: yup.ObjectSchema<DesignProofVariantSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      designProofId: yup.string().uuid().required(),
      catalogProductColorId: yup.string().uuid().required(),
    })
    .label('Design Proof Variant')

export type DesignProofVariantRecord = yup.Asserts<typeof DesignProofVariant>

export const table = (db: PrismaClient) => db.designProofVariant
export type DesignProofVariantTable = ReturnType<typeof table>
