import { gql, useQuery } from '@apollo/client'
import CatalogProductLegacy from '@components/common/CatalogProductLegacy'
import { Container } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import Tabs from '@components/ui/Tabs'
import { CmsLandingPageCatalogSectionCatalogSectionFragment } from '@generated/CmsLandingPageCatalogSectionCatalogSectionFragment'
import {
  CmsLandingPageCatalogSectionGetDataQuery,
  CmsLandingPageCatalogSectionGetDataQueryVariables,
} from '@generated/CmsLandingPageCatalogSectionGetDataQuery'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import Section from '../Section'
import SectionHeader from '../SectionHeader'

const defaultCategories = [
  {
    bigCommerceCategoryId: 545,
    name: 'Best Sellers',
  },
  {
    bigCommerceCategoryId: 538,
    name: 'T-Shirts',
  },
  {
    bigCommerceCategoryId: 520,
    name: 'Sustainable',
  },
]

const createCombinedCategoryMap = (
  categories: CmsLandingPageCatalogSectionCatalogSectionFragment['categories'],
): Map<number, string> => {
  const map = new Map<number, string>()

  for (const category of categories) {
    if (category.name) {
      map.set(category.bigCommerceCategoryId, category.name)
    }
  }

  for (const category of defaultCategories) {
    if (!map.has(category.bigCommerceCategoryId)) {
      map.set(category.bigCommerceCategoryId, category.name)
    }
  }

  return map
}

interface Props {
  catalogSection: CmsLandingPageCatalogSectionCatalogSectionFragment
}

const CmsLandingPageCatalogSection = ({ catalogSection }: Props) => {
  const categories = React.useMemo(() => {
    const categoryMap = createCombinedCategoryMap(catalogSection.categories)

    return Array.from(categoryMap.entries())
      .slice(0, 5)
      .map(([id, name]) => ({
        id,
        name,
      }))
  }, [catalogSection.categories])

  const [categoryId, setCategoryId] = React.useState(categories[0].id)

  const { data, refetch, loading } = useQuery<
    CmsLandingPageCatalogSectionGetDataQuery,
    CmsLandingPageCatalogSectionGetDataQueryVariables
  >(GET_DATA, {
    variables: { categoryId },
  })

  React.useEffect(() => {
    refetch({ categoryId })
  }, [categoryId, refetch])

  const { products } = data?.site.category || {}

  const { title, description } = catalogSection

  return (
    <Container>
      <Section gutter="lg">
        <SectionHeader
          align="left"
          title={title}
          subtitle={
            description ? (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : undefined
          }
        />
        <div className="mt-8 flex flex-col gap-8">
          <div>
            <Button
              size="lg"
              variant="ghost"
              Component={Link}
              href={routes.internal.catalog.href()}
            >
              Browse catalog
            </Button>
          </div>

          <Tabs
            value={categoryId.toString()}
            onValueChange={value => {
              setCategoryId(parseInt(value))
            }}
          >
            <Tabs.TabList>
              {categories.map(category => (
                <Tabs.Tab key={category.id} value={category.id.toString()}>
                  {category.name}
                </Tabs.Tab>
              ))}
            </Tabs.TabList>
          </Tabs>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {loading
              ? Array.from(new Array(4)).map((_, i) => (
                  <CatalogProductLegacy
                    loading
                    key={i}
                    product={null}
                    priority={false}
                  />
                ))
              : products?.edges
                  ?.map(edge => edge?.node)
                  .map(product =>
                    product ? (
                      <CatalogProductLegacy
                        key={product.id}
                        product={product}
                        priority={false}
                      />
                    ) : null,
                  )}
          </div>
        </div>
      </Section>
    </Container>
  )
}

const GET_DATA = gql`
  ${CatalogProductLegacy.fragments.product}
  query CmsLandingPageCatalogSectionGetDataQuery($categoryId: Int!) {
    site {
      category(entityId: $categoryId) {
        id
        products(first: 4) {
          edges {
            node {
              id
              ...CatalogProductLegacyProductFragment
            }
          }
        }
      }
    }
  }
`

CmsLandingPageCatalogSection.fragments = {
  catalogSection: gql`
    fragment CmsLandingPageCatalogSectionCatalogSectionFragment on PageSectionCatalogRecord {
      id
      title
      description

      categories {
        id
        bigCommerceCategoryId
        name
      }
    }
  `,
}

export default CmsLandingPageCatalogSection
