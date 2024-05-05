import routes from '@lib/routes'
import { Metadata } from 'next'
import CatalogProductsListPage from './CatalogProductsListPage'

const title = 'Shop Premium Quality Customizable Merchandise'
const description = `Explore Stitchi's diverse range of customizable apparel, home goods, and accessories. Premium quality products ready for global shipping.`
const url = routes.internal.catalog.href()

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
  },
}

const Page = () => {
  return <CatalogProductsListPage />
}

export default Page
