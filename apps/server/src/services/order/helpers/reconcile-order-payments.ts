import { logger } from '../../../telemetry'
import { PaymentClientService } from '../../payment'
import { RefundFactoryRefund } from '../../payment/factory'
import { Actor } from '../../types'
import { OrderRecordPaymentStatus } from '../db/order-table'
import { OrderFactoryOrder } from '../factory'
import { OrderRepository } from '../repository'

const getOrderPaymentStatus = ({
  totalAmountCents,
  totalAmountPaidCents,
  totalAmountRefundedCents,
}: {
  totalAmountCents: number
  totalAmountPaidCents: number
  totalAmountRefundedCents: number
}): OrderFactoryOrder['paymentStatus'] => {
  if (totalAmountCents === 0) {
    return OrderRecordPaymentStatus.NOT_PAID
  }

  if (totalAmountPaidCents === 0) {
    return OrderRecordPaymentStatus.NOT_PAID
  }

  if (totalAmountRefundedCents > 0) {
    if (totalAmountCents === totalAmountRefundedCents) {
      return OrderRecordPaymentStatus.REFUNDED
    } else {
      return OrderRecordPaymentStatus.PARTIALLY_REFUNDED
    }
  }

  if (totalAmountPaidCents >= totalAmountCents) {
    return OrderRecordPaymentStatus.PAID
  } else if (totalAmountPaidCents > 0) {
    return OrderRecordPaymentStatus.PARTIALLY_PAID
  }

  throw new Error('Failed to get order payment status')
}

const reconcileOrderPayments = async ({
  order,
  actor,
  orderRepository,
  paymentService,
}: {
  order: OrderFactoryOrder
  actor: Actor
  orderRepository: OrderRepository
  paymentService: PaymentClientService
}) => {
  let paymentIntents

  try {
    paymentIntents = await paymentService.listPaymentIntents({
      orderId: order.id,
    })
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to list payment intents')
  }

  let refunds: RefundFactoryRefund[] = []

  try {
    for (const paymentIntent of paymentIntents) {
      const refundList = await paymentService.listRefunds({
        paymentIntentId: paymentIntent.id,
      })

      refunds.push(...refundList)
    }
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to list refunds')
  }

  let totalAmountPaidCents = 0
  let totalAmountRefundedCents = 0

  for (const paymentIntent of paymentIntents) {
    switch (paymentIntent.status) {
      case 'succeeded':
        totalAmountPaidCents += paymentIntent.amount
        break
    }
  }

  for (const refund of refunds) {
    switch (refund.status) {
      case 'succeeded':
        totalAmountRefundedCents += refund.amount
        break
    }
  }

  let totalAmountDueCents = order.totalPriceCents - totalAmountPaidCents

  const paymentStatus = getOrderPaymentStatus({
    totalAmountCents: order.totalPriceCents,
    totalAmountPaidCents,
    totalAmountRefundedCents,
  })

  let updatedOrder

  try {
    updatedOrder = await orderRepository.updateOrder({
      actor,
      order: {
        ...order,
        totalAmountPaidCents,
        totalAmountRefundedCents,
        totalAmountDueCents,
        paymentStatus,
      },
    })
  } catch (error) {
    logger
      .child({
        context: { error },
      })
      .error(`Failed to update order ${order.id}`)
    throw new Error('Failed to update order')
  }

  return updatedOrder
}

export { reconcileOrderPayments }
