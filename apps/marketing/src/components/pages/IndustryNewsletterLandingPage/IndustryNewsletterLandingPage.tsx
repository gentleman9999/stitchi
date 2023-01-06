import { Section, SectionHeader } from '@components/common'
import { Container } from '@components/ui'
import React from 'react'
import Hero from './Hero'

const IndustryNewsletterLandingPage = () => {
  return (
    <div>
      <Container>
        <Hero />
      </Container>
      <Container>
        <Section gutter="md">
          <SectionHeader title="Features" />
        </Section>
      </Container>
    </div>
  )
}

export default IndustryNewsletterLandingPage
