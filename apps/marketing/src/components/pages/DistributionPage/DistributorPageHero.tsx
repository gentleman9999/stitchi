import { Section } from '@components/common'
import { Button, Container } from '@components/ui'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

const DistributorPageHero = () => {
  return (
    <div className="min-h-screen flex items-center bg-secondary">
      <Container>
        <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-7xl text-white font-extrabold tracking-tight leading-tight">
                Automate merch fulfillment without hiring
              </h1>
              <p className="text-xl text-secondaryAlt-400 mt-4 font-medium">
                Stitchi handles storing, packing, and shipping your inventory.
                We build and integrate with all e-commerce apps including
                Shopify, Instagram, and BigCommerce.
              </p>
              <div className="mt-8">
                <Link href={routes.internal.getStarted.href()} passHref>
                  <Button
                    bold
                    color="brandPrimary"
                    className="!text-primary"
                    variant="ghost"
                    Component="a"
                  >
                    Start now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}

export default DistributorPageHero
