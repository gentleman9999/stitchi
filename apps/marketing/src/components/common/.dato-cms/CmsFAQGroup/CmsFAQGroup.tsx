import { FAQPageJsonLd } from 'next-seo'
import React from 'react'
import { renderToString } from 'react-dom/server'
import FAQGroupInner from './FAQGroupInner'

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

      <FAQGroupInner faqs={faqs} expandAll={expandAll} />
    </>
  )
}

export default CmsFAQGroup
