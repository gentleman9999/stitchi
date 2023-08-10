import * as yup from 'yup'
import {
  PrismaClient,
  DesignRequestDesignProof as DesignRequestDesignProofSchema,
} from '@prisma/client'

export const DesignRequestDesignProof: yup.ObjectSchema<DesignRequestDesignProofSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      designRequestId: yup.string().uuid().required(),
      designProofId: yup.string().uuid().required(),
    })
    .label('Design Request DesignProof')

export type DesignRequestDesignProofRecord = yup.Asserts<
  typeof DesignRequestDesignProof
>

export const table = (db: PrismaClient) => db.designRequestDesignProof

export type DesignRequestDesignProofTable = ReturnType<typeof table>
