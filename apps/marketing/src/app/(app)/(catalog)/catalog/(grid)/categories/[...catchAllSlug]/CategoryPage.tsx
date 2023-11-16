'use client'

import React from 'react'
import { GET_DATA } from './graphql'
import Container from '@components/ui/Container'
import Breadcrumbs from '@components/common/Breadcrumbs'
import routes from '@lib/routes'
import { Section } from '@components/common'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import CatalogWrapper from 'app/(app)/(catalog)/catalog/(grid)/CatalogWrapper'
import {
  CatalogCategoryPageGetDataQuery,
  CatalogCategoryPageGetDataQueryVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'

interface Props {
  path: string
}

const CategoryPage = ({ path }: Props) => {
  const { data } = useSuspenseQuery<
    CatalogCategoryPageGetDataQuery,
    CatalogCategoryPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      path,
    },
  })

  const category = data.site.route.node

  if (category?.__typename !== 'Category') {
    console.error('Category should have been returned but wasn`t', {
      category,
      path,
    })

    notFound()
  }

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
            <div dangerouslySetInnerHTML={{ __html: category.description }} />
          ) : null}
        </Section>
      </Container>

      <CatalogWrapper categoryEntityId={category.entityId} />
    </>
  )
}

export default CategoryPage
