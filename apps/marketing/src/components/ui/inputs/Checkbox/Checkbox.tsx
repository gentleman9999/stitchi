import React from 'react'
import cx from 'classnames'

export interface CheckboxProps {
  name: string
  value: string
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  checked?: boolean
  onSecondaryAction?: () => void
  showSecondaryAction?: boolean
  size?: 1 | 2
}

const Checkbox = (props: CheckboxProps) => {
  const { size = 1 } = props
  const [showSecondaryAction, setShowSecondaryAction] = React.useState(false)

  return (
    <div
      className="relative flex items-start"
      onMouseOver={() => setShowSecondaryAction(true)}
      onMouseLeave={() => setShowSecondaryAction(false)}
    >
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          id={props.value}
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={e => props.onChange(e.target.checked)}
          className={cx(
            'focus:ring-primary text-brand-primary border-gray-300 rounded',
            { 'h-4 w-4': size === 1 },
            { 'h-6 w-6': size === 2 },
          )}
        />
      </div>
      {(props.label || props.description) && (
        <div
          className="pl-3 flex-1 cursor-pointer"
          onClick={() => props.onChange(!props.checked)}
        >
          {props.label && (
            <label className="font-medium text-gray-700 cursor-pointer">
              {props.label}
            </label>
          )}
          {props.description && (
            <p id={`${props.name}-description`} className="text-gray-500">
              {props.description}
            </p>
          )}
        </div>
      )}
      {showSecondaryAction &&
        props.showSecondaryAction &&
        props.onSecondaryAction && (
          <button
            className="px-3 text-sm font-bold rounded-md text-brand-primary hover:bg-hover-1 ease-in-out transition-all"
            onClick={props.onSecondaryAction}
          >
            Only
          </button>
        )}
    </div>
  )
}

export default Checkbox
