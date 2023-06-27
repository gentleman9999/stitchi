import * as yup from 'yup'
import {
  PrismaClient,
  DesignRequestProduct as DesignRequestProductSchema,
} from '@prisma/client'

export const DesignRequestProduct: yup.ObjectSchema<DesignRequestProductSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      designRequestId: yup.string().uuid().required(),

      bigCommerceProductId: yup.string().required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('Design Request Product')

export type DesignRequestProductRecord = yup.Asserts<
  typeof DesignRequestProduct
>

export const table = (db: PrismaClient) => db.designRequestProduct

export type DesignRequestProductTable = ReturnType<typeof table>
