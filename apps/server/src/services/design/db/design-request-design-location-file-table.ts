import {
  DesignRequestDesignLocationFile as DesignRequestDesignLocationFileSchema,
  PrismaClient,
} from '@prisma/client'

import * as yup from 'yup'

export const DesignRequestDesignLocationFile: yup.ObjectSchema<DesignRequestDesignLocationFileSchema> =
  yup.object().shape({
    id: yup.string().uuid().required(),
    designRequestDesignLocationId: yup.string().uuid().required(),
    fileId: yup.string().uuid().required(),
  })

export type DesignRequestDesignLocationFileRecord = yup.InferType<
  typeof DesignRequestDesignLocationFile
>

export const table = (db: PrismaClient) => db.designRequestDesignLocationFile
export type DesignRequestDesignLocationFileTable = ReturnType<typeof table>
