import LinkInline from '@components/ui/LinkInline'
import React from 'react'

interface BaseProps {
  title: string
  label: string
}

interface LinkProps extends BaseProps {
  href: string
}

interface ButtonProps extends BaseProps {
  onClick: () => void
}

type Props = LinkProps | ButtonProps

const ContactMethod = ({ title, label, ...rest }: Props) => {
  return (
    <div>
      <div className="font-bold text-2xl">{title}</div>
      {'href' in rest ? (
        <LinkInline {...rest} external>
          {label}
        </LinkInline>
      ) : (
        <button {...rest} className="underline">
          {label}
        </button>
      )}
    </div>
  )
}

export default ContactMethod
