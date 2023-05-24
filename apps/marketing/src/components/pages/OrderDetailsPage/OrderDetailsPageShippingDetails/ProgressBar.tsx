import React from 'react'
import cx from 'classnames'

interface Props {}

const ProgressBar = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-10 bg-gray-200 rounded-full overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cx('w-0 h-2 bg-primary', {
              '!w-full': i < 1,
            })}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 font-medium text-sm mt-1 text-gray-600">
        <span>Order placed</span>
        <span className="text-center">Awaiting approval</span>
        <span className="text-center">Printing</span>
        <span className="text-center">Shipping</span>
        <span className="text-right">Delivered</span>
      </div>
    </>
  )
}

export default ProgressBar
