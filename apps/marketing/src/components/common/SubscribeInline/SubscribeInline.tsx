import React from 'react'
import { InlineTextForm, InlineTextFormProps } from '@components/ui'
import cx from 'classnames'
import * as yup from 'yup'
import makeApi from '@lib/api'
import SubscribeInlineSuccessAlert from './SubscribeInlineSuccessAlert'

export interface SubscribeInlineProps {
  defaultValue?: string
  className?: string
  centered?: InlineTextFormProps<'email'>['centered']
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
      <SubscribeInlineSuccessAlert
        className={props.className}
        email={subscribedEmail}
      />
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
        variant="secondary"
        className={cx(props.className)}
        placeholder="Enter your email"
        defaultValue={props.defaultValue}
        onSubmit={subscribe}
        validation={yup
          .string()
          .email('🛑 This email address appears to be invalid')
          .required('Please provide an email')}
        actionLabel="Subscribe"
      />
    </div>
  )
}

export default SubscribeInline
