'use client'

import { FAQPageJsonLd } from 'next-seo'
import React from 'react'
import Section from '../Section/Section'
import { renderToString } from 'react-dom/server'

interface FAQ {
  id: string
  question: string
  answer: React.ReactNode
}

interface Props {
  faqs: FAQ[]
}

const SectionFAQ = ({ faqs }: Props) => {
  if (faqs.length === 0) {
    return null
  }

  return (
    <>
      <FAQPageJsonLd
        mainEntity={faqs.map(faq => ({
          questionName: faq.question,
          acceptedAnswerText: React.isValidElement(faq.answer)
            ? renderToString(faq.answer)
            : faq.answer,
        }))}
      />
      <Section gutter="lg">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black font-headingDisplay">
            Frequently asked questions
          </h2>
          <div className="mt-4 md:mt-6 border-t border-gray-600 pt-4 md:pt-6">
            <dl className="flex flex-col gap-4">
              {faqs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-primary/30  rounded-sm p-4 sm:p-6 md:p-10"
                >
                  <dt className="text-xl font-bold text-black">
                    Q: {faq.question}
                  </dt>
                  <dd className="mt-4 text-xl text-gray-700">
                    <span className="font-bold">A:</span> {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  )
}

export default SectionFAQ
