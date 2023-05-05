import React from 'react'
import { Container } from '@components/ui'
import Catalog from '@components/common/Catalog'
import { NeedleThread } from 'icons'
import Link from 'next/link'
import routes from '@lib/routes'
import { Section } from '@components/common'
import { Button } from '@components/ui'
import Breadcrumbs from '@components/common/Breadcrumbs'

export interface CatalogIndexPageProps {}

const CatalogIndexPage = ({}: CatalogIndexPageProps) => {
  return (
    <>
      <Container>
        <div className="sr-only">
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Home', href: routes.internal.home.href() },
              { label: 'Catalog', href: routes.internal.catalog.href() },
            ]}
          />
        </div>

        <Section>
          <div className="md:pr-0 mt-2 text-center sm:text-left  rounded-xl flex items-center">
            <div className="md:w-[70%]">
              <h1 className="text-lg md:text-xl lg:text-xl font-bold font-heading">
                Browse our curated selection of products
              </h1>
              <p className=" text text-gray-700 mt-2">
                We work with brands that you wont find anywhere else. Our team
                of experts is continually procuring the highest-quality,
                ethical, and unique products so that you can deliver experiences
                people love.
              </p>
              <div className="mt-6">
                <Button
                  slim
                  Component={Link}
                  href={routes.internal.getStarted.href()}
                  color="brandPrimary"
                >
                  Talk to a designer
                </Button>
              </div>
            </div>
            <div className="w-[30%] hidden md:flex items-center justify-center drop-shadow-sm">
              <NeedleThread />
            </div>
          </div>
        </Section>

        <Section>
          <Catalog />
        </Section>
      </Container>
    </>
  )
}

export default CatalogIndexPage
