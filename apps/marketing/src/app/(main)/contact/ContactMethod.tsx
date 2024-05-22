import LinkInline from '@components/ui/LinkInline'
import React from 'react'

interface BaseProps {
  title: string
  label: React.ReactNode
}

interface LinkProps extends BaseProps {
  href: string
}

interface ButtonProps extends BaseProps {
  onClick: () => void
}

type Props = LinkProps | ButtonProps | BaseProps

const ContactMethod = ({ title, label, ...rest }: Props) => {
  return (
    <div>
      <div className="font-bold text-2xl">{title}</div>
      {'href' in rest ? (
        <LinkInline {...rest} external>
          {label}
        </LinkInline>
      ) : 'onClick' in rest ? (
        <button {...rest} className="underline">
          {label}
        </button>
      ) : (
        label
      )}
    </div>
  )
}

export default ContactMethod
