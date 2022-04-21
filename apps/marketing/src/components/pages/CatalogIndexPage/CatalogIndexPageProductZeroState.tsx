import { Button } from '@components/ui'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'

const CatalogIndexPageProuductZeroState = () => {
  return (
    <div className="bg-primaryAlt-50 p-10 rounded-2xl w-full max-w-xl text-center m-auto">
      <span className="text-4xl">👀</span>
      <h3 className="text-2xl font-bold mb-2">
        Don&apos;t see what you&apos;re looking for?
      </h3>
      <p className="text-gray-700 text-lg mb-6">
        Not to worry! We work with hundreds of brands and with access to over
        10,000 products. The products on this website just our favorite :)
      </p>
      <Link href={routes.internal.getStarted.href()} passHref>
        <Button endIcon={<ArrowRight strokeWidth="2" />} variant="ghost">
          Find the perfect product
        </Button>
      </Link>
    </div>
  )
}

export default CatalogIndexPageProuductZeroState
