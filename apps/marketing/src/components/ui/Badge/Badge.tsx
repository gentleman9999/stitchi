import React from 'react'
import cx from 'classnames'

const severityClasses = {
  success: 'text-green-700 bg-green-50 ring-green-600/20',
  default: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  error: 'text-red-700 bg-red-50 ring-red-600/10',
  warning: 'text-orange-700 bg-orange-50 ring-orange-600/10',
  info: 'text-blue-700 bg-blue-50 ring-blue-600/10',
}

export interface BadgeProps {
  label: string
  onClose?: () => void
  size?: 'small' | 'normal'
  className?: string
  severity?: keyof typeof severityClasses
}

const Badge = ({
  label,
  onClose,
  className,
  size = 'normal',
  severity = 'default',
}: BadgeProps) => {
  return (
    <span
      className={cx(
        severityClasses[severity],
        'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset',
        { 'pr-2': Boolean(onClose) },
        { 'py-1.5 px-3 text-sm': size === 'normal' },
        { 'py-0.5 px-2 text-xs': size === 'small' },

        className,
      )}
    >
      <span className="text-">{label}</span>
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
