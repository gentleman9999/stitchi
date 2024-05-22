'use client'

import { FAQPageJsonLd } from 'next-seo'
import React from 'react'
import Section from '../Section/index'
import { renderToString } from 'react-dom/server'

function extractTextContent(element: React.ReactNode): string {
  // Base case: If it's a string or number, return it as is
  if (typeof element === 'string' || typeof element === 'number') {
    return element.toString()
  }

  // If it's a React element, recursively process its children
  if (
    React.isValidElement(element) &&
    element.props &&
    element.props.children
  ) {
    return React.Children.toArray(element.props.children)
      .map(child => extractTextContent(child))
      .join('')
  }

  // If it's an array of elements, process each one
  if (Array.isArray(element)) {
    return element.map(child => extractTextContent(child)).join('')
  }

  // For any other case (e.g., null, undefined, boolean), return an empty string
  return ''
}

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
        useAppDir
        mainEntity={faqs.map(faq => ({
          questionName: faq.question,
          acceptedAnswerText: extractTextContent(faq.answer),
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
