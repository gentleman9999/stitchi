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

      <Container className="pt-6 max-w-none">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Home', href: routes.internal.home.href(), hidden: true },
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
      description
      path
      seo {
        metaDescription
      }
    }
  `,
}

export default CategoryShowPage
