import React from 'react'
import { InlineTextForm, InlineTextFormProps } from 'ui'
import cx from 'classnames'
import * as yup from 'yup'

export interface SubscribeInlineProps {
  className?: string
  centered?: InlineTextFormProps<'email'>['centered']
}

const SubscribeInline = (props: SubscribeInlineProps) => {
  const subscribe = () => {}
  return (
    <InlineTextForm
      type="email"
      name="email"
      autoComplete="email"
      className={cx('mt-4', props.className)}
      placeholder="Enter your email"
      centered={props.centered}
      validation={yup
        .string()
        .email('🛑 This email address appears to be invalid')
        .required('Please provide an email')}
      action={{
        label: 'Subscribe',
        onClick: subscribe,
      }}
    />
  )
}

export default SubscribeInline
