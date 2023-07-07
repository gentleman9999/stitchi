import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={cx(
        'overflow-hidden rounded-md bg-white sm:shadow-magical sm:border border-gray-100 flex flex-col pb-4 md:pb-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Card
