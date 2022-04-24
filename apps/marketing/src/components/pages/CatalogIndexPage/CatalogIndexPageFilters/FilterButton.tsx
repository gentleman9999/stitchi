import React from 'react'
import cx from 'classnames'

const FilterButton: React.FC<{
  onClick: () => void
  active?: boolean
  variant?: 'primary' | 'secondary'
}> = props => {
  const { variant = 'primary' } = props
  return (
    <button
      onClick={props.onClick}
      className={cx(
        'transition-colors duration-200 flex rounded-full ring-1 ring-gray-300 hover:ring-gray-900 items-center',
        {
          'ring-2 !ring-gray-900 text-gray-900 stroke-gray-900': Boolean(
            props.active,
          ),
          'px-4 py-1 text-xs': variant === 'primary',
          'bg-gray-900 text-white font-medium py-2 px-8':
            variant === 'secondary',
        },
      )}
    >
      {props.children}
    </button>
  )
}

export default FilterButton
