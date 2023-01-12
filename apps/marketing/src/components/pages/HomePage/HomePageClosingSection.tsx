import { Section } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import { Button } from '@components/ui'

const HomePageClosingSection = () => {
  return (
    <Section gutter="xl">
      <div className="relative">
        <div className="relative">
          <div className="sm:text-center">
            <p className="mt-14 lg:mt-20 text-2xl font-medium leading-tight tracking-tight max-w-[650px] md:text-center m-auto">
              Make the stitch and join hundreds of businesses, brands, and
              creators building brand engagement, loyalty, and revenue with
              Stitchi.
            </p>
            <div className="mt-16 inline-block">
              <Link
                href={routes.internal.getStarted.href()}
                passHref
                legacyBehavior
              >
                <Button
                  Component="a"
                  color="primary"
                  bold
                  shadow
                  endIcon={<ArrowRight strokeWidth="2" />}
                >
                  Work with us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default HomePageClosingSection
