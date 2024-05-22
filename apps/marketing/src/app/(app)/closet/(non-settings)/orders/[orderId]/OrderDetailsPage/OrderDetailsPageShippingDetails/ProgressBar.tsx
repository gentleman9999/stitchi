import React from 'react'
import cx from 'classnames'
import { OrderStatusTemporary } from '@generated/types'

const states = [
  {
    value: OrderStatusTemporary.UNCONFIRMED,
    label: 'Received',
  },
  {
    value: OrderStatusTemporary.CONFIRMED,
    label: 'Approved',
  },
  {
    value: OrderStatusTemporary.IN_PRODUCTION,
    label: 'Printing',
  },
  {
    value: OrderStatusTemporary.IN_FULFILLMENT,
    label: 'Shipping',
  },
  {
    value: OrderStatusTemporary.COMPLETED,
    label: 'Delivered',
  },
]

interface Props {
  step: OrderStatusTemporary
}

const Progress = ({ step }: Props) => {
  const stepIndex = states.findIndex(state => state.value === step)

  return (
    <>
      <div className="sm:sr-only mb-2 mt-4 text-bold text-3xl text-gray-700">
        {states[stepIndex].label}.
      </div>
      <div className="grid grid-cols-10 bg-gray-200 rounded-full overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cx('w-0 h-2 bg-primary', {
              '!w-full': i < stepIndex * 2 + 1 || stepIndex === 4,
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
            key={state.value}
          >
            {state.label}
          </span>
        ))}
      </div>
    </>
  )
}

export default Progress
