import {
  PrismaClient,
  DesignRequest as DesignRequestSchema,
} from '@prisma/client'
import * as yup from 'yup'

export enum DesignRequestStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  AWAITING_APPROVAL = 'AWAITING_APPROVAL',
  AWAITING_REVISION = 'AWAITING_REVISION',
}

export const DesignRequest: yup.ObjectSchema<DesignRequestSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    userId: yup.string().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),

    name: yup.string().required(),
    description: yup.string().nullable().defined(),

    status: yup
      .mixed<DesignRequestStatus>()
      .oneOf(Object.values(DesignRequestStatus))
      .required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('DesignRequest')

export type DesignRequestRecord = yup.Asserts<typeof DesignRequest>

export const table = (db: PrismaClient) => db.designRequest
export type DesignRequestTable = ReturnType<typeof table>
