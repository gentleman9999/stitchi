import React from 'react'
import cx from 'classnames'

interface Props {
  className?: string
}

export default function Skeleton(props: Props) {
  return (
    <div
      className={cx(
        'animate-pulse h-2 bg-gray-200 rounded-lg w-full',
        props.className,
      )}
      role="status"
    />
  )
}
