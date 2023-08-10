import {
  PrismaClient,
  DesignVariantImage as DesignVariantImageSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignVariantImage: yup.ObjectSchema<DesignVariantImageSchema> =
  yup
    .object()
    .shape({
      designVariantId: yup.string().uuid().required(),
      fileId: yup.string().uuid().required(),
      order: yup.number().min(0).required(),
    })
    .label('DesignVariantImage')

export type DesignVariantImageRecord = yup.Asserts<typeof DesignVariantImage>

export const table = (db: PrismaClient) => db.designVariantImage
export type DesignVariantImageTable = ReturnType<typeof table>
