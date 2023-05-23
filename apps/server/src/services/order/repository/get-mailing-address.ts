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
) => Promise<OrderFactoryMailingAddress>

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

      if (!mailingAddressRecord) {
        throw new Error('Mailing address not found')
      }
    } catch (error) {
      console.error(
        `Failed to get mailing address: ${input.mailingAddressId}`,
        {
          context: { error },
        },
      )
      throw new Error('Failed to get mailing address')
    }

    return mailingAddressFactory({ mailingAddressRecord })
  }

export default makeGetMailingAddress
