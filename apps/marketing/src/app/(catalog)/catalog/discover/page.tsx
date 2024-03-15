import routes from '@lib/routes'
import { Metadata } from 'next'
import React from 'react'
import Discover from './Discover'

const title = 'Discover Premium Customizable Apparel for Every Style & Budget'
const description = `Explore Stitchi's diverse catalog of high-quality, customizable clothing. Find the perfect fit for your style with our wide range of apparel`
const url = routes.internal.catalog.discover.href()

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

const Page = async () => {
  return <Discover />
}

export default Page
