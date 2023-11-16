'use client'
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Section } from '@components/common'
import Breadcrumbs from '@components/common/Breadcrumbs'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import CatalogWrapper from 'app/(app)/(catalog)/catalog/(grid)/CatalogWrapper'
import { BrandJsonLd } from 'next-seo'
import { GET_DATA } from './graphql'
import {
  BrandPageGetDataQuery,
  BrandPageGetDataQueryVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'

interface Props {
  path: string
}

const BrandPage = ({ path }: Props) => {
  const { data } = useSuspenseQuery<
    BrandPageGetDataQuery,
    BrandPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      path,
    },
  })

  const brand = data.site.route.node

  if (brand?.__typename !== 'Brand') {
    console.error('Brand should have been returned but wasn`t', {
      brand,
      path,
    })
    notFound()
  }

  const href = routes.internal.catalog.brand.show.href({
    brandSlug: brand.path,
  })

  const url = makeAbsoluteUrl(href)

  return (
    <>
      <BrandJsonLd useAppDir id={url} logo={brand.defaultImage?.url} />

      <Container className="pt-6 max-w-none">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'Home',
              href: routes.internal.home.href(),
              hidden: true,
            },
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
      <CatalogWrapper brandEntityId={brand.entityId} />
    </>
  )
}

export default BrandPage
