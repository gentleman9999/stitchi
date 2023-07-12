import {
  DesignRequestApprovedDesignProof as DesignRequestApprovedDesignProofSchema,
  PrismaClient,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignRequestApprovedDesignProof: yup.ObjectSchema<DesignRequestApprovedDesignProofSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      designRequestId: yup.string().uuid().required(),
      designProofId: yup.string().uuid().required(),
      userId: yup.string().required(),

      termsConditionsAgreed: yup.boolean().required().oneOf([true]),

      createdAt: yup.date().required(),
    })
    .label('Design Proof Approval')

export type DesignRequestApprovedDesignProofRecord = yup.Asserts<
  typeof DesignRequestApprovedDesignProof
>

export const table = (db: PrismaClient) => db.designRequestApprovedDesignProof
export type DesignRequestApprovedDesignProofTable = ReturnType<typeof table>
