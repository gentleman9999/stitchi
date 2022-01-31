import { Section } from '@components/common'
import Image from 'next/image'
import React from 'react'
import CustomIcon from '../../../../public/merch/custom-store.svg'
import DesignIcon from '../../../../public/merch/design.svg'
import LogisticsIcon from '../../../../public/merch/logistics.svg'

const features = [
  {
    name: 'Professional, quality custom merchandise',
    description:
      'Work with a designer to turn your ideas into beautiful merchandise people love.',
    icon: DesignIcon,
  },
  {
    name: 'Tailored to your unique needs',
    description:
      'From simple swag bulk-ordering to fully integrated merch programs, our solutions scale with your needs.',
    icon: CustomIcon,
  },
  {
    name: 'Delivered throughout the world ',
    description:
      'Our logistics solutions ensure you never have to think about packing, storing, or shipping merchandise ever again.',
    icon: LogisticsIcon,
  },
]

const HomePageSimpleFeatureSection = () => {
  return (
    <Section gutter="lg" className="">
      <div className="lg:text-center">
        <h2 className="text-brand-primary font-semibold tracking-wide uppercase">
          Promotional Product Experts
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Create Promotional products people love
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          We are a team of promotional product designers, marketers, and coders
          at your disposal to make your next merch project a breeze.
        </p>
      </div>
      <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 mt-10">
        {features.map(feature => (
          <div key={feature.name}>
            <dt>
              <div className="relative flex items-center justify-center h-40 w-40 rounded-md bg-paper">
                <Image
                  {...feature.icon}
                  layout="fill"
                  alt={`${feature.name} icon`}
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
