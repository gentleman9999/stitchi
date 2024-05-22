import { gql, useMutation } from '@apollo/client'
import {
  UseMarkNotificationAsSeenMarkAsSeenMutation,
  UseMarkNotificationAsSeenMarkAsSeenMutationVariables,
} from '@generated/UseMarkNotificationAsSeenMarkAsSeenMutation'

interface Props {
  notificationId: string
}

const useMarkNotificationAsSeen = ({ notificationId }: Props) => {
  const [markAsSeen, markAsSeenMutation] = useMutation<
    UseMarkNotificationAsSeenMarkAsSeenMutation,
    UseMarkNotificationAsSeenMarkAsSeenMutationVariables
  >(MARK_AS_SEEN, {})

  const handleMarkAsSeen = async () => {
    await markAsSeen({
      variables: {
        input: {
          notificationId,
        },
      },
    })
  }

  return [handleMarkAsSeen, markAsSeenMutation] as const
}

const MARK_AS_SEEN = gql`
  mutation UseMarkNotificationAsSeenMarkAsSeenMutation(
    $input: NotificationMarkAsSeenInput!
  ) {
    notificationMarkAsSeen(input: $input) {
      notification {
        id
      }
    }
  }
`

export default useMarkNotificationAsSeen
