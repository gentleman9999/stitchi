'use client'
import { ComponentErrorMessage } from '@/components/common'
import { useNewsletterSubscribeForm } from '@/hooks'
import React from 'react'
import cx from 'classnames'
import { LoadingDots } from '@/components/ui'

interface Props {
  onSubmit: () => void
}

export default function PrimaryNavigationSubscribeOverlay(props: Props) {
  const { form, handleSubmit, submitError, submitLoading } =
    useNewsletterSubscribeForm()

  const handleSubscribe: React.FormEventHandler<HTMLFormElement> = async e => {
    await handleSubmit(e)
    props.onSubmit()
  }

  return (
    <form className="p-4 rounded-md border bg-white" onSubmit={handleSubscribe}>
      <div className="flex gap-2">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          required
          type="email"
          id="email"
          className="rounded-md font-semibold py-1 px-2"
          placeholder="youremail@example.com"
          {...form.register('email')}
        />
        <button
          type="submit"
          className="bg-gray-900 rounded-md text-paper py-1 px-2 font-semibold"
        >
          <div
            className={cx({
              'opacity-0': submitLoading,
            })}
          >
            Try it
          </div>
          <div
            className={cx(
              'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0',
              {
                'opacity-100': submitLoading,
              },
            )}
          >
            <i>
              <LoadingDots />
            </i>
          </div>
        </button>
      </div>

      {submitError && (
        <div className="mt-1">
          <ComponentErrorMessage error={submitError} />
        </div>
      )}

      {form.formState.errors.email?.message ? (
        <div className="mt-1 text-red-500 text-sm">
          {form.formState.errors.email.message}
        </div>
      ) : null}
    </form>
  )
}
