import {
  DesignRequestDesignLocation as DesignRequestDesignLocationSchema,
  PrismaClient,
} from '@prisma/client'

import * as yup from 'yup'

export const DesignRequestDesignLocation: yup.ObjectSchema<DesignRequestDesignLocationSchema> =
  yup.object().shape({
    id: yup.string().uuid().required(),
    designRequestId: yup.string().uuid().required(),
    description: yup.string().required(),
    placement: yup.string().required(),
  })

export type DesignRequestDesignLocationRecord = yup.InferType<
  typeof DesignRequestDesignLocation
>

export const table = (db: PrismaClient) => db.designRequestDesignLocation
export type DesignRequestDesignLocationTable = ReturnType<typeof table>
