import { PrismaClient } from '@prisma/client'
import {
  PaymentIntent,
  PaymentIntentTable,
  table as makePaymentIntentTable,
} from '../db/payment-intent-table'
import {
  paymentIntentFactory,
  PaymentIntentFactoryPaymentIntent,
} from '../factory'
import * as yup from 'yup'

const inputSchema = PaymentIntent.omit(['id', 'createdAt', 'updatedAt'])

const prisma = new PrismaClient()

interface CreatePaymentIntentConfig {
  paymentIntentTable: PaymentIntentTable
}

type CreatePaymentIntentFn = (
  input: yup.InferType<typeof inputSchema>,
) => Promise<PaymentIntentFactoryPaymentIntent>

type MakeCreatePaymentIntentFn = (
  config?: CreatePaymentIntentConfig,
) => CreatePaymentIntentFn

const makeCreatePaymentIntent: MakeCreatePaymentIntentFn =
  (
    { paymentIntentTable } = {
      paymentIntentTable: makePaymentIntentTable(prisma),
    },
  ) =>
  async input => {
    let paymentIntentRecord

    const validatedInput = await inputSchema.validate(input)

    try {
      paymentIntentRecord = await paymentIntentTable.create({
        data: {
          ...validatedInput,
        },
      })
    } catch (error) {
      console.error(
        `Failed to create payment intent for order: ${input.orderId}`,
        {
          context: { error },
        },
      )
      throw new Error('Failed to create payment intent')
    }

    return paymentIntentFactory({
      paymentIntentRecord,
    })
  }

export default makeCreatePaymentIntent
