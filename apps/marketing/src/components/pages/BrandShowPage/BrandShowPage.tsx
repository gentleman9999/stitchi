import { gql } from '@apollo/client'
import { Section } from '@components/common'
import Catalog from '@components/common/Catalog'
import { Container } from '@components/ui'
import { BrandShowPageBrandFragment } from '@generated/BrandShowPageBrandFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import { NextSeo } from 'next-seo'
import React from 'react'

interface Props {
  brand: BrandShowPageBrandFragment
}
const BrandShowPage = ({ brand }: Props) => {
  const url = makeAbsoluteUrl(
    routes.internal.catalog.brand.show.href({ brandSlug: brand.path }),
  )

  return (
    <>
      <NextSeo
        title={`Browse ${brand.seo.pageTitle} products`}
        // TODO: Add description
        description={brand.seo.metaDescription}
        canonical={url}
        openGraph={{ url }}
      />

      <Container>
        <Section>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
            {brand.name}
          </h1>
        </Section>
      </Container>
      <Catalog brandEntityId={brand.entityId} />
    </>
  )
}

BrandShowPage.fragments = {
  brand: gql`
    fragment BrandShowPageBrandFragment on Brand {
      id
      entityId
      name
      path
      seo {
        pageTitle
        metaDescription
      }
    }
  `,
}

export default BrandShowPage
