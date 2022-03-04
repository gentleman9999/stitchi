import React from 'react'
import { InlineTextForm, InlineTextFormProps } from 'ui'
import cx from 'classnames'
import * as yup from 'yup'
import makeApi from '@lib/api'
import SubscribeInlineSuccessAlert from './SubscribeInlineSuccessAlert'
import Link from 'next/link'
import routes from '@lib/routes'

export interface SubscribeInlineProps {
  defaultValue?: string
  className?: string
  centered?: InlineTextFormProps<'email'>['centered']
  privacyPolicyClassName?: string
}

const SubscribeInline = (props: SubscribeInlineProps) => {
  const [api] = React.useState(makeApi())
  const [subscribedEmail, setSubscribeEmail] = React.useState<string | null>(
    null,
  )

  const subscribe: InlineTextFormProps<'email'>['onSubmit'] = async ({
    email,
  }) => {
    console.info(`Subscribing ${email} to the mailing list`)

    await api.mailingListSubscription.create({ email })

    console.info(`Subscribed ${email} to the mailing list`)

    setSubscribeEmail(email)
  }

  if (subscribedEmail) {
    return (
      <SubscribeInlineSuccessAlert className="mt-4" email={subscribedEmail} />
    )
  }

  return (
    <div
      className={cx('flex flex-col items-start', {
        'items-center': props.centered,
      })}
    >
      <InlineTextForm
        type="email"
        name="email"
        autoComplete="email"
        variant="primary"
        className={cx('mt-4', props.className)}
        placeholder="Enter your email"
        defaultValue={props.defaultValue}
        onSubmit={subscribe}
        validation={yup
          .string()
          .email('🛑 This email address appears to be invalid')
          .required('Please provide an email')}
        actionLabel="Subscribe"
      />
      <p
        className={cx(
          'mt-3 text-sm text-gray-500',
          props.privacyPolicyClassName,
        )}
      >
        We care about the protection of your data. Read our{' '}
        <Link href={routes.internal.legal.privacy.href()}>
          <a className="font-medium underline">Privacy Policy.</a>
        </Link>
      </p>
    </div>
  )
}

export default SubscribeInline
