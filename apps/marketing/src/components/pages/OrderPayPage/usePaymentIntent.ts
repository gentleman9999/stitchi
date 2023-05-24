import { gql, useMutation } from '@apollo/client'
import {
  UsePaymentIntentCreatePaymentIntentMutation,
  UsePaymentIntentCreatePaymentIntentMutationVariables,
} from '@generated/UsePaymentIntentCreatePaymentIntentMutation'
import React from 'react'

interface Props {
  orderId: string
}

const usePaymentIntent = ({ orderId }: Props) => {
  const [createIntent, { data }] = useMutation<
    UsePaymentIntentCreatePaymentIntentMutation,
    UsePaymentIntentCreatePaymentIntentMutationVariables
  >(CREATE_PAYMENT_INTENT)

  React.useEffect(() => {
    createIntent({ variables: { input: { orderId } } })
  }, [createIntent, orderId])

  return data?.paymentIntentCreate?.paymentIntent || null
}

const CREATE_PAYMENT_INTENT = gql`
  mutation UsePaymentIntentCreatePaymentIntentMutation(
    $input: PaymentIntentCreateInput!
  ) {
    paymentIntentCreate(input: $input) {
      paymentIntent {
        id
        clientSecret
        amount
      }
    }
  }
`

export default usePaymentIntent
