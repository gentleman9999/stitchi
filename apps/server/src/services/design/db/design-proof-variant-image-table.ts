import {
  DesignProofVariantImage as DesignProofVariantImageSchema,
  PrismaClient,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignProofVariantImage: yup.ObjectSchema<DesignProofVariantImageSchema> =
  yup
    .object()
    .shape({
      designProofVariantId: yup.string().uuid().required(),
      imageFileId: yup.string().uuid().required(),
      order: yup.number().integer().min(0).required(),
    })
    .label('Design Proof Variant Image')

export type DesignProofVariantImageRecord = yup.Asserts<
  typeof DesignProofVariantImage
>

export const table = (db: PrismaClient) => db.designProofVariantImage
export type DesignProofVariantImageTable = ReturnType<typeof table>
