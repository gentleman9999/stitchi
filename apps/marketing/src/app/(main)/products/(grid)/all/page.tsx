import routes from '@lib/routes'
import { Metadata } from 'next'
import CatalogProductsListPage from '../CatalogProductsListPage'

const title =
  'View our entire collection of Customizable Apparel for Every Style & Budget'
const description = `Explore Stitchi's diverse catalog of high-quality, customizable clothing. Find the perfect fit for your style with our wide range of apparel for men, women, and children. From classic tees to trendy hoodies, Stitchi offers something for everyone. Dive into our catalog now for unique, stylish, and comfortable clothing options!`
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
