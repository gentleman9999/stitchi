import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'
import Tabs from '@components/ui/Tabs'
import routes from '@lib/routes'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Section from '../Section'
import SectionHeader from '../SectionHeader'
import { CmsLandingPageCatalogSectionCatalogSectionFragment } from '@generated/types'
import CatalogProductSkeleton from 'app/(catalog)/catalog/(grid)/CatalogPorductGrid/CatalogProductSkeleton'
import CmsLandingPageCatalogSectionProducts from './CmsLandingPageCatalogSectionProducts'
import { gql } from '@apollo/client'

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
  disableDefaultCategories?: boolean,
): Map<number, string> => {
  const map = new Map<number, string>()

  for (const category of categories) {
    if (category.name) {
      map.set(category.bigCommerceCategoryId, category.name)
    }
  }

  if (!disableDefaultCategories) {
    for (const category of defaultCategories) {
      if (!map.has(category.bigCommerceCategoryId)) {
        map.set(category.bigCommerceCategoryId, category.name)
      }
    }
  }

  return map
}

interface Props {
  catalogSection: CmsLandingPageCatalogSectionCatalogSectionFragment
}

const CmsLandingPageCatalogSection = ({ catalogSection }: Props) => {
  const categories = React.useMemo(() => {
    const categoryMap = createCombinedCategoryMap(
      catalogSection.categories,
      catalogSection.disableDefaultCategories,
    )

    return Array.from(categoryMap.entries())
      .slice(0, 5)
      .map(([id, name]) => ({
        id,
        name,
      }))
  }, [catalogSection.categories, catalogSection.disableDefaultCategories])

  const [categoryId, setCategoryId] = React.useState(categories[0]?.id)

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

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {/* <Suspense
              fallback={Array.from(new Array(4)).map((_, i) => (
                <CatalogProductSkeleton key={i} />
              ))}
            > */}
            <CmsLandingPageCatalogSectionProducts categoryId={categoryId} />
            {/* </Suspense> */}
          </div>
        </div>
      </Section>
    </Container>
  )
}

CmsLandingPageCatalogSection.fragments = {
  catalogSection: gql`
    fragment CmsLandingPageCatalogSectionCatalogSectionFragment on PageSectionCatalogRecord {
      id
      title
      description
      disableDefaultCategories
      categories {
        id
        bigCommerceCategoryId
        name
      }
    }
  `,
}

export default CmsLandingPageCatalogSection
