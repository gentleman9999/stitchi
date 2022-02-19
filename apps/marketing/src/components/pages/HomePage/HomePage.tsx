import { SimpleCenteredTestimonial, useSpokesperson } from '@components/common'
import React from 'react'
import { Container } from 'ui'
import HomePageHero from './HomePageHero'
import morningBrewLogo from '../../../../public/customers/morning_brew/morning_brew_logo.png'
import HomePageSimpleFeatureSection from './HomePageSimpleFeatureSection'
import HomePageClosingSection from './HomePageClosingSection'
import HomePageUseCasesSection from './HomePageUseCasesSection'

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const jenny = useSpokesperson('jenny_rothenberg')
  return (
    <>
      <Container>
        <HomePageHero />
      </Container>
      <Container>
        <SimpleCenteredTestimonial
          testimonial="We shipped over 8,000 pairs of Morning Brew joggers to our loyal readers, resulting in over 75,000 new subscribers. This was our largest growth campaign to date and we love seeing pictures of our readers wearing their MB joggers on social media."
          company={{ name: 'Morning Brew', logo: morningBrewLogo }}
          spokesperson={jenny}
        />
      </Container>
      <Container>
        <HomePageSimpleFeatureSection />
      </Container>

      <div className="bg-secondary">
        <Container>
          <HomePageUseCasesSection />
        </Container>
      </div>

      <Container>
        <HomePageClosingSection />
      </Container>
    </>
  )
}

export default HomePage
