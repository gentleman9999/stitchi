import { PrimaryLayout } from '@components/layout'
import ProductBuyPage from '@components/pages/ProductBuyPage'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import staticWebsiteData from '@generated/static.json'
import { notEmpty } from '@utils/typescript'

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

  return <ProductBuyPage productSlug={actualProductSlug} />
}

Page.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page
