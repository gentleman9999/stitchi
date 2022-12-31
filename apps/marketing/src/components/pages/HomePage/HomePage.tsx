import React from 'react'
import { Container } from '@components/ui'
import HomePageHero from './HomePageHero'
import HomePageSimpleFeatureSection from './HomePageSimpleFeatureSection'
import HomePageClosingSection from './HomePageClosingSection'
import HomePageUseCasesSection from './HomePageUseCasesSection'
import HomePageCustomerLogos from './HomePageCustomerLogos'

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  return (
    <>
      <Container>
        <HomePageHero />
      </Container>

      <HomePageCustomerLogos />

      <Container>
        <HomePageSimpleFeatureSection />
      </Container>

      <div className="bg-secondary">
        <HomePageUseCasesSection />
      </div>

      <Container>
        <HomePageClosingSection />
      </Container>
    </>
  )
}

export default HomePage
