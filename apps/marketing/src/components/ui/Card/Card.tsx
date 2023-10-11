import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

const Card = ({ children, className, disabled }: Props) => {
  return (
    <div
      className={cx(
        'relative group overflow-hidden rounded-md bg-white sm:border  flex flex-col pb-4 md:pb-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Card
