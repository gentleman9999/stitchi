import { SimpleCenteredTestimonial } from '@components/common'
import React from 'react'
import { Container } from 'ui'
import HomePageHero from './HomePageHero'
import jennyHeadshot from '../../../../public/customers/morning_brew/jenny_rothenberg_morning_brew.jpg'
import morningBrewLogo from '../../../../public/customers/morning_brew/morning_brew_logo.png'

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  return (
    <Container>
      <HomePageHero />
      <SimpleCenteredTestimonial
        testimonial="We shipped over 8,000 pairs of Morning Brew joggers to our loyal readers, resulting in over 75,000 new subscribers. This was our largest growth campaign to date and we love seeing pictures of our readers wearing their MB joggers on social media."
        company={{ name: 'Morning Brew', logo: morningBrewLogo }}
        spokesperson={{
          name: 'Jenny Rothenberg',
          title: 'Director of Growth',
          headshot: jennyHeadshot,
        }}
      />
    </Container>
  )
}

export default HomePage
