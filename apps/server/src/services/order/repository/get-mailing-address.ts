import { PrismaClient } from '@prisma/client'
import { MailingAddressTable } from '../db/mailing-address-table'
import { mailingAddressFactory, OrderFactoryMailingAddress } from '../factory'

const prisma = new PrismaClient()

interface GetMailingAddressConfig {
  mailingAddressTable: MailingAddressTable
}

export interface GetMailingAddressFnInput {
  mailingAddressId: string
}

type GetMailingAddressFn = (
  input: GetMailingAddressFnInput,
) => Promise<OrderFactoryMailingAddress | null>

type MakeGetMailingAddressFn = (
  config?: GetMailingAddressConfig,
) => GetMailingAddressFn

const makeGetMailingAddress: MakeGetMailingAddressFn =
  ({ mailingAddressTable } = { mailingAddressTable: prisma.mailingAddress }) =>
  async input => {
    let mailingAddressRecord

    try {
      mailingAddressRecord = await mailingAddressTable.findUnique({
        where: {
          id: input.mailingAddressId,
        },
      })
    } catch (error) {
      console.error(
        `Failed to get mailing address: ${input.mailingAddressId}`,
        {
          context: { error },
        },
      )
      throw new Error('Failed to get mailing address')
    }

    if (!mailingAddressRecord) {
      return null
    }

    return mailingAddressFactory({ mailingAddressRecord })
  }

export default makeGetMailingAddress