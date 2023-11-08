import React from 'react'
import cx from 'classnames'

const states = ['Placed', 'Approved', 'Printing', 'Shipping', 'Delivered']

interface Props {
  step: number
}

const Progress = ({ step }: Props) => {
  return (
    <>
      <div className="sm:sr-only mb-2 mt-4 text-bold text-3xl text-gray-700">
        {states[step]}.
      </div>
      <div className="grid grid-cols-10 bg-gray-200 rounded-full overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cx('w-0 h-2 bg-primary', {
              '!w-full': i < step * 2 + 1,
            })}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 font-medium text-sm !mt-1 text-gray-600 sr-only sm:not-sr-only">
        {states.map((state, i) => (
          <span
            className={cx('text-center', {
              '!text-left': i === 0,
              '!text-right': i === states.length - 1,
            })}
            key={state}
          >
            {state}
          </span>
        ))}
      </div>
    </>
  )
}

export default Progress
