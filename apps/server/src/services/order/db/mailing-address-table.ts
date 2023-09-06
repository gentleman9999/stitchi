import {
  PrismaClient,
  MailingAddress as MailingAddressSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const MailingAddress: yup.ObjectSchema<MailingAddressSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    membershipId: yup.string().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),
    name: yup.string().nullable().defined(),
    phone: yup.string().nullable().defined(),
    company: yup.string().nullable().defined(),
    firstName: yup.string().nullable().defined(),
    lastName: yup.string().nullable().defined(),
    address1: yup.string().nullable().defined(),
    address2: yup.string().nullable().defined(),
    city: yup.string().nullable().defined(),
    country: yup.string().nullable().defined(),
    province: yup.string().nullable().defined(),
    provinceCode: yup.string().length(2).nullable().defined(),
    zip: yup.string().nullable().defined(),
    latitude: yup.number().nullable().defined(),
    longitude: yup.number().nullable().defined(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('MailingAddress')

export type MailingAddressRecord = yup.Asserts<typeof MailingAddress>

export const table = (db: PrismaClient) => db.mailingAddress
export type MailingAddressTable = ReturnType<typeof table>
