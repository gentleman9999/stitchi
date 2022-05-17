import { Container } from '@components/ui'
import React from 'react'
import DistributionPageAdvantages from './DistributionPageAdvantages'
import DistributionPageFeatures from './DistributionPageFeatures'
import DistributorPageHero from './DistributorPageHero'

interface DistributionPageProps {}

const DistributionPage = (props: DistributionPageProps) => {
  return (
    <>
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
