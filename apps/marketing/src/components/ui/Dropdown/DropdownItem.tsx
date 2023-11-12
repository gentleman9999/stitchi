import Link from 'next/link'
import React from 'react'
import Checkbox from '../inputs/Checkbox'

interface BaseProps {
  label: string
  icon?: React.ReactNode
  active?: boolean
  showCheck?: boolean
}

interface LinkProps extends BaseProps {
  href: string
}

interface ButtonProps extends BaseProps {
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export type Props = LinkProps | ButtonProps | BaseProps

const DropdownItem = React.forwardRef<any, Props>((props, ref) => {
  const { label, icon, active, showCheck, ...rest } = props

  return (
    <Wrapper
      {...rest}
      ref={ref}
      className="p-0.5 flex items-center py-2 px-2 relative outline-none text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-all w-full gap-4 rounded-md"
    >
      {showCheck ? (
        <Checkbox
          checked={active}
          value={label}
          name={label}
          onChange={() => {}}
        />
      ) : null}
      {icon ? <div className="w-5">{icon}</div> : null}
      <span>{label}</span>
    </Wrapper>
  )
})

DropdownItem.displayName = 'DropdownItem'

type WrapperProps = Props & {
  children: React.ReactNode
  [key: string]: any
}

const Wrapper = React.forwardRef<any, WrapperProps>((props, ref) => {
  const { children } = props

  if (isLink(props)) {
    return (
      <Link {...props} ref={ref}>
        {children}
      </Link>
    )
  }

  if (isButton(props)) {
    return (
      <button {...props} ref={ref}>
        {children}
      </button>
    )
  }

  return <div className={props.className}>{children}</div>
})

const isLink = (props: Props): props is LinkProps => 'href' in props
const isButton = (props: Props): props is ButtonProps => 'onClick' in props

Wrapper.displayName = 'DropdownItemWrapper'

export default DropdownItem
