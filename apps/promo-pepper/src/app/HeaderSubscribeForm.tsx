'use client'

import { useNewsletterSubscribeForm } from '@/hooks'
import React from 'react'
import cx from 'classnames'
import { LoadingDots } from '@/components/ui'
import { ComponentErrorMessage } from '@/components/common'

interface Props {}

export default function HeaderSubscribeForm(props: Props) {
  const { form, handleSubmit, submitError, submitLoading } =
    useNewsletterSubscribeForm()

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:rounded-md sm:overflow-hidden mt-10 sm:shadow-2xl w-full max-w-sm">
        <label className="sr-only" htmlFor="name">
          Email address
        </label>
        <input
          required
          placeholder="youremail@example.com"
          autoComplete="email"
          className="py-1 px-3 sm:py-3 sm:px-6 rounded-md sm:rounded-r-none text-lg sm:focus:outline-black flex-1 outline sm:outline-none"
          {...form.register('email')}
        />
        <button
          type="submit"
          className="relative bg-gray-800 text-white text-lg py-1 px-3 sm:py-3 sm:px-6 font-medium rounded-md sm:rounded-l-none"
        >
          <div className={submitLoading ? 'opacity-0' : ''}>Try it</div>
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

      {submitError ? (
        <div className="mt-2">
          <ComponentErrorMessage error={submitError} />
        </div>
      ) : null}

      {form.formState.errors.email?.message ? (
        <p className="text-red-500 text-sm mt-2">
          {form.formState.errors.email?.message}
        </p>
      ) : null}
    </form>
  )
}
