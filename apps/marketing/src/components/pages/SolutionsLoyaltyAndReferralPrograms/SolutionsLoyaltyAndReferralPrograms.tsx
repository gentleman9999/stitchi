import ClosingCtaSection from '@components/common/ClosingCtaSection'
import FeaturePageTestimonial from '@components/common/FeaturePageContainer/FeaturePageTestimonial'
import { Container } from '@components/ui'
import React from 'react'
import Features from './Features'
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions'
import Hero from './Hero'
import Process from './Process'

const SolutionsLoyaltyAndReferralPrograms = () => {
  return (
    <div>
      <Container>
        <Hero />
      </Container>
      <Container>
        <Features />
      </Container>
      <Container>
        <Process />
      </Container>
      <Container>
        <FeaturePageTestimonial />
      </Container>
      <Container>
        <ClosingCtaSection />
      </Container>
      <Container>
        <FrequentlyAskedQuestions />
      </Container>
    </div>
  )
}

export default SolutionsLoyaltyAndReferralPrograms
