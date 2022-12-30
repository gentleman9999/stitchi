import { Check } from 'icons'
import React from 'react'
import cx from 'classnames'

interface Props {
  email: string
  className?: string
}

const SubscribeInlineSuccessAlert = (props: Props) => {
  return (
    <div className={cx('rounded-md bg-primary p-4', props.className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Check className="h-5 w-5 text-secondary" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-md font-medium text-secondary">
            <u>{props.email}</u> successfully subscribed!
          </p>
        </div>
      </div>
    </div>
  )
}

export default SubscribeInlineSuccessAlert
