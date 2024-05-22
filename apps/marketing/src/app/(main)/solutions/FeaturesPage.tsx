'use client'

import React from 'react'
import SectionHeader from '@components/common/SectionHeader'
import Section from '@components/common/Section'
import routes from '@lib/routes'
import { notEmpty } from '@lib/utils/typescript'
import cx from 'classnames'
import { ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import LinkInline from '@components/ui/LinkInline'
import { track } from '@lib/analytics'

enum Sections {
  Design = 'Design merch',
  Produce = 'Produce designs',
  Fulfill = 'Deliver anywhere',
  Scale = 'Scale',
}

interface Item {
  icon: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
}

interface SectionType {
  id: Sections
  title: string
  subtitle: string
  items: Item[]
}

const sectionItems: SectionType[] = [
  {
    id: Sections.Design,
    title: 'Design',
    subtitle:
      'Crafting the essence of your brand into tangible designs that resonate with your audience.',
    items: [
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Personal Designer',
        description: (
          <>
            Collaborate one-on-one with our expert designers to{' '}
            <LinkInline href={routes.internal.solutions.design.href()}>
              bring your vision to life
            </LinkInline>
            .
          </>
        ),
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Team Collaboration',
        description:
          'Enable your team to come together, share feedback, and iterate on designs in real time.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Brand Asset Integration',
        description:
          'Seamlessly integrate your existing brand assets, like logos and color schemes, into your merchandise designs for consistent branding.',
      },
    ],
  },
  {
    id: Sections.Produce,
    title: 'Production',
    subtitle:
      'Quality production that resonates with your brand value and your audience.',
    items: [
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Bulk Pricing',
        description: (
          <>
            Enjoy unbeatable prices with our{' '}
            <LinkInline
              target="_blank"
              href={routes.external.support.pricing.href()}
            >
              bulk purchasing options
            </LinkInline>
            , ensuring quality and reducing costs.
          </>
        ),
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Sustainable & Local',
        description: (
          <>
            Locally sourced and{' '}
            <LinkInline
              href={routes.internal.catalog.category.show.href({
                categorySlug: '/american-made',
              })}
            >
              sustainable product offerings
            </LinkInline>
            .
          </>
        ),
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Swag Bags & Boxes',
        description: (
          <>
            Leave a lasting brand impression with{' '}
            <LinkInline href={routes.internal.solutions.swagBox.href()}>
              personalized, branded packages
            </LinkInline>
            .
          </>
        ),
      },
    ],
  },
  {
    id: Sections.Fulfill,
    title: 'Fulfillment',
    subtitle:
      'Ensuring timely, accurate, and hassle-free delivery to your customers, employees, and fans.',
    items: [
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: '$1 Order Fulfillment',
        description: (
          <>
            Streamline your order process with efficient, cost-effective, and
            hands-free{' '}
            <LinkInline href={routes.internal.solutions.distribution.href()}>
              merch fulfillment services
            </LinkInline>
            .
          </>
        ),
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'E-Commerce',
        description: (
          <>
            Seamlessly{' '}
            <LinkInline
              target="_blank"
              href={routes.external.support.features.ecommerceFulfillment.href()}
            >
              integrate with your online store
            </LinkInline>{' '}
            to create a unified shoping experience
          </>
        ),
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Inventory Management',
        description:
          'Stay ahead with real-time inventory tracking and management, giving you confidence.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Gifting',
        description:
          'Send gifts to your customers, employees, and fans using a seamless branded experience.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Team Store',
        description: (
          <>
            Equip your team with branded merch on a{' '}
            <LinkInline
              target="_blank"
              href={routes.external.support.features.teamStores.href()}
            >
              centralized online platform
            </LinkInline>
            .
          </>
        ),
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Loyalty & Referral Programs',
        description: (
          <>
            <LinkInline href={routes.internal.solutions.loyaltyPrograms.href()}>
              Reward your fans automatically
            </LinkInline>{' '}
            for their loyalty and referrals.
          </>
        ),
      },
    ],
  },
  {
    id: Sections.Scale,
    title: 'Scale',
    subtitle:
      'The most successful merchandise programs in the world have access to the best tools — and now so do you.',
    items: [
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Automated Reordering',
        description:
          'Simplify your inventory management with automated reordering options, ensuring you’re always stocked up on popular items.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Customer Insights',
        description:
          'Gain valuable insights from customer feedback and purchasing trends to optimize your future merchandise offerings.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Seasonal Updates',
        description:
          'Keep your merchandise fresh and relevant with seasonal updates, aligning with trends and special events.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Exclusive Promotions',
        description:
          'Engage your loyal customers with exclusive promotions and limited edition releases to drive repeat business.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Performance Analytics',
        description:
          'Track the performance of your merchandise with our analytics tools to make data-driven decisions for future campaigns.',
      },
      {
        icon: <CheckCircleIcon className="w-8 h-8" />,
        title: 'Ongoing Support',
        description:
          'Benefit from Stitchi’s ongoing customer support to continuously refine and improve your merchandise strategies.',
      },
    ],
  },
]

const FeaturesPage = () => {
  const [activeSections, setActiveSections] = React.useState(Sections.Design)

  const handleScroll = () => {
    const offsets = Object.values(Sections)
      .map(id => document.getElementById(id)?.getBoundingClientRect().top)
      .filter(notEmpty)

    const active =
      Object.values(Sections)[offsets.findIndex(offset => offset >= -200)]
    setActiveSections(active)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Container>
      <header>
        <Section
          gutter="lg"
          className="min-h-[90vh] flex flex-col justify-center items-center"
        >
          <div className="flex gap-8 max-w-4xl">
            <div className="flex-auto flex flex-col items-center">
              <h1 className="text-center font-semibold font-headingDisplay uppercase text-gray-900 text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Everything you want in a merch platform
              </h1>
              <p className="text-center mt-10 max-w-md font-light text-base text-gray-500 sm:text-lg lg:text-2xl md:max-w-2xl">
                Built for reliability, scalability, and affordability.
              </p>

              <div className="mt-12 max-w-md sm:flex">
                <div className="rounded-sm">
                  <Button
                    size="2xl"
                    Component={Link}
                    href={routes.internal.signup.href()}
                    color="brandPrimary"
                    onClick={() => {
                      track.signupCtaClicked({
                        ctaType: 'hero',
                        locationHref: window.location.href,
                      })
                    }}
                  >
                    Sign up for free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </header>

      <nav className="hidden sm:flex sticky top-[calc(var(--topbar-height)+8px)] w-full justify-center">
        <ul className="flex justify-center items-center gap-2 md:gap-4 bg-gray-100 border rounded-xl p-2">
          {Object.entries(Sections).map(([key, value], index) => (
            <>
              <li key={key} className="flex">
                <a
                  href={`#${value}`}
                  className={cx(
                    `capitalize py-2 px-4 text-xs sm:text-sm md:text-base font-bold rounded-sm text-gray-400 whitespace-nowrap `,
                    {
                      'bg-primary text-gray-950': activeSections === value,
                    },
                  )}
                >
                  {value}
                </a>
              </li>
              {index !== Object.entries(Sections).length - 1 ? (
                <li key={`${key}-divider`}>
                  <ChevronRightIcon className="w-8 h-8 stroke-2 text-gray-400" />
                </li>
              ) : null}
            </>
          ))}
        </ul>
      </nav>

      {sectionItems.map(section => (
        <Section key={section.id} id={section.id} gutter="lg">
          <SectionHeader
            align="left"
            title={section.title}
            subtitle={section.subtitle}
          />
          <div
            className={cx('mt-8 grid grid-cols-1 gap-4 md:gap-6', {
              'sm:grid-cols-2': section.items.length % 2 === 0,
              'sm:grid-cols-3': section.items.length % 3 === 0,
            })}
          >
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="col-span-1 flex flex-col gap-2 border border-gray-950 rounded-sm p-4 sm:p-6"
              >
                <div className="text-midnight">{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </Container>
  )
}

export default FeaturesPage
