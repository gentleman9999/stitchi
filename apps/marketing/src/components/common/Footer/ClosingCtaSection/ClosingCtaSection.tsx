import { Section } from '@components/common'
import Button from '@components/ui/ButtonV2/Button'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'

const ClosingCtaSection = () => {
  return (
    <div className=" bg-gray-900">
      <Container className="relative sm:text-center">
        <Section gutter="lg">
          <div className="bg-primary rounded-2xl p-6 sm:px-8 sm:py-20">
            <p className="text-2xl sm:text-3xl font-semibold max-w-3xl md:text-center m-auto font-heading">
              Turn your ideas into quality branded merchandise with a partner
              you can rely on every step of the way.
            </p>
            <div className="mt-16 inline-block">
              <Link
                href={routes.internal.getStarted.href()}
                passHref
                legacyBehavior
              >
                <Button Component="a" color="primary" bold shadow>
                  <div className="flex items-center group">
                    Get started{' '}
                    <ArrowRight
                      strokeWidth="2"
                      className="ml-2 group-hover:translate-x-2 transition-all"
                    />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}

export default ClosingCtaSection
