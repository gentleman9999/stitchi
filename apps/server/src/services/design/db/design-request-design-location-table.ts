import {
  DesignRequestDesignLocation as DesignRequestDesignLocationSchema,
  PrismaClient,
} from '@prisma/client'

import * as yup from 'yup'

export const DesignRequestDesignLocation: yup.ObjectSchema<DesignRequestDesignLocationSchema> =
  yup.object().shape({
    id: yup.string().uuid().required(),
    designRequestId: yup.string().uuid().required(),
    description: yup.string().nullable().defined(),
    placement: yup.string().nullable().defined(),
  })

export type DesignRequestDesignLocationRecord = yup.InferType<
  typeof DesignRequestDesignLocation
>

export const table = (db: PrismaClient) => db.designRequestDesignLocation
export type DesignRequestDesignLocationTable = ReturnType<typeof table>
