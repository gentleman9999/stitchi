import React from 'react'
import { SubscribeInline } from '..'

export interface InlineMailingListSubscribeProps {}

const InlineMailingListSubscribe = (props: InlineMailingListSubscribeProps) => {
  return (
    <div className="py-10 px-6 bg-indigo-700 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center bg-primaryAlt-600">
      <div className="lg:w-0 lg:flex-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Become an audience growth & revenue expert
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-white">
          All the news and insights marketing pros need to know, all in one
          newsletter. Stay informed and entertained, for free.
        </p>
      </div>
      <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
        <SubscribeInline privacyPolicyClassName="text-white" />
      </div>
    </div>
  )
}

export default InlineMailingListSubscribe
