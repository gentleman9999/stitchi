import { PrismaClient } from '@prisma/client'
import {
  PaymentIntentTable,
  table as makePaymentIntentTable,
} from '../db/payment-intent-table'
import {
  paymentIntentFactory,
  PaymentIntentFactoryPaymentIntent,
} from '../factory'

const prisma = new PrismaClient()

interface GetPaymentIntentConfig {
  paymentIntentTable: PaymentIntentTable
}

type GetPaymentIntentFn = (input: {
  id?: string
  stripePaymentIntentId?: string
}) => Promise<PaymentIntentFactoryPaymentIntent>

type MakeGetPaymentIntentFn = (
  config?: GetPaymentIntentConfig,
) => GetPaymentIntentFn

const makeGetPaymentIntent: MakeGetPaymentIntentFn =
  (
    { paymentIntentTable } = {
      paymentIntentTable: makePaymentIntentTable(prisma),
    },
  ) =>
  async input => {
    if (!input.id && !input.stripePaymentIntentId) {
      throw new Error('Must provide either id or stripePaymentIntentId')
    }

    let paymentIntentRecord

    try {
      paymentIntentRecord = await paymentIntentTable.findFirst({
        where: {
          id: input.id,
          stripePaymentIntentId: input.stripePaymentIntentId,
        },
      })
    } catch (error) {
      console.error(`Failed to get payment intent for order: ${input.id}`, {
        context: { error },
      })
      throw new Error('Failed to get payment intent')
    }

    if (!paymentIntentRecord) {
      throw new Error('Payment intent not found')
    }

    return paymentIntentFactory({
      paymentIntentRecord,
    })
  }

export default makeGetPaymentIntent
