import { Section } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import Link from 'next/link'
import React from 'react'
import { Button } from '@components/ui'

const ClosingCtaSection = () => {
  return (
    <Section
      gutter="lg"
      className="relative sm:text-center bg-primary p-4 sm:p-6 md:p-8"
    >
      <p className="text-2xl font-semibold max-w-[650px] md:text-center m-auto font-heading">
        Make the stitch and join hundreds of businesses, brands, and creators
        building brand engagement, loyalty, and revenue with Stitchi.
      </p>
      <div className="mt-16 inline-block">
        <Link href={routes.internal.getStarted.href()} passHref legacyBehavior>
          <Button Component="a" color="primary" bold shadow>
            <div className="flex items-center group">
              Go to my closet{' '}
              <ArrowRight
                strokeWidth="2"
                className="ml-2 group-hover:translate-x-2 transition-all"
              />
            </div>
          </Button>
        </Link>
      </div>
    </Section>
  )
}

export default ClosingCtaSection
