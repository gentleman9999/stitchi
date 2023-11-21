import Button from '@components/ui/ButtonV2/Button'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'

const ClosingCtaSection = () => {
  return (
    <div
      className=" bg-primary bg-cover bg-center bg-no-repeat lg:aspect-[2.3]"
      style={{
        backgroundImage: "url('/closing-cta-bg.png')",
      }}
    >
      <Container className="relative sm:text-center flex items-center justify-center h-full">
        <div className="py-10 md:py-28 lg:py-36 xl:p">
          <div className="flex flex-col items-center gap-8 md:gap-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-3xl md:text-center m-auto font-heading">
              There’s a better way
            </h2>
            <p className="text-lg md:text-xl max-w-sm sm:max-w-lg text-center">
              Develop quality branded merchandise experiences with a partner you
              can depend on at every step.
            </p>
            <div className="inline-block">
              <Link
                href={routes.internal.getStarted.href()}
                passHref
                legacyBehavior
              >
                <Button Component="a" color="primary" bold shadow>
                  <div className="flex items-center group">
                    Create free account{' '}
                    <ArrowRight
                      strokeWidth="2"
                      className="ml-2 group-hover:translate-x-2 transition-all"
                    />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ClosingCtaSection
