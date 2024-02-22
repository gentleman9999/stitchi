import {
  PrismaClient,
  DesignVariant as DesignVariantSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignVariant: yup.ObjectSchema<DesignVariantSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    designId: yup.string().uuid().required(),
    catalogProductVariantId: yup.string().nullable().required(),
    catalogProductColorId: yup.string().required(),

    colorHexCode: yup.string().nullable().defined(),
    colorName: yup.string().nullable().defined(),
  })
  .label('DesignVariant')

export type DesignVariantRecord = yup.Asserts<typeof DesignVariant>

export const table = (db: PrismaClient) => db.designVariant
export type DesignVariantTable = ReturnType<typeof table>
