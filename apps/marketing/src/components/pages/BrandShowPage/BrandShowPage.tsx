import { gql } from '@apollo/client'
import { Section } from '@components/common'
import Breadcrumbs from '@components/common/Breadcrumbs'
import Catalog from '@components/common/Catalog'
import { Container } from '@components/ui'
import { BrandShowPageBrandFragment } from '@generated/BrandShowPageBrandFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { BrandJsonLd, NextSeo } from 'next-seo'
import React from 'react'

interface Props {
  brand: BrandShowPageBrandFragment
}
const BrandShowPage = ({ brand }: Props) => {
  const href = routes.internal.catalog.brand.show.href({
    brandSlug: brand.path,
  })

  const url = makeAbsoluteUrl(href)

  return (
    <>
      <NextSeo
        title={`Browse ${brand.name} products`}
        description={brand.seo.metaDescription}
        canonical={url}
        openGraph={{ url }}
      />

      <BrandJsonLd id={url} logo={brand.defaultImage?.url} />

      <Container className="pt-6 max-w-none">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', href: routes.internal.home.href(), hidden: true },
            { label: 'Catalog', href: routes.internal.catalog.href() },
            { label: brand.name, href },
          ]}
        />
        <Section>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
            {brand.name}
          </h1>
        </Section>
      </Container>
      <Catalog brandEntityId={brand.entityId} />
    </>
  )
}

export const fragments = {
  brand: gql`
    fragment BrandShowPageBrandFragment on Brand {
      id
      entityId
      name
      path
      defaultImage {
        url(width: 1200)
      }
      seo {
        pageTitle
        metaDescription
      }
    }
  `,
}

export default BrandShowPage
