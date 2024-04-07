import React from 'react'
import cx from 'classnames'

export interface CheckboxProps {
  name: string
  value: string | number
  onChange: (checked: boolean) => void
  label?: React.ReactNode
  description?: string
  checked?: boolean
  onSecondaryAction?: () => void
  showSecondaryAction?: boolean
  size?: 1 | 2
  className?: string
  inputRef?: React.Ref<HTMLInputElement>
}

const Checkbox = (props: CheckboxProps) => {
  const { size = 1 } = props
  const [showSecondaryAction, setShowSecondaryAction] = React.useState(false)

  return (
    <div
      className={cx('relative flex items-center', props.className)}
      onMouseOver={() => setShowSecondaryAction(true)}
      onMouseLeave={() => setShowSecondaryAction(false)}
    >
      <div className="flex items-center h-6">
        <input
          ref={props.inputRef}
          type="checkbox"
          id={props.name}
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={e => props.onChange(e.target.checked)}
          className={cx(
            'focus:ring-primary text-primary border-gray-300 rounded cursor-pointer',
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
            <label
              htmlFor={props.name}
              className="font-medium text-gray-700 cursor-pointer"
            >
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
            className="px-3 text-sm font-bold rounded-sm text-primary hover:bg-hover-1 ease-in-out transition-all"
            onClick={props.onSecondaryAction}
          >
            Only
          </button>
        )}
    </div>
  )
}

export default Checkbox
