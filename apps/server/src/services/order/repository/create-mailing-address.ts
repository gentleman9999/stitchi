import { PrismaClient } from '@prisma/client'
import {
  MailingAddress,
  MailingAddressTable,
} from '../db/mailing-address-table'
import * as yup from 'yup'
import { mailingAddressFactory, OrderFactoryMailingAddress } from '../factory'

const prisma = new PrismaClient()

const inputSchema = MailingAddress.omit(['id', 'createdAt', 'updatedAt'])

interface CreateMailingAddressConfig {
  mailingAddressTable: MailingAddressTable
}

export interface CreateMailingAddressFnInput {
  mailingAddress: yup.InferType<typeof inputSchema>
}

type CreateMailingAddressFn = (
  input: CreateMailingAddressFnInput,
) => Promise<OrderFactoryMailingAddress>

type MakeCreateMailingAddressFn = (
  config?: CreateMailingAddressConfig,
) => CreateMailingAddressFn

const makeCreateMailingAddress: MakeCreateMailingAddressFn =
  ({ mailingAddressTable } = { mailingAddressTable: prisma.mailingAddress }) =>
  async input => {
    const validInput = await inputSchema.validate(input.mailingAddress)

    const mailingAddressRecord = await mailingAddressTable.create({
      data: validInput,
    })

    return mailingAddressFactory({ mailingAddressRecord })
  }

export default makeCreateMailingAddress
