import React from 'react'
import Image from 'next/legacy/image'
import { Button, LinkInline } from '@components/ui'
import Link from 'next/link'
import routes from '@lib/routes'
import jennyHeadshot from '../../../../public/customers/morning_brew/jenny_rothenberg_morning_brew.jpg'
import referralProgram from '../../../../public/customers/morning_brew/morning_brew_referral_program.jpg'
import { Section } from '@components/common'

const FeaturePageTestimonial = () => {
  return (
    <Section gutter="lg">
      <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
        <div className="mx-auto">
          <div>
            <div className="">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-headingDisplay">
                Do more with swag
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Swag in {new Date().getFullYear()} can supercharge your brand
                through unconventional merch programs, just ask{' '}
                <LinkInline
                  external
                  href={routes.external.customers.morningBrew.href()}
                >
                  Morning Brew
                </LinkInline>
                . We specialize in creating completely custom, end-to-end merch
                programs focused on generating growth and revenue.
              </p>
              <div className="mt-6">
                <Link
                  href={routes.internal.customers.morningBrew.href()}
                  passHref
                  legacyBehavior
                >
                  <Button slim Component="a" variant="ghost">
                    Read the case study
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <blockquote>
              <div>
                <p className="text-base text-gray-500">
                  &ldquo;We shipped over 8,000 pairs of Morning Brew joggers to
                  our loyal readers, resulting in over 75,000 new subscribers.
                  This was our largest growth campaign to date, and we love
                  seeing pictures of our readers wearing their MB joggers on
                  social media.&rdquo;
                </p>
              </div>
              <footer className="mt-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={jennyHeadshot}
                      alt="Jenny Rothenberg Headshot"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-lg font-medium text-gray-700 font-heading">
                    Jenny Rothenberg, Director of Growth
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-0 self-center">
          <div className="relative overflow-hidden w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 pl-4 pr-6 pt-2 pb-2">
            <Image
              src={referralProgram}
              alt="Morning Brew Referral Program"
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FeaturePageTestimonial
