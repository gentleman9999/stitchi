import * as yup from 'yup'
import {
  PrismaClient,
  DesignRequestProductColor as DesignRequestProductColorSchema,
} from '@prisma/client'

export const DesignRequestProductColor: yup.ObjectSchema<DesignRequestProductColorSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),

      designRequestProductId: yup.string().uuid().required(),
      catalogProductColorId: yup.string().required(),

      hexCode: yup.string().nullable().defined(),
      name: yup.string().nullable().defined(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('Design Request Product Color')

export type DesignRequestProductColorRecord = yup.Asserts<
  typeof DesignRequestProductColor
>

export const table = (db: PrismaClient) => db.designRequestProductColor

export type DesignRequestProductColorTable = ReturnType<typeof table>
