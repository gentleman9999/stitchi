'use client'

import { FAQPageJsonLd } from 'next-seo'
import React from 'react'
import { renderToString } from 'react-dom/server'
import FAQComponent from './FAQ'

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface Props {
  faqs: FAQ[]
  expandAll?: boolean
}

const CmsFAQGroup = ({ faqs, expandAll }: Props) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])

  return (
    <>
      <FAQPageJsonLd
        useAppDir
        mainEntity={faqs.map(faq => ({
          questionName: faq.question,
          acceptedAnswerText: React.isValidElement(faq.answer)
            ? renderToString(faq.answer)
            : faq.answer,
        }))}
      />

      <dl className="flex flex-col divide-y max-w-4xl m-auto border-t">
        {faqs.map((faq, i) => (
          <FAQComponent
            key={faq.id}
            faq={faq}
            defaultExpanded={isMobile ? false : expandAll || i === 0}
          />
        ))}
      </dl>
    </>
  )
}

export default CmsFAQGroup
