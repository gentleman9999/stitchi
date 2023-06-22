import { gql } from '@apollo/client'
import cx from 'classnames'
import { DesignRequestHistoryDesignRequestFragment } from '@generated/DesignRequestHistoryDesignRequestFragment'
import { formatDistanceToNow } from 'date-fns'
import UserAvatar from '@components/common/UserAvatar'
import { PaintBrush } from 'icons'

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
              <UserAvatar width="w-6" height="h-6" user={item.sender} />

              <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {item.viewerIsSender
                        ? 'You'
                        : item.sender?.name || 'Unknown'}
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

          {item.__typename === 'DesignRequestProof' ? (
            <>
              <div className="relative bg-gray-50 rounded-full w-6 h-6 flex-none">
                <div className="flex items-center justify-center h-full">
                  <PaintBrush
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2 rounded-md p-3 ring-1 ring-inset ring-gray-200">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {item.artist?.name}
                    </span>{' '}
                    submitted a proof
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
                <div className="flex gap-2">
                  {Array.from(new Array(3)).map((_, index) => (
                    <div
                      key={index}
                      className=" bg-gray-100 rounded-md h-24 w-24"
                    />
                  ))}
                </div>

                <div className="flex justify-between gap-x-4 text-sm border-t pt-2">
                  <span className="font-semibold">Artist note</span>
                  <p className=" leading-6 text-gray-500">{item.artistNote}</p>
                </div>
              </div>
            </>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

DesignRequestHistory.fragments = {
  designRequest: gql`
    ${UserAvatar.fragments.user}
    fragment DesignRequestHistoryDesignRequestFragment on DesignRequest {
      id
      history {
        ... on ConversationMessage {
          id
          content
          createdAt
          viewerIsSender

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
            ...UserAvatarUserFragment
          }
        }

        ... on DesignRequestProof {
          id
          createdAt
          artistNote

          artist {
            id
            name
          }
        }
      }
    }
  `,
}

export default DesignRequestHistory
