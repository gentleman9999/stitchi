'use client'

import { Container, LoadingDots } from '@/components/ui'
import React from 'react'
import { ArrowRight } from 'icons'
import { useNewsletterSubscribeForm } from '@/hooks'
import { ComponentErrorMessage } from '@/components/common'
import cx from 'classnames'

interface Props {}

const SubscribeBanner = () => {
  const { form, handleSubmit, submitError, submitLoading } =
    useNewsletterSubscribeForm()

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <div className=" bg-primary rounded-md w-full">
          <div className="py-2 px-4 grid grid-cols-2 sm:grid-cols-6 font-bold gap-2">
            <div className="col-span-2 flex items-center text-white">
              <span>Get weekly emails</span>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <input
                required
                autoComplete="email"
                placeholder="Your email address"
                className="w-full text-center py-2 px-3 bg-gray-100 rounded-md outline-primary"
                {...form.register('email')}
              />
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <button className="relative" type="submit">
                <div
                  className={cx('flex items-center group text-white', {
                    'opacity-0': submitLoading,
                  })}
                >
                  Sign up{' '}
                  <div className="relative">
                    <div>
                      <ArrowRight
                        strokeWidth={3}
                        height={16}
                        className="ml-1 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
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
          </div>
        </div>

        {form.formState.errors.email?.message ? (
          <p className="text-red-500 text-sm mt-2 text-center">
            {form.formState.errors.email?.message}
          </p>
        ) : null}

        {submitError ? (
          <div className="mt-2">
            <ComponentErrorMessage error={submitError} />
          </div>
        ) : null}
      </Container>
    </form>
  )
}

export default SubscribeBanner
