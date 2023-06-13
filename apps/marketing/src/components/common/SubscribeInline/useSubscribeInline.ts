import { gql, useMutation } from '@apollo/client'
import {
  UseSubscribeInlineSubscribeMutation,
  UseSubscribeInlineSubscribeMutationVariables,
} from '@generated/UseSubscribeInlineSubscribeMutation'

const useSubscribeInline = () => {
  const [subscribe, subscribeMutation] = useMutation<
    UseSubscribeInlineSubscribeMutation,
    UseSubscribeInlineSubscribeMutationVariables
  >(SUBSCRIBE)

  const handleSubscribe = async (input: { email: string }) => {
    const res = await subscribe({
      variables: { input },
    })

    return res.data?.subscriberCreate?.subscriber
  }

  return [
    handleSubscribe,
    {
      subscriber: subscribeMutation.data?.subscriberCreate?.subscriber,
    },
  ] as const
}

const SUBSCRIBE = gql`
  mutation UseSubscribeInlineSubscribeMutation($input: SubscriberCreateInput!) {
    subscriberCreate(input: $input) {
      subscriber {
        id
        email
      }
    }
  }
`

export default useSubscribeInline
