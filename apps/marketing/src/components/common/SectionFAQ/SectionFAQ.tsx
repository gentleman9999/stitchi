import React from 'react'
import Section from '../Section/Section'

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
    <Section gutter="lg">
      <div className="bg-primary rounded-md p-4 sm:p-6 md:p-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black font-headingDisplay">
          Frequently asked questions
        </h2>
        <div className="mt-4 md:mt-6 border-t border-gray-600 pt-6 md:pt-10">
          <dl className="space-y-10 md:space-y-0 flex flex-col gap-10">
            {faqs.map(faq => (
              <div key={faq.id}>
                <dt className="text-2xl font-bold text-black font-heading">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-700">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}

export default SectionFAQ
