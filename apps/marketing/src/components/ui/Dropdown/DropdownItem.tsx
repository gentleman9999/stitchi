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

const DropdownItem = (props: Props) => {
  const { label, icon, active, showCheck } = props

  return (
    <Wrapper {...props} className="w-full">
      <div className="flex items-center py-2 px-2 relative outline-none text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-all w-full gap-4 rounded-md">
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
      </div>
    </Wrapper>
  )
}

const Wrapper = (
  props: Props & { children: React.ReactNode; className: string },
) => {
  const { children } = props

  if ('href' in props) {
    return (
      <Link href={props.href} className={props.className}>
        {children}
      </Link>
    )
  }

  if ('onClick' in props) {
    return (
      <button onClick={props.onClick} className={props.className}>
        {children}
      </button>
    )
  }

  return <div className={props.className}>{children}</div>
}

export default DropdownItem
