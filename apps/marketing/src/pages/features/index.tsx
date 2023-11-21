import { PrimaryLayout } from '@components/layout'
import FeaturesPage from '@components/pages/FeaturesPage'
import React from 'react'

const Features = () => {
  return <FeaturesPage />
}

Features.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

export default Features
