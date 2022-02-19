import { Section } from '@components/common'
import React from 'react'
import cx from 'classnames'
import routes from '@lib/routes'
import Link from 'next/link'

const useCases = [
  {
    id: 1,
    title: 'I want to work with a free designer directly',
    description:
      'We shipped over 8,000 pairs of Morning Brew joggers to our loyal readers, resulting in over 75,000 new subscribers. This was our largest growth.',
    cta: {
      label: 'Get started',
      href: routes.internal.getStarted.href(),
    },
  },
  {
    id: 2,
    title: 'I want to scale up my eCommerce easily',
    description:
      'We shipped over 8,000 pairs of Morning Brew joggers to our loyal readers, resulting in over 75,000 new subscribers. This was our largest growth.',
    cta: {
      label: 'Learn more',
      href: routes.internal.getStarted.href(),
    },
  },
  {
    id: 3,
    title: 'I want to reward my loyal fans automatically',
    description:
      'We shipped over 8,000 pairs of Morning Brew joggers to our loyal readers, resulting in over 75,000 new subscribers. This was our largest growth.',
    cta: {
      label: 'Learn more',
      href: routes.internal.getStarted.href(),
    },
  },
]

interface Props {}

const HomePageUseCasesSection = ({}: Props) => {
  return (
    <Section gutter="lg" className="text-white">
      <h2 className="text-5xl font-bold">Ways to use Stitchi</h2>
      <div className="mt-14 flex gap-10 overflow-auto w-full">
        {useCases.map(({ id, title, cta }, index) => (
          <div key={id} className="h-[400px] w-[400px] lg:w-auto">
            <div className="h-full w-[400px] py-4 px-2 lg:w-auto">
              <div
                key={id}
                className={cx(
                  'h-full rounded-xl ring-2 ring-white p-8 flex flex-col justify-between',
                  {
                    'bg-white text-brand-secondary': index === 0,
                  },
                )}
              >
                <div>
                  <h3 className="tracking-tight text-2xl font-semibold">
                    {title}
                  </h3>
                  {/* <p className="mt-8 font-medium text-xl">{description}</p> */}
                </div>

                <Link href={cta.href}>
                  <a className="mt-8 block text-2xl font-bold underline">
                    {cta.label}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default HomePageUseCasesSection
