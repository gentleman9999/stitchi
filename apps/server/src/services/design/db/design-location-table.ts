import {
  PrismaClient,
  DesignLocation as DesignLocationSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignLocation: yup.ObjectSchema<DesignLocationSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    designId: yup.string().uuid().required(),

    colorCount: yup.number().min(0).required(),
    name: yup.string().required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('DesignLocation')

export type DesignLocationRecord = yup.Asserts<typeof DesignLocation>

export const table = (db: PrismaClient) => db.designLocation
export type DesignLocationTable = ReturnType<typeof table>