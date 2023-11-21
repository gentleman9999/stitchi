import React from 'react'
import cx from 'classnames'
import * as yup from 'yup'
import dynamic from 'next/dynamic'
import { track } from '@lib/analytics'
import useSubscribeInline from './useSubscribeInline'
import { useLogger } from 'next-axiom'
import { InlineTextForm, InlineTextFormProps } from '@components/ui/inputs'

const SubscribeInlineSuccessAlert = dynamic(
  () => import('./SubscribeInlineSuccessAlert'),
  { ssr: false },
)

export interface SubscribeInlineProps {
  defaultValue?: string
  className?: string
  centered?: InlineTextFormProps<'email'>['centered']
  variant?: InlineTextFormProps<'email'>['variant']
}

const SubscribeInline = (props: SubscribeInlineProps) => {
  const { variant = 'secondary' } = props
  const logger = useLogger()
  const [subscribe, { subscriber }] = useSubscribeInline()

  const handleSubscribe: InlineTextFormProps<'email'>['onSubmit'] = async ({
    email,
  }) => {
    logger.info(`Subscribing ${email} to the mailing list`)
    track.mailingListSubscribeClicked({ email })

    await subscribe({ email })

    logger.info(`Subscribed ${email} to the mailing list`)
  }

  if (subscriber) {
    return (
      <SubscribeInlineSuccessAlert
        className={props.className}
        email={subscriber.email}
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
        variant={variant}
        className={cx(props.className)}
        placeholder="Enter your email"
        defaultValue={props.defaultValue}
        onSubmit={handleSubscribe}
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
