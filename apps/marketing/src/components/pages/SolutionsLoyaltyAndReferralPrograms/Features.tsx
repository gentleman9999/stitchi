import React from 'react'
import { Section, SectionHeader } from '@components/common'

const Features = () => {
  return (
    <Section gutter="md">
      <SectionHeader
        title="Grow faster, for less"
        subtitle="Maximize customer acquisition and minimize costs with automated referral campaigns - a proven strategy for growing successful newsletters."
      />
      <div className="mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            title="Grow your customer base"
            description="Encourage your current customers to refer their friends and colleagues to your business for a reward, and watch your customer count grow exponentially."
          />
          <Feature
            title="Lower customer acquisition cost"
            description="Use the same cost-effective strategies employed by successful newsletter companies such as Morning Brew to keep the cost of acquiring new customers low."
          />
          <Feature
            title="Foster a sense of community"
            description="Create a sense of community among your customers by showing them appreciation through rewards. You’ll gain thousands of organic impressions as your customers show off your brand."
          />
        </div>
      </div>
    </Section>
  )
}

const Feature = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default Features
