import { PrismaClient } from '@prisma/client'
import {
  PaymentIntentRecordStatus,
  PaymentIntentTable,
  table as makePaymentIntentTable,
} from '../db/payment-intent-table'
import {
  paymentIntentFactory,
  PaymentIntentFactoryPaymentIntent,
} from '../factory'

const prisma = new PrismaClient()

interface ListPaymentIntentsConfig {
  paymentIntentTable: PaymentIntentTable
}

type ListPaymentIntentsFn = (input: {
  filter?: {
    where?: {
      orderId?: { equals?: string }
      stripePaymentIntentStatus?: { equals?: PaymentIntentRecordStatus }
    }
  }
}) => Promise<PaymentIntentFactoryPaymentIntent[]>

type MakeListPaymentIntentsFn = (
  config?: ListPaymentIntentsConfig,
) => ListPaymentIntentsFn

const makeListPaymentIntents: MakeListPaymentIntentsFn =
  (
    { paymentIntentTable } = {
      paymentIntentTable: makePaymentIntentTable(prisma),
    },
  ) =>
  async ({ filter }) => {
    const paymentIntentRecords = await paymentIntentTable.findMany({
      where: {
        orderId: {
          equals: filter?.where?.orderId?.equals,
        },
        stripePaymentIntentStatus: {
          equals: filter?.where?.stripePaymentIntentStatus?.equals,
        },
      },
    })

    return paymentIntentRecords.map(paymentIntentRecord =>
      paymentIntentFactory({
        paymentIntentRecord,
      }),
    )
  }

export default makeListPaymentIntents
