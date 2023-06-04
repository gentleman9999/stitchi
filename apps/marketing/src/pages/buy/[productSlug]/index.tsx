import ProductBuyPage from '@components/pages/ProductBuyPage'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import staticWebsiteData from '@generated/static.json'
import { notEmpty } from '@utils/typescript'
import { NextSeo } from 'next-seo'
import { FocusedLayout } from '@components/layout'

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

  return (
    <>
      {/* These pages should not be index by Google or other search engines */}
      <NextSeo nofollow noindex />
      <ProductBuyPage productSlug={actualProductSlug} />
    </>
  )
}

Page.getLayout = (page: ReactElement) => <FocusedLayout>{page}</FocusedLayout>

export default Page
