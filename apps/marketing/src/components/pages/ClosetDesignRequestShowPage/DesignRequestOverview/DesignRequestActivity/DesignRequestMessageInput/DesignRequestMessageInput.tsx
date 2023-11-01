import { gql } from '@apollo/client'
import UserAvatar from '@components/common/UserAvatar'
import { DesignRequestMessageInputDesignRequestFragment } from '@generated/DesignRequestMessageInputDesignRequestFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import { PaperClip } from 'icons'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import cx from 'classnames'
import useDesignRequestMessageInput from './useDesignRequestMessageInput'
import { useAuthorizedComponent } from '@lib/auth'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import Button from '@components/ui/ButtonV2/Button'
import { FileInput } from '@components/ui/inputs'
import Checkbox from '@components/ui/inputs/Checkbox'

interface Props {
  loading: boolean
  designRequest?: DesignRequestMessageInputDesignRequestFragment | null
}

const DesignRequestMessageInput = ({ designRequest, loading }: Props) => {
  const { can } = useAuthorizedComponent()

  const { handleSubmitRevisionRequest, handleSubmitComment } =
    useDesignRequestMessageInput()

  const handleSubmit = async (values: FormValues) => {
    if (!designRequest?.id) {
      return
    }

    if (values.isRevisionRequest) {
      await handleSubmitRevisionRequest({
        description: values.message,
        fileIds: values.fileIds,
        designRequestId: designRequest.id,
      })
    } else {
      await handleSubmitComment({
        message: values.message,
        fileIds: values.fileIds,
        designRequestId: designRequest.id,
      })
    }
  }

  const canCreateRevisionRequest = can(
    ScopeResource.DesignRequestRevisionRequest,
    ScopeAction.CREATE,
  )

  return (
    <div className="flex gap-x-4">
      <UserAvatar user={designRequest?.membership?.user} />
      <Form
        loading={loading}
        onSubmit={handleSubmit}
        uploadFolder={designRequest?.fileUploadDirectory}
        canCreateRevisionRequest={canCreateRevisionRequest}
      />
    </div>
  )
}

const schema = yup.object().shape({
  message: yup.string().required(),
  isRevisionRequest: yup.boolean().required(),
  fileIds: yup.array().of(yup.string().uuid().required()).required(),
})

type FormValues = yup.InferType<typeof schema>

const Form = ({
  loading,
  uploadFolder,
  onSubmit,
  canCreateRevisionRequest,
}: {
  loading: boolean
  uploadFolder?: string
  canCreateRevisionRequest: boolean
  onSubmit: (values: FormValues) => Promise<void>
}) => {
  const [showFileInput, setShowFileInput] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      message: '',
      isRevisionRequest: true,
      fileIds: [],
    },
  })

  React.useEffect(() => {
    if (!canCreateRevisionRequest) {
      form.setValue('isRevisionRequest', false)
    }
  }, [canCreateRevisionRequest, form])

  const handleSubmit = form.handleSubmit(async data => {
    setSubmitting(true)

    try {
      await onSubmit(data)
      form.reset()
      setShowFileInput(false)
    } finally {
      setSubmitting(false)
    }
  })

  const [isRevisionRequest] = form.watch(['isRevisionRequest'])

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex-auto ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 rounded-md shadow-sm bg-paper"
    >
      <div className="overflow-hidden">
        <label htmlFor="comment" className="sr-only">
          Add your comment
        </label>
        <Controller
          name="message"
          control={form.control}
          render={({ field }) => (
            <textarea
              rows={4}
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              {...field}
            />
          )}
        />
      </div>

      <Controller
        name="fileIds"
        control={form.control}
        render={({ field }) =>
          showFileInput && uploadFolder ? (
            <div className="p-2 border-t">
              <FileInput
                keepUploadStatus
                fileIds={field.value}
                onChange={field.onChange}
                folder={uploadFolder}
              />
            </div>
          ) : (
            <></>
          )
        }
      />
      <div className="flex flex-wrap gap-4 justify-between py-2 pl-3 pr-2 border-t">
        <div className="flex items-center space-x-5">
          <button
            type="button"
            className="flex items-center justify-center gap-1 rounded-full text-gray-400 hover:text-gray-500"
            disabled={loading || !uploadFolder}
            onClick={() => setShowFileInput(!showFileInput)}
          >
            <PaperClip className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm">Attach files</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <Controller
            name="isRevisionRequest"
            control={form.control}
            render={({ field }) => (
              <div
                className={cx({
                  invisible: !canCreateRevisionRequest || loading,
                })}
              >
                <Checkbox
                  {...field}
                  size={1}
                  className="text-sm"
                  label="Request Revision"
                  value={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <Button
            variant="ghost"
            disabled={loading}
            type="submit"
            loading={submitting || loading}
          >
            {isRevisionRequest ? 'Request revision' : 'Comment'}
          </Button>
        </div>
      </div>
    </form>
  )
}

DesignRequestMessageInput.fragments = {
  designRequest: gql`
    ${UserAvatar.fragments.user}
    fragment DesignRequestMessageInputDesignRequestFragment on DesignRequest {
      id
      fileUploadDirectory
      membership {
        id
        user {
          id
          ...UserAvatarUserFragment
        }
      }
    }
  `,
}

export default DesignRequestMessageInput
