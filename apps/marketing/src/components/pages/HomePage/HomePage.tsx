import React from 'react'
import Container from '@components/ui/Container'
import HomePageHero from './HomePageHero'
import HomePageUseCasesSection from './HomePageUseCasesSection'
import HomePageTestimonial from './HomePageTestimonial'
import { Section } from '@components/common'
import CustomerLogoBanner from '@components/common/CustomerLogoBanner'
import HomePageSolutions from './HomePageSolutions'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import routes from '@lib/routes'

export interface HomePageProps {}

const HomePage = ({}: HomePageProps) => {
  return (
    <>
      <HomePageHero />

      <Section>
        <CustomerLogoBanner />
      </Section>

      <div className="divide-y-2 divide-black">
        <Container>
          <Section gutter="lg">
            <HomePageSolutions />
          </Section>
        </Container>

        <div className="bg-primary-light">
          <Container>
            <Section
              gutter="lg"
              className="flex flex-col items-center text-center"
            >
              <span className="uppercase text-sm font-light">
                Built for scale
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 ">
                Merch is awesome. <br />
                Managing it sucks.
              </h2>
              <p className="mt-6 text-gray-700  max-w-md">
                Develop quality branded merchandise experiences with a partner
                you can depend on every step of the way.
              </p>

              <Button
                className="mt-6"
                size="xl"
                Component={Link}
                variant="flat"
                href={routes.internal.getStarted.href()}
              >
                Sign up for free
              </Button>
            </Section>
          </Container>
        </div>

        <HomePageTestimonial />

        <div className="">
          <HomePageUseCasesSection />
        </div>
      </div>
    </>
  )
}

export default HomePage
