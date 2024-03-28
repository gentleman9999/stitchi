import React from 'react'
import TalkToPersonButton from './TalkToPersonButton'

const CatalogProuductZeroState = () => {
  return (
    <div className="bg-primary p-10 rounded-2xl w-full max-w-xl text-center m-auto">
      <span className="text-4xl">👀</span>
      <h3 className="text-2xl font-bold mt-2">
        Can&apos;t find what you&apos;re looking for?
      </h3>
      <p className="text-gray-700 text-lg mb-6 mt-2">
        We have access to over 10,000 products from hundreds of brands. If you
        don&apos;t see what you need on our website, we can help you find it.
      </p>
      <TalkToPersonButton />
    </div>
  )
}

export default CatalogProuductZeroState
