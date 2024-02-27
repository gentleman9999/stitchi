'use client'

import React from 'react'
import type { FAQ } from './FAQGroup'
import FAQComponent from './FAQ'

interface Props {
  faqs: FAQ[]
  expandAll?: boolean
}

const FAQGroupInner = ({ faqs, expandAll }: Props) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])

  return (
    <dl className="flex flex-col divide-y max-w-4xl m-auto border-t">
      {faqs.map((faq, i) => (
        <FAQComponent
          key={faq.id}
          faq={faq}
          defaultExpanded={isMobile ? false : expandAll || i === 0}
        />
      ))}
    </dl>
  )
}

export default FAQGroupInner
