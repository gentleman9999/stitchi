import { FAQPageJsonLd } from 'next-seo'
import React from 'react'
import { renderToString } from 'react-dom/server'
import cx from 'classnames'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

interface FAQ {
  id: string
  question: string
  answer: string
}

export interface Props {
  faqs: FAQ[]
  expandAll?: boolean
}

const FAQGroup = ({ faqs, expandAll }: Props) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])

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

      <dl className="flex flex-col divide-y max-w-4xl m-auto border-t">
        {faqs.map((faq, i) => (
          <FAQ
            key={faq.id}
            faq={faq}
            defaultExpanded={isMobile ? false : expandAll || i === 0}
          />
        ))}
      </dl>
    </>
  )
}

const FAQ = ({
  faq,
  defaultExpanded = true,
}: {
  faq: FAQ
  defaultExpanded?: boolean
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  React.useEffect(() => {
    setExpanded(defaultExpanded)
  }, [defaultExpanded])

  const toggleExpanded = () => setExpanded(prev => !prev)

  return (
    <div
      key={faq.id}
      className="prose prose-sm w-full max-w-none py-4 sm:py-6 md:py-10"
    >
      <div className="flex gap-4 justify-between items-center">
        <dt
          className="text-base md:text-lg font-bold text-black cursor-pointer"
          onClick={toggleExpanded}
        >
          {faq.question}
        </dt>

        <button onClick={toggleExpanded}>
          {expanded ? (
            <MinusIcon className="w-5 h-5 shrink-0" />
          ) : (
            <PlusIcon className="w-5 h-5 shrink-0" />
          )}
        </button>
      </div>

      <dd
        className={cx(
          'text-base md:text-lg text-gray-500 max-h-0 overflow-hidden',
          {
            'max-h-none': expanded,
          },
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
      </dd>
    </div>
  )
}

export default FAQGroup
