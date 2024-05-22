import { Metadata } from 'next'
import React from 'react'
import FeaturePageTestimonial from '@components/common/FeaturePageContainer/FeaturePageTestimonial'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import Features from './Features'
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions'
import Hero from './Hero'
import Process from './Process'

export const metadata: Metadata = {
  title: 'Launch a Loyalty or Referral Program',
  description:
    'Get thousands of word-of-mouth referrals and reduce customer acquisition cost to a fraction of what you pay today.',
  openGraph: { url: routes.internal.solutions.loyaltyPrograms.href() },
}

const Page = () => {
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
        <FrequentlyAskedQuestions />
      </Container>
    </div>
  )
}

export default Page
