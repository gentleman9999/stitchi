import { Section } from '@components/common'
import Image from 'next/image'
import React from 'react'
import { WebDesign } from 'icons'
import cx from 'classnames'
import CustomIcon from '../../../../public/merch/custom-store.svg'
import DesignIcon from '../../../../public/merch/design.svg'
import LogisticsIcon from '../../../../public/merch/logistics.svg'

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
        icon: WebDesign,
      },
      {
        id: 'samples',
        name: 'Sample merchandise for you to try',
        description:
          "Choose from a selection of high-quality promotional products that suit your brand's needs",
        icon: WebDesign,
      },
    ],
  },
  {
    id: 'customize',
    name: 'Tailored to your unique needs',
    description:
      'From simple swag bulk-ordering to fully integrated merch programs, our solutions scale with your needs.',
    icon: CustomIcon,
    features: [
      {
        id: 'ecommerce-store',
        name: 'Launch an eCommerce store',
        description:
          'Build a fully integrated eCommerce store to be where your customers shop',
        icon: WebDesign,
      },
      {
        id: 'drop',
        name: 'Create a drop experience',
        description: '',
        icon: WebDesign,
      },
      {
        id: 'referral-program',
        name: 'Automate your referral program',
        description: '',
        icon: WebDesign,
      },
    ],
  },
  {
    id: 'distribution',
    name: 'Delivered to the world',
    description:
      'Our logistics solutions ensure you never have to think about packing, storing, or shipping merchandise ever again.',
    icon: LogisticsIcon,
    features: [
      {
        id: 'shipping',
        name: 'Reach people anywhere',
        description:
          'Deliver merch fast and seamlessly handle returns without having to worry about packing, storing, or shipping merchandise ever again',
        icon: WebDesign,
      },
      {
        id: 'swag-box',
        name: 'Create a swag box',
        description: '',
        icon: WebDesign,
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
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Create Promotional products people love
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          We are a team of promotional product designers, marketers, and coders
          at your disposal to make your next merch project a breeze.
        </p>
      </div>
      {sections.map((section, index) => (
        <div key={section.id} className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div
              className={cx({
                'lg:order-2': index % 2 === 0,
              })}
            >
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                {section.name}
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                {section.description}
              </p>

              <dl className="mt-10 space-y-10">
                {section.features.map(item => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
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
              <div className="block items-center justify-center h-[490px] max-w-[600px] rounded-md bg-paper p-20">
                <Image
                  {...section.icon}
                  layout="responsive"
                  alt={`${section.name} icon`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Section>
  )
}

export default HomePageSimpleFeatureSection
