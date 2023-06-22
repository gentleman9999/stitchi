import { gql } from '@apollo/client'
import UserAvatar from '@components/common/UserAvatar'
import { Checkbox } from '@components/ui'
import { DesignRequestMessageInputDesignRequestFragment } from '@generated/DesignRequestMessageInputDesignRequestFragment'
import { PaperClip } from 'icons'
import React from 'react'

interface Props {
  designRequest: DesignRequestMessageInputDesignRequestFragment
}

const DesignRequestMessageInput = ({ designRequest }: Props) => {
  return (
    <div className="flex gap-x-3">
      <UserAvatar user={designRequest.user} />
      <form action="#" className="relative flex-auto">
        <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={2}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
            defaultValue={''}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2 border-t">
          <div className="flex items-center space-x-5">
            <button
              type="button"
              className="flex items-center justify-center gap-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <PaperClip className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm">Attach a file</span>
            </button>
          </div>
          <div className="flex gap-6 items-center">
            <Checkbox
              size={1}
              className="text-sm"
              name="request_revision"
              label="Request Revision"
              value="request_revision"
              checked={true}
              onChange={() => {}}
            />
            <button
              type="submit"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

DesignRequestMessageInput.fragments = {
  designRequest: gql`
    ${UserAvatar.fragments.user}
    fragment DesignRequestMessageInputDesignRequestFragment on DesignRequest {
      id
      user {
        id
        ...UserAvatarUserFragment
      }
    }
  `,
}

export default DesignRequestMessageInput
