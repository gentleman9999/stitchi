import React from 'react'
import { InlineTextForm, InlineTextFormProps } from 'ui'
import cx from 'classnames'
import * as yup from 'yup'
import api from '@lib/api'
import SubscribeInlineSuccessAlert from './SubscribeInlineSuccessAlert'

export interface SubscribeInlineProps {
  defaultValue?: string
  className?: string
  centered?: InlineTextFormProps<'email'>['centered']
}

const SubscribeInline = (props: SubscribeInlineProps) => {
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
    <InlineTextForm
      type="email"
      name="email"
      autoComplete="email"
      className={cx('mt-4', props.className)}
      placeholder="Enter your email"
      centered={props.centered}
      defaultValue={props.defaultValue}
      onSubmit={subscribe}
      validation={yup
        .string()
        .email('🛑 This email address appears to be invalid')
        .required('Please provide an email')}
      actionLabel="Subscribe"
    />
  )
}

export default SubscribeInline
