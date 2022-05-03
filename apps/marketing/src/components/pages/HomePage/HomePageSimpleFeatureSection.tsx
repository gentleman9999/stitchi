import { Section } from '@components/common'
import React from 'react'
import {
  Analytics,
  Competition,
  CustomerSupport,
  Customization,
  CustomStoreIcon,
  DesignIcon,
  EcommerceWebsite,
  GlobalDistribution,
  GrowthMarketing,
  LogisticsIcon,
  NeedleThread,
  Network,
} from 'icons'
import cx from 'classnames'
import routes from '@lib/routes'
import { LinkInline } from '@components/ui'

const sections = [
  {
    id: 'design',
    name: 'Professional, quality custom merchandise',
    description:
      'Work with a designer to turn your ideas into beautiful merchandise people love.',
    icon: DesignIcon,
    features: [
      {
        id: 'free-design',
        name: 'Free promotional products design',
        description:
          "Work one-on-one with an expert designer to create professional merch designs (yes, it's free)",
        icon: CustomerSupport,
      },
      {
        id: 'samples',
        name: 'Sample merchandise for you to try',
        description: (
          <>
            Choose from a selection of{' '}
            <LinkInline href={routes.internal.catalog.href()} external>
              high-quality promotional products
            </LinkInline>{' '}
            that suit your brand&apos;s unique needs
          </>
        ),
        icon: Customization,
      },
      {
        id: 'product-images',
        name: 'Beautiful product shots',
        description:
          'Receive digital product mock-ups and professionally photographed product shots for social media and email marketing to help you sell more',
        icon: GrowthMarketing,
      },
    ],
  },
  {
    id: 'customize',
    name: 'Tailored to your unique needs',
    description:
      'From ordering promotional products in bulk to creating a fully integrated merch program, our creative, technology, and fulfillment solutions scale with your needs',
    icon: CustomStoreIcon,
    features: [
      {
        id: 'ecommerce-store',
        name: 'Simplified eCommerce',
        description:
          'Connect with your existing website or build a fully integrated eCommerce store so that your business is always wherever your customers are',
        icon: EcommerceWebsite,
      },
      {
        id: 'swag-box',
        name: 'Swag bags & boxes',
        description:
          'Curate the perfect collection of merch so that people can rep your brand head-to-toe. Your employees will especially love this',
        icon: Network,
      },
      {
        id: 'drop',
        name: 'Loyalty programs, drop experience & more',
        description:
          'Effortlessly create unique experiences that reward your biggest fans',
        icon: Competition,
      },
    ],
  },
  {
    id: 'distribution',
    name: 'Delivered effortlessly',
    description:
      'Our fulfillment solutions bring the world to you and ensure your merch is delivered with flawless precision',
    icon: LogisticsIcon,
    features: [
      {
        id: 'shipping',
        name: '$1 order fulfillment',
        description:
          'Have all of your inventory assembled, stored, and shipped from a Stitchi fulfillment center to save lots of money and time',
        icon: GlobalDistribution,
      },
      {
        id: 'packaging',
        name: 'Personalized packaging',
        description:
          'Place your brand at the forefront every step of the way, making a lasting impression with your audience',
        icon: NeedleThread,
      },
      {
        id: 'analytics',
        name: 'Actionalble insights at your fingertips',
        description:
          'Receive best-in-class analytics about your customers, inventory, and orders so that you can make decisions that drive engagement',
        icon: Analytics,
      },
    ],
  },
]

const HomePageSimpleFeatureSection = () => {
  return (
    <Section gutter="lg" className="">
      <div className="lg:text-center">
        <h2 className="text-brand-primary font-semibold tracking-wide uppercase">
          Promotional Product Experts
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Create promotional products people love
        </p>
        <p className="mt-4 max-w-2xl text-xl md:text-2xl text-gray-500 lg:mx-auto">
          We connect people and brands to create powerful, lasting experiences
          that build brand engagement and loyalty.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10">
        {sections.map((section, index) => (
          <div key={section.id} className="relative mt-12 sm:mt-16 lg:mt-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div
                className={cx({
                  'lg:order-2': index % 2 === 0,
                })}
              >
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
                  {section.name}
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  {section.description}
                </p>

                <dl className="mt-16 space-y-10">
                  {section.features.map(item => (
                    <div key={item.id} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 text-white">
                          <item.icon aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                          {item.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">
                        {item.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0">
                <svg
                  className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                  width={784}
                  height={404}
                  fill="none"
                  viewBox="0 0 784 404"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={784}
                    height={404}
                    fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                  />
                </svg>
                <div className="block items-center justify-center max-h-[490px] max-w-[600px] rounded-md bg-paper p-20">
                  <section.icon aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default HomePageSimpleFeatureSection
