import { PrismaClient } from '@prisma/client'
import * as yup from 'yup'
import {
  PaymentIntent,
  PaymentIntentTable,
  table as makePaymentIntentTable,
} from '../db/payment-intent-table'
import {
  paymentIntentFactory,
  PaymentIntentFactoryPaymentIntent,
} from '../factory'

const inputSchema = PaymentIntent.omit([
  'createdAt',
  'updatedAt',
  'stripePaymentIntentId',
])

const prisma = new PrismaClient()

interface UpdatePaymentIntentConfig {
  paymentIntentTable: PaymentIntentTable
}

type UpdatePaymentIntentFn = (
  input: yup.InferType<typeof inputSchema>,
) => Promise<PaymentIntentFactoryPaymentIntent>

type MakeUpdatePaymentIntentFn = (
  config?: UpdatePaymentIntentConfig,
) => UpdatePaymentIntentFn

const makeUpdatePaymentIntent: MakeUpdatePaymentIntentFn =
  (
    { paymentIntentTable } = {
      paymentIntentTable: makePaymentIntentTable(prisma),
    },
  ) =>
  async input => {
    let paymentIntentRecord

    const validatedInput = await inputSchema.validate(input)

    try {
      paymentIntentRecord = await paymentIntentTable.update({
        where: {
          id: validatedInput.id,
        },
        data: {
          ...validatedInput,
        },
      })
    } catch (error) {
      console.error(
        `Failed to update payment intent for order: ${input.orderId}`,
        {
          context: { error },
        },
      )
      throw new Error('Failed to update payment intent')
    }

    return paymentIntentFactory({
      paymentIntentRecord,
    })
  }

export default makeUpdatePaymentIntent
