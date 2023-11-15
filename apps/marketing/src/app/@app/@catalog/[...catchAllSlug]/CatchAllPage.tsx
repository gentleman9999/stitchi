'use client'

import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  BrandOrCategoryPageGetDataQuery,
  BrandOrCategoryPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { BrandJsonLd } from 'next-seo'
import Container from '@components/ui/Container'
import Breadcrumbs from '@components/common/Breadcrumbs'
import { Section } from '@components/common'
import CatalogWrapper from '../CatalogWrapper'
import { GET_DATA } from './graphql'

interface Props {
  path: string
}

const CatchAllPage = ({ path }: Props) => {
  const { data } = useSuspenseQuery<
    BrandOrCategoryPageGetDataQuery,
    BrandOrCategoryPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      path,
    },
  })

  const node = data?.site.route.node

  switch (node?.__typename) {
    case 'Brand': {
      const brand = node

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

    case 'Category': {
      const category = node

      const href = routes.internal.catalog.category.show.href({
        categorySlug: category.path,
      })

      return (
        <>
          <Container className="pt-6 max-w-none">
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: 'Home',
                  href: routes.internal.home.href(),
                  hidden: true,
                },
                { label: 'Catalog', href: routes.internal.catalog.href() },
                { label: category.name, href },
              ]}
            />
            <Section gutter="sm" className="prose max-w-5xl">
              <h1 className="">{category.name}</h1>
              {category.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: category.description }}
                />
              ) : null}
            </Section>
          </Container>

          <CatalogWrapper categoryEntityId={category.entityId} />
        </>
      )
    }

    default: {
      return null
    }
  }
}

export default CatchAllPage
