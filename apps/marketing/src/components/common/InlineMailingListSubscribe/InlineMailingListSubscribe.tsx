import React from 'react'
import { SubscribeInline } from '..'

export interface InlineMailingListSubscribeProps {}

const InlineMailingListSubscribe = (props: InlineMailingListSubscribeProps) => {
  return (
    <div className="py-10 px-6 rounded-xl sm:py-16 sm:px-12 lg:p-10 lg:flex lg:items-center bg-primaryAlt-100">
      <div className="lg:w-0 lg:flex-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Get the latest from Stitchi
        </h2>
        {/* <p className="mt-4 max-w-3xl text-lg text-primaryAlt-100">
          All the news and insights marketing pros need to know, all in one
          newsletter. Stay informed and entertained, for free.
        </p> */}
      </div>
      <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
        <SubscribeInline
          privacyPolicyClassName="text-primaryAlt-100"
          className="w-full"
        />
      </div>
    </div>
  )
}

export default InlineMailingListSubscribe
