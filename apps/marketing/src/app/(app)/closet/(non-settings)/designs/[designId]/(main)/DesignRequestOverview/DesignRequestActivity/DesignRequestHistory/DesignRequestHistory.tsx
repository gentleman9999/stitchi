import { gql } from '@apollo/client'
import cx from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import UserAvatar from '@components/common/UserAvatar'
import { ArrowPath, PaintBrush } from 'icons'
import Skeleton from '@components/ui/Skeleton'
import ReferenceFilesPreview from '../../ReferenceFilesPreview'
import { DesignRequestHistoryDesignRequestFragment } from '@generated/types'

interface Props {
  loading: boolean
  designRequest?: DesignRequestHistoryDesignRequestFragment | null
}

const DesignRequestHistory = ({ loading, designRequest }: Props) => {
  const history = [...(designRequest?.history || [])].reverse()

  return (
    <ul role="list" className="space-y-6">
      {loading && !designRequest ? (
        <li className="relative flex gap-x-4">
          <div
            className={cx(
              'h-6',
              'absolute left-0 top-0 flex w-6 justify-center',
            )}
          >
            <div className="w-px bg-gray-200" />
          </div>

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
              <Skeleton className="w-20" />
            </p>
          </>
        </li>
      ) : null}
      {history.map((item, index) => (
        <li key={item.id} className="relative flex gap-x-4">
          <div
            className={cx(
              index === history.length - 1 ? 'h-6' : '-bottom-6',
              'absolute left-0 top-0 flex w-6 justify-center',
            )}
          >
            <div className="w-px bg-gray-200" />
          </div>

          {item.__typename === 'ConversationMessage' ? (
            <>
              <UserAvatar
                width="w-6"
                height="h-6"
                user={
                  item.sender?.user || {
                    name: 'Stitchi',
                    picture: '/stitchi_icon.svg',
                  }
                }
              />

              <div className="flex-auto rounded-sm p-3 ring-1 ring-inset ring-gray-200 bg-paper">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {item.viewerIsSender
                        ? 'You'
                        : item.sender?.user?.name || 'Stitchi'}
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
                  {item.message}
                </p>
                {item.files.length ? (
                  <div className="flex gap-2 mt-2">
                    <ReferenceFilesPreview
                      files={item.files.map(file => ({
                        ...file,
                        bytes: file.humanizedBytes,
                      }))}
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : null}

          {item.__typename === 'DesignRequestHistoryItemDesignRequestEvent' ? (
            <>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-gray-50">
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
                  {item.actor?.user?.name}
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

          {item.__typename === 'DesignProof' ? (
            <>
              <div className="relative bg-gray-50 rounded-full w-6 h-6 flex-none">
                <div className="flex items-center justify-center h-full">
                  <PaintBrush
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2 rounded-sm p-3 ring-1 ring-inset ring-gray-200 bg-paper">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {item.artist?.user?.name}
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
                  {item.primaryImageFile ? (
                    <img
                      src={item.primaryImageFile.url}
                      width={item.primaryImageFile.width}
                      height={item.primaryImageFile.height}
                      key={index}
                      className=" bg-gray-100 rounded-sm h-24 w-24 object-contain overflow-hidden"
                    />
                  ) : null}
                </div>
              </div>
            </>
          ) : null}

          {item.__typename === 'DesignRequestRevisionRequest' ? (
            <>
              <div className="relative bg-gray-50 rounded-full w-6 h-6 flex-none">
                <div className="flex items-center justify-center h-full">
                  <ArrowPath
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2 rounded-sm p-3 ring-1 ring-inset ring-gray-200 bg-paper">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {item.membership?.user?.name}
                    </span>{' '}
                    requested a revision
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
                <div className="flex justify-between gap-x-4 text-sm border-t pt-2">
                  <p className=" leading-6 text-gray-500">{item.description}</p>
                </div>
                {item.files.length ? (
                  <div className="flex gap-2">
                    <ReferenceFilesPreview
                      files={item.files.map(file => ({
                        ...file,
                        bytes: file.humanizedBytes,
                      }))}
                    />
                  </div>
                ) : null}
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
          message
          createdAt
          viewerIsSender

          files {
            id
            humanizedBytes
            name
            url
            fileType

            ... on FileImage {
              url
              width
              height
            }
          }

          sender {
            id
            user {
              id
              picture
              name
            }
          }
        }

        ... on DesignRequestHistoryItemDesignRequestEvent {
          id
          timestamp
          method
          actor {
            id
            user {
              id
              ...UserAvatarUserFragment
            }
          }
        }

        ... on DesignProof {
          id
          createdAt

          artist {
            id
            user {
              id
              name
            }
          }

          primaryImageFile {
            id
            url
            width
            height
          }
        }

        ... on DesignRequestRevisionRequest {
          id
          createdAt
          description
          files {
            id
            humanizedBytes
            name
            url
            fileType
            ... on FileImage {
              url
              width
              height
            }
          }
          membership {
            id
            user {
              id
              name
            }
          }
        }
      }
    }
  `,
}

export default DesignRequestHistory
