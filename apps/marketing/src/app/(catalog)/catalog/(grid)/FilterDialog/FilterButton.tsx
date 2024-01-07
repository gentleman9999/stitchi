import React from 'react'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  variant?: 'primary' | 'secondary'
}

const FilterButton = (props: Props) => {
  const { variant = 'primary' } = props
  return (
    <button
      onClick={props.onClick}
      className={cx(
        'h-full transition-colors duration-200 flex rounded-sm items-center font-medium',
        {
          'ring !ring-gray-300 text-gray-800 stroke-gray-400': Boolean(
            props.active,
          ),
          'px-4 py-1 text-xs ring-1 ring-gray-300 ': variant === 'primary',
          'ring ring-gray-900 bg-gray-900 text-white font-medium py-2 px-8':
            variant === 'secondary',
        },
      )}
    >
      {props.children}
    </button>
  )
}

export default FilterButton
