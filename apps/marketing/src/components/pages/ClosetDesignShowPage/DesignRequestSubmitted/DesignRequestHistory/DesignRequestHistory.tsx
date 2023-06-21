import { gql } from '@apollo/client'
import cx from 'classnames'
import { DesignRequestHistoryDesignRequestFragment } from '@generated/DesignRequestHistoryDesignRequestFragment'
import { format, formatDistanceToNow } from 'date-fns'

interface Props {
  designRequest: DesignRequestHistoryDesignRequestFragment
}

const DesignRequestHistory = ({ designRequest }: Props) => {
  return (
    <ul role="list" className="space-y-6">
      {designRequest.history.map((item, index) => (
        <li key={item.id} className="relative flex gap-x-4">
          <div
            className={cx(
              index === designRequest.history.length - 1 ? 'h-6' : '-bottom-6',
              'absolute left-0 top-0 flex w-6 justify-center',
            )}
          >
            <div className="w-px bg-gray-200" />
          </div>

          {item.__typename === 'ConversationMessage' ? (
            <>
              {item.sender?.picture ? (
                <img
                  src={item.sender?.picture}
                  alt={item.sender?.name || 'sender'}
                  className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                />
              ) : null}

              <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {item.sender?.name}
                    </span>{' '}
                    commented
                  </div>
                  <time
                    dateTime={item.createdAt}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </time>
                </div>
                <p className="text-sm leading-6 text-gray-500">
                  {item.content}
                </p>
              </div>
            </>
          ) : null}

          {item.__typename === 'DesignRequestHistoryItemDesignRequestEvent' ? (
            <>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                {/* {activityItem.type === 'paid' ? (
                      <CheckCircleIcon
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    ) : ( */}
                <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                {/* )} */}
              </div>
              <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                <span className="font-medium text-gray-900">
                  {item.user?.name}
                </span>{' '}
                {item.method === 'CREATE' ? 'created' : ''} the design request.
              </p>
              <time
                dateTime={item.timestamp}
                className="flex-none py-0.5 text-xs leading-5 text-gray-500"
              >
                {formatDistanceToNow(new Date(item.timestamp), {
                  addSuffix: true,
                })}
              </time>
            </>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

DesignRequestHistory.fragments = {
  designRequest: gql`
    fragment DesignRequestHistoryDesignRequestFragment on DesignRequest {
      id
      history {
        ... on ConversationMessage {
          id
          content
          createdAt

          sender {
            id
            picture
            name
          }
        }

        ... on DesignRequestHistoryItemDesignRequestEvent {
          id
          timestamp
          method
          user {
            id
            name
            picture
          }
        }
      }
    }
  `,
}

export default DesignRequestHistory
