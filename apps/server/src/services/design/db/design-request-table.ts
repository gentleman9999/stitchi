import {
  PrismaClient,
  DesignRequest as DesignRequestBaseSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const DesignRequestMetadata = yup
  .object()
  .shape({
    useCase: yup.string().optional(),
  })
  .nullable()

interface DesignRequestSchema
  extends Omit<DesignRequestBaseSchema, 'metadata'> {
  metadata: yup.InferType<typeof DesignRequestMetadata>
}

export enum DesignRequestStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  AWAITING_APPROVAL = 'AWAITING_APPROVAL',
  AWAITING_REVISION = 'AWAITING_REVISION',
  ARCHIVED = 'ARCHIVED',
}

export const DesignRequest: yup.ObjectSchema<DesignRequestSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    designRequestProductId: yup.string().uuid().required(),
    membershipId: yup.string().uuid().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),
    conversationId: yup.string().uuid().nullable().defined(),
    approvedDesignProofId: yup.string().uuid().nullable().defined(),

    name: yup.string().required(),
    description: yup.string().nullable().defined(),

    metadata: DesignRequestMetadata,

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
