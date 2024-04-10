'use client'

import ShareDialog from '@components/common/ShareDialog'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Params {
  productSlug: string
  brandSlug: string
}

const Page = ({ params: { brandSlug, productSlug } }: { params: Params }) => {
  const router = useRouter()

  return (
    <ShareDialog
      open
      onClose={router.back}
      href={makeAbsoluteUrl(
        routes.internal.catalog.product.href({
          productSlug,
        }),
      )}
    />
  )
}

export default Page
