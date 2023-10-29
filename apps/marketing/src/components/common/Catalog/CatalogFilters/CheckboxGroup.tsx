import React from 'react'
import cx from 'classnames'
import Button from '@components/ui/Button'

const CheckboxGroup = ({ children }: { children: React.ReactElement[] }) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = React.useState(false)

  const featuredChildren = React.Children.toArray(children).slice(0, 6)
  const remainingChildren = React.Children.toArray(children).slice(6)

  const toggleExpanded = () => {
    setExpanded(!expanded)

    if (expanded) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" ref={ref}>
        {featuredChildren}
      </div>

      {remainingChildren.length > 0 ? (
        <div>
          <div
            className={cx(
              'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-500 h-auto overflow-hidden',
              {
                '!max-h-0': !expanded,
              },
            )}
          >
            {React.Children.map(remainingChildren, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement, {
                  className: (child.props.className || '') + ' ',
                })
              }
            })}
          </div>
          {expanded ? <div className="h-4 sm:h-6" /> : null}
          <div>
            <Button variant="naked" onClick={toggleExpanded}>
              {expanded ? 'Show less' : 'Show all'}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CheckboxGroup
