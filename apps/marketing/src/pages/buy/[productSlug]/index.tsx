import ProductBuyPage from '@components/pages/ProductBuyPage'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import staticWebsiteData from '@generated/static.json'
import { notEmpty } from '@utils/typescript'
import { NextSeo } from 'next-seo'
import { FocusedLayout } from '@components/layout'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'

const allBrandSlugs = staticWebsiteData.brands
  .map(brand => brand.custom_url?.url.replace(/\//g, ''))
  .filter(notEmpty)

const Page = () => {
  const router = useRouter()

  const { productSlug } = router.query

  if (typeof productSlug !== 'string') {
    return null
  }

  const brandSlug = allBrandSlugs.find(
    brandSlug => productSlug.indexOf(brandSlug) === 0,
  )

  if (!brandSlug) {
    return null
  }

  const actualProductSlug = `/${productSlug.replace(`${brandSlug}-`, '')}/`

  const url = makeAbsoluteUrl(
    routes.internal.catalog.product.purchase.href({
      brandSlug,
      productSlug: actualProductSlug,
    }),
  )

  return (
    <>
      {/* These pages should not be index by Google or other search engines */}
      <NextSeo nofollow noindex canonical={url} />
      <ProductBuyPage productSlug={actualProductSlug} />
    </>
  )
}

Page.getLayout = (page: ReactElement) => <FocusedLayout>{page}</FocusedLayout>

export default Page
