import { gql } from '@apollo/client'
import { Section } from '@components/common'
import Breadcrumbs from '@components/common/Breadcrumbs'
import Catalog from '@components/common/Catalog'
import { Container } from '@components/ui'
import { CategoryShowPageCategoryFragment } from '@generated/CategoryShowPageCategoryFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { NextSeo } from 'next-seo'
import React from 'react'

interface Props {
  category: CategoryShowPageCategoryFragment
}

const CategoryShowPage = ({ category }: Props) => {
  const href = routes.internal.catalog.category.show.href({
    categorySlug: category.path,
  })

  const url = makeAbsoluteUrl(href)

  return (
    <div>
      <NextSeo
        title={`Browse ${category.name} products`}
        description={category.seo.metaDescription}
        canonical={url}
        openGraph={{ url }}
      />

      <Container className="pt-6">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', href: routes.internal.home.href(), hidden: true },
            { label: 'Catalog', href: routes.internal.catalog.href() },
            { label: category.name, href },
          ]}
        />
        <Section gutter="sm">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold">
            {category.name}
          </h1>
        </Section>
      </Container>

      <Catalog categoryEntityId={category.entityId} />
    </div>
  )
}

export const fragments = {
  category: gql`
    fragment CategoryShowPageCategoryFragment on Category {
      id
      entityId
      name
      path
      seo {
        metaDescription
      }
    }
  `,
}

export default CategoryShowPage
