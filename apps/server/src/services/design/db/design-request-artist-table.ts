import * as yup from 'yup'
import {
  DesignRequestArtist as DesignRequestArtistSchema,
  PrismaClient,
} from '@prisma/client'

export const DesignRequestArtist: yup.ObjectSchema<DesignRequestArtistSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      designRequestId: yup.string().uuid().required(),
      artistMembershipId: yup.string().uuid().required(),
      isActive: yup.boolean().required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('Design Request Artist')

export type DesignRequestArtistRecord = yup.Asserts<typeof DesignRequestArtist>

export const table = (db: PrismaClient) => db.designRequestArtist

export type DesignRequestArtistTable = ReturnType<typeof table>
