import FeaturePageTestimonial from '@components/common/FeaturePageContainer/FeaturePageTestimonial'
import { Container } from '@components/ui'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { NextSeo } from 'next-seo'
import React from 'react'
import Features from './Features'
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions'
import Hero from './Hero'
import Process from './Process'

const SolutionsLoyaltyAndReferralPrograms = () => {
  return (
    <div>
      <NextSeo
        title="Launch a Loyalty or Referral Program"
        description="Get thousands of word-of-mouth referrals and reduce customer
        acquisition cost to a fraction of what you pay today."
        canonical={makeAbsoluteUrl(
          routes.internal.solutions.loyaltyPrograms.href(),
        )}
      />
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
        <FrequentlyAskedQuestions />
      </Container>
    </div>
  )
}

export default SolutionsLoyaltyAndReferralPrograms
