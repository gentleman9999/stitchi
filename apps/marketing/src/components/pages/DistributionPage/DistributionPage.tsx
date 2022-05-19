import { Container } from '@components/ui'
import { NextSeo } from 'next-seo'
import React from 'react'
import DistributionPageAdvantages from './DistributionPageAdvantages'
import DistributionPageFeatures from './DistributionPageFeatures'
import DistributorPageHero from './DistributorPageHero'

interface DistributionPageProps {}

const DistributionPage = (props: DistributionPageProps) => {
  return (
    <>
      <NextSeo
        title="Automated merch fulfillment, promotional product distribution"
        description="Stitchi provides easy-to-use, cost-effective solutions for automated merchandising distribution. We're the 'best in class' when it comes to all things promotional products. Say goodbye to manually packing and shipping thousands of orders each month."
      />
      <DistributorPageHero />
      <Container>
        <DistributionPageAdvantages />
      </Container>
      <Container>
        <DistributionPageFeatures />
      </Container>
    </>
  )
}

export default DistributionPage
