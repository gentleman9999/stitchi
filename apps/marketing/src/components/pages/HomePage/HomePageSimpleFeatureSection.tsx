import { Section } from '@components/common'
import { DesktopComputer, Doodle1, MapPin } from 'icons'
import React from 'react'

const features = [
  {
    name: 'Professional, high-quality custom merchandise',
    description: 'Free consultation and design',
    icon: Doodle1,
  },
  {
    name: 'Tailored to your unique needs',
    description: 'High-quality customization on premium products',
    icon: DesktopComputer,
  },
  {
    name: 'Delivered throughout the world ',
    description: 'Automated warehousing and fulfillment solutions',
    icon: MapPin,
  },
]

const HomePageSimpleFeatureSection = () => {
  return (
    <Section gutter="lg" className="">
      <div className="lg:text-center">
        <span className="text-brand-primary font-semibold tracking-wide uppercase">
          What&apos;s the deal?
        </span>
        <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Create promotional products people will love
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
          voluptatum cupiditate veritatis in accusamus quisquam.
        </p>
      </div>
      <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 mt-10">
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
