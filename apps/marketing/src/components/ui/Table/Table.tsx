import React from 'react'
import cx from 'classnames'
import LoadingDots from '../LoadingDots'

interface Props {
  children: React.ReactNode
  loading?: boolean
}

const Table = ({ children, loading }: Props) => {
  return (
    <div className="relative">
      {loading ? (
        <div className="absolute left-0 right-0 flex justify-center mt-8">
          <LoadingDots />
        </div>
      ) : null}

      <div
        className={cx('transition-all', {
          ['pointer-events-none blur-sm']: loading,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default Table
