import Container from '@components/ui/Container'
import React from 'react'
import Section from '../Section'
import SectionHeader from '../SectionHeader'

interface Props {}

const SimpleFeatureList = (props: Props) => {
  return (
    <Container>
      <Section gutter="lg">
        <SectionHeader
          title="How our custom swag boxes boost your brand"
          subtitle="Investing in custom swag boxes offers numerous benefits."
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <li className="p-3 border rounded-sm">
            <strong>Increased brand recognition</strong> <br />
            Unique and memorable swag boxes keep your brand top of mind,
            promoting awareness and recognition.
          </li>
          <li className="p-3 border rounded-sm">
            <strong>Enhanced customer loyalty</strong>
            <br /> By providing high-quality products and a personalized
            experience, your customers will feel valued and appreciated, leading
            to stronger loyalty and long-term relationships.
          </li>
          <li className="p-3 border rounded-sm">
            <strong>Improved employee engagement</strong>
            <br /> Custom company swag boxes serve as a tangible reminder of
            your company&apos;s commitment to excellence, boosting morale and
            employee pride.
          </li>
          <li className="p-3 border rounded-sm">
            <strong>Amplified marketing impact</strong>
            <br /> By integrating swag boxes into your marketing strategy, you
            can effectively reach new audiences and generate buzz around your
            brand.
          </li>
        </ul>
      </Section>
    </Container>
  )
}

export default SimpleFeatureList
