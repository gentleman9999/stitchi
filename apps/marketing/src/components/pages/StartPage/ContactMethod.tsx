import LinkInline from '@components/ui/LinkInline'
import React from 'react'

interface Props {
  title: string
  label: string
  href: string
}

const ContactMethod = ({ title, label, href }: Props) => {
  return (
    <div>
      <div className="font-bold text-2xl">{title}</div>
      <LinkInline href={href} external>
        {label}
      </LinkInline>
    </div>
  )
}

export default ContactMethod
