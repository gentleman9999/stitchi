import makeCreatePaymentIntent from './create-payment-intent'
import makeListPaymentIntents from './list-payment-intents'
import makeUpdatePaymentIntent from './update-payment-intent'
import makeGetPaymentIntent from './get-payment-intent'

export interface PaymentIntentInit {}

export interface PaymentIntentRepository {
  createPaymentIntent: ReturnType<typeof makeCreatePaymentIntent>
  updatePaymentIntent: ReturnType<typeof makeUpdatePaymentIntent>
  listPaymentIntents: ReturnType<typeof makeListPaymentIntents>
  getPaymentIntent: ReturnType<typeof makeGetPaymentIntent>
}

type MakePaymentIntentRepositoryFn = (
  init?: PaymentIntentInit,
) => PaymentIntentRepository

const makePaymentIntentRepository: MakePaymentIntentRepositoryFn = init => ({
  createPaymentIntent: makeCreatePaymentIntent(),
  updatePaymentIntent: makeUpdatePaymentIntent(),
  listPaymentIntents: makeListPaymentIntents(),
  getPaymentIntent: makeGetPaymentIntent(),
})

export default makePaymentIntentRepository
