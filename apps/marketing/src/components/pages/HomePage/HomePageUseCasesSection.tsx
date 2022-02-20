import { Section } from '@components/common'
import React from 'react'
import cx from 'classnames'
import routes from '@lib/routes'
import Link from 'next/link'
import { Container } from 'ui'
import { useRouter } from 'next/router'

const useCases = [
  {
    id: 1,
    title: 'I want to work with a free designer directly',
    description:
      'Make your brand and ideas come to life with a professional promotional product designer at your disposal.',
    cta: {
      label: 'Get started',
      href: routes.internal.getStarted.href(),
    },
  },
  {
    id: 2,
    title: 'I want to scale up my eCommerce easily',
    description:
      "Proactively meet your audience's demand without ever having to hire more people.",
    cta: {
      label: 'Learn more',
      href: routes.internal.getStarted.href(),
    },
  },
  {
    id: 3,
    title: 'I want to reward my loyal fans automatically',
    description:
      'Launch a referral program, fundraiser, or drop experience powered by our automatic fulfillment solutions.',
    cta: {
      label: 'Learn more',
      href: routes.internal.getStarted.href(),
    },
  },
]

interface Props {}

const HomePageUseCasesSection = ({}: Props) => {
  const router = useRouter()

  return (
    <Section gutter="lg" className="text-white">
      <Container>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter">
          Ways to use Stitchi
        </h2>
      </Container>
      <Container className="mt-14 flex gap-2 md:gap-8 overflow-auto w-full h-[500px]">
        {useCases.map(({ id, title, cta, description }, index) => (
          <div
            key={id}
            className="lg:w-auto flex-shrink-0 flex-[400px] max-w-[80vw] py-4 px-2 lg:flex-1"
          >
            <div
              key={id}
              className={cx(
                'cursor-pointer h-full rounded-xl ring-4 ring-white p-8 flex flex-col justify-between hover:bg-white hover:text-brand-secondary transition-all ease-in-out',
                {
                  'bg-white text-brand-secondary hover:bg-primary hover:ring-primary hover:text-white':
                    index === 0,
                },
              )}
              onClick={() => {
                router.push(cta.href)
              }}
            >
              <div>
                <h3 className="tracking-tight text-2xl font-semibold">
                  {title}
                </h3>
                <p className="mt-8 font-medium text-xl">{description}</p>
              </div>

              <Link href={cta.href}>
                <a className="mt-8 block text-2xl tracking-tight font-bold underline">
                  {cta.label}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </Section>
  )
}

export default HomePageUseCasesSection
