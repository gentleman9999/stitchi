import React from 'react'
import Section from '../Section/Section'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
}

const SectionFAQ = ({ faqs }: Props) => {
  if (faqs.length === 0) {
    return null
  }

  return (
    <Section gutter="xl">
      <div className="bg-primaryAlt-500 rounded-xl p-6 md:p-8 shadow-xl">
        <h2 className="text-3xl font-extrabold text-white">
          Frequently asked questions
        </h2>
        <div className="mt-6 border-t border-indigo-300 border-opacity-25 pt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
            {faqs.map(faq => (
              <div key={faq.id}>
                <dt className="text-lg leading-6 font-medium text-white">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-primaryAlt-100">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}

export default SectionFAQ
