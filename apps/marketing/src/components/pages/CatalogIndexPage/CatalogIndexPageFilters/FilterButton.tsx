import React from 'react'
import cx from 'classnames'

const FilterButton: React.FC<{
  onClick: () => void
  active?: Boolean
}> = props => {
  return (
    <button
      onClick={props.onClick}
      className={cx(
        'transition-colors duration-200 duration flex rounded-full ring-1 ring-gray-300 hover:ring-gray-900 py-1 px-4 text-xs items-center',
        {
          'ring-2 !ring-gray-900 text-gray-900 stroke-gray-900': Boolean(
            props.active,
          ),
        },
      )}
    >
      {props.children}
    </button>
  )
}

export default FilterButton
