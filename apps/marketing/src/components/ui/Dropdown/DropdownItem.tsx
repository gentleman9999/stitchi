import Link from 'next/link'
import React from 'react'

interface BaseProps {
  label: string
  icon?: React.ReactNode
}

interface LinkProps extends BaseProps {
  href: string
}

interface ButtonProps extends BaseProps {
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

export type Props = LinkProps | ButtonProps | BaseProps

const DropdownItem = (props: Props) => {
  const { label, icon } = props

  return (
    <Wrapper {...props}>
      <div className="flex items-center py-2 px-4 relative outline-none text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-all w-full gap-4 rounded-md">
        {icon ? <div className="w-5">{icon}</div> : null}
        <span>{label}</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = (props: Props & { children: React.ReactNode }) => {
  const { children } = props

  if ('href' in props) {
    return <Link href={props.href}>{children}</Link>
  }

  if ('onClick' in props) {
    return <button onClick={props.onClick}>{children}</button>
  }

  return <>{children}</>
}

export default DropdownItem
