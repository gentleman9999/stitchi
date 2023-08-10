import { LoadingDots } from '@components/ui'
import React from 'react'
import cx from 'classnames'
import { Check } from 'icons'

interface Props {
  saving?: boolean
}

const SaveStateIndicator = ({ saving }: Props) => {
  return (
    <div
      className={cx(
        'text-xs inline-flex items-center gap-1 px-1 border rounded-full text-gray-400',
        {
          'pr-0.5': !saving,
        },
      )}
    >
      {saving ? (
        <>
          Saving <LoadingDots dotClassName="!w-0.5 !h-0.5" />
        </>
      ) : (
        <>
          Saved{' '}
          <Check
            className="w-3 h-3 bg-primary rounded-full p-0.5"
            strokeWidth={3}
          />
        </>
      )}
    </div>
  )
}

export default SaveStateIndicator
