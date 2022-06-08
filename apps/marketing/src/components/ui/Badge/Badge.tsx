import React from 'react'
import cx from 'classnames'

export interface BadgeProps {
  label: string
  onClose?: () => void
  size?: 'small' | 'normal'
  className?: string
}

const Badge = ({ label, onClose, className, size = 'normal' }: BadgeProps) => {
  return (
    <span
      className={cx(
        'm-1 inline-flex rounded-full border border-gray-200 items-center font-medium bg-white text-gray-900',
        { 'pr-2': Boolean(onClose) },
        { 'py-1.5 px-3 text-sm': size === 'normal' },
        { 'py-0.5 px-2 text-xs': size === 'small' },
        className,
      )}
    >
      <span>{label}</span>
      {onClose && (
        <button
          type="button"
          className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
          onClick={onClose}
        >
          <span className="sr-only">Remove filter for {label}</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  )
}

export default Badge
