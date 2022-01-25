import { Section } from '@components/common'
import { DesktopComputer, Doodle1, MapPin } from 'icons'
import React from 'react'

const features = [
  {
    name: 'Free consultation and design',
    description: "We'll send money to anyone, anywhere, in any currency.",
    icon: Doodle1,
  },
  {
    name: 'High-quality customization on premium products',
    description: "We'll send money to anyone, anywhere, in any currency.",
    icon: DesktopComputer,
  },
  {
    name: 'Automated warehousing and fulfillment solutions',
    description: "We'll send money to anyone, anywhere, in any currency.",
    icon: MapPin,
  },
]

const HomePageSimpleFeatureSection = () => {
  return (
    <Section gutter="lg" className="flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-10">
        A single place for all of your swag needs.
      </h2>
      <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
        {features.map(feature => (
          <div key={feature.name}>
            <dt>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary">
                <feature.icon
                  className="h-6 w-6 stroke-secondary"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                {feature.name}
              </p>
            </dt>
            <dd className="mt-2 text-base text-gray-500">
              {feature.description}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export default HomePageSimpleFeatureSection
