import React from 'react'
import cx from 'classnames'
import { DesignRequestStatus } from '@generated/globalTypes'

const statuses = [
  DesignRequestStatus.DRAFT,
  DesignRequestStatus.SUBMITTED,
  DesignRequestStatus.AWAITING_APPROVAL,
  DesignRequestStatus.AWAITING_REVISION,
  DesignRequestStatus.APPROVED,
]

interface Props {
  status?: DesignRequestStatus | null
}

const ProgressBar = ({ status }: Props) => {
  const step = status ? statuses.indexOf(status) : 0

  return (
    <>
      <div className="sm:sr-only mb-2 mt-4 text-bold text-3xl text-gray-700">
        {statuses[step]}.
      </div>
      <div className="grid grid-cols-10 bg-gray-200 rounded-full overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={cx('w-0 h-2 bg-primary', {
              '!w-full': i < step * 2 + 1 || step === 4,
              'bg-purple-400': step === 0 || step === 3,
              'bg-blue-400': step === 1 || step === 2,
            })}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 font-medium text-sm !mt-1 text-gray-600 sr-only sm:not-sr-only">
        {statuses.map((status, i) => (
          <span
            className={cx('text-center', {
              '!text-left': i === 0,
              '!text-right': i === statuses.length - 1,
            })}
            key={status}
          >
            {humanizeStatus(status)}
          </span>
        ))}
      </div>
    </>
  )
}

const humanizeStatus = (status: (typeof statuses)[number]) => {
  switch (status) {
    case DesignRequestStatus.DRAFT:
      return 'Draft'
    case DesignRequestStatus.SUBMITTED:
      return 'Submitted'
    case DesignRequestStatus.AWAITING_APPROVAL:
      return 'Awaiting approval'
    case DesignRequestStatus.AWAITING_REVISION:
      return 'Awaiting revision'
    case DesignRequestStatus.APPROVED:
      return 'Approved'
  }
}

export default ProgressBar
