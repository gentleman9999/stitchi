import { Metadata } from 'next'
import routes from '@lib/routes'
import CatalogProductGrid from './CatalogProductGrid'

const title = 'Discover Premium Customizable Apparel for Every Style & Budget'
const description = `Explore Stitchi's diverse catalog of high-quality, customizable clothing. Find the perfect fit for your style with our wide range of apparel for men, women, and children. From classic tees to trendy hoodies, Stitchi offers something for everyone. Dive into our catalog now for unique, stylish, and comfortable clothing options!`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: routes.internal.catalog.href(),
  },
}

const Page = () => {
  return <CatalogProductGrid />
}

export default Page
