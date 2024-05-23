import React from 'react'
import type { FAQ } from './CmsFAQGroup'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'

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

export default FAQ
