import * as yup from 'yup'
import {
  PrismaClient,
  DesignRequestRevision as DesignRequestRevisionSchema,
} from '@prisma/client'

export const DesignRequestRevision: yup.ObjectSchema<DesignRequestRevisionSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      userId: yup.string().required(),
      designRequestId: yup.string().uuid().required(),

      description: yup.string().required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('Design Request Revision')

export type DesignRequestRevisionRecord = yup.Asserts<
  typeof DesignRequestRevision
>

export const table = (db: PrismaClient) => db.designRequestRevision

export type DesignRequestRevisionTable = ReturnType<typeof table>
