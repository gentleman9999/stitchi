import { PaperPlane } from 'icons'
import React from 'react'
import cx from 'classnames'
import routes from '@/lib/routes'
import Link from 'next/link'
import { useNewsletterSubscribeForm } from '@/hooks'
import ComponentErrorMessage from '../ComponentErrorMessage'
import { LoadingDots } from '@/components/ui'

interface Props {}

export default function MobileDropdown(props: Props) {
  const { form, handleSubmit, submitError, submitLoading } =
    useNewsletterSubscribeForm()

  const [showSubscribe, setShowSubscribe] = React.useState(false)

  return (
    <div className="bg-paper border p-2 rounded-md flex flex-col items-center justify-between">
      <ul className="flex flex-col items-center gap-4 w-full">
        <NavLink label="Directory" href={routes.internal.directory.href()} />
        <NavLink label="Newsletter" href={routes.internal.newsletter.href()} />
        <li className="w-full mt-2">
          <form
            onSubmit={handleSubmit}
            className={cx('hidden sm:flex', { '!flex': showSubscribe })}
          >
            <div className="flex gap-2 w-full flex-wrap content-stretch">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                required
                type="email"
                className="rounded-md font-semibold py-1 px-2 flex-1"
                placeholder="youremail@example.com"
                autoComplete="email"
                {...form.register('email')}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="relative bg-gray-900 rounded-md text-paper py-1 px-2 font-semibold"
                >
                  <div className={cx({ 'opacity-0': submitLoading })}>
                    Try it
                  </div>
                  <div
                    className={cx(
                      'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center opacity-0',
                      { 'opacity-100': submitLoading },
                    )}
                  >
                    <i>
                      <LoadingDots />
                    </i>
                  </div>
                </button>
              </div>
            </div>
            {submitError ? (
              <div className="mt-1">
                <ComponentErrorMessage error={submitError} />
              </div>
            ) : null}

            {form.formState.errors.email?.message ? (
              <span className="mt-1 text-sm text-red-500">
                {form.formState.errors.email.message}
              </span>
            ) : null}
          </form>

          <button
            className={cx(
              'flex sm:hidden bg-gray-900 text-paper rounded-md font-semibold py-1 px-2 gap-1 items-center justify-center w-full',
              { hidden: showSubscribe },
            )}
            onClick={() => setShowSubscribe(prev => !prev)}
          >
            Subscribe <PaperPlane height={16} strokeWidth={2} />
          </button>
        </li>
      </ul>
    </div>
  )
}

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Link href={href} className="font-bold font text-2xl font-headingDisplay">
        {label}
      </Link>
    </li>
  )
}
