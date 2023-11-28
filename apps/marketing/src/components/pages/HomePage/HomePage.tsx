import React from 'react'
import Container from '@components/ui/Container'
import HomePageHero from './HomePageHero'
import HomePageUseCasesSection from './HomePageUseCasesSection'
import HomePageTestimonial from './HomePageTestimonial'
import { Section } from '@components/common'
import CustomerLogoBanner from '@components/common/CustomerLogoBanner'
import HomePageSolutions from './HomePageSolutions'

export interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  return (
    <>
      <HomePageHero />

      <Section>
        <CustomerLogoBanner />
      </Section>

      <div className="divide-y-2 divide-black">
        <Container>
          <Section gutter="lg">
            <HomePageSolutions />
          </Section>
        </Container>

        <HomePageTestimonial />

        <div className="">
          <HomePageUseCasesSection />
        </div>
      </div>
    </>
  )
}

export default HomePage
