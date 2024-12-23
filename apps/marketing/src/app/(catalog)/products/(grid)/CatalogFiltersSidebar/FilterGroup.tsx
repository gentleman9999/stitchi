import React from 'react'
import cx from 'classnames'

const FilterGroup = ({
  children,
  className,
  label,
  onClear,
  showClear,
}: {
  children: React.ReactNode[] | React.ReactNode
  className?: string
  label?: string
  onClear?: () => void
  showClear?: boolean
}) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <li className="flex flex-col gap-2 items-start">
      {label ? (
        <div className="flex justify-between items-center gap-2 w-full">
          <h3 className="text-lg font-semibold mb-2">{label}</h3>
          {onClear && showClear ? (
            <button
              className="text-gray-600 underline text-xs"
              onClick={() => onClear()}
            >
              Reset
            </button>
          ) : null}
        </div>
      ) : null}

      <ul className={cx('flex flex-col gap-2 items-start', className)}>
        {Array.isArray(children)
          ? children
              .slice(
                0,
                expanded ? children.length : Math.min(children.length, 5),
              )
              .map((child, idx) => {
                const clonedChild = React.cloneElement(child as any, {
                  className: cx({
                    'sr-only': !expanded && idx > 4,
                  }),
                })

                return clonedChild
              })
          : children}
      </ul>

      {Array.isArray(children) && children.length > 5 ? (
        <button
          className="text-gray-600 underline"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </li>
  )
}

export default FilterGroup
