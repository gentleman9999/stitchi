'use client'

import Container from '@components/ui/Container'
import Button from '@components/ui/ButtonV2/Button'
import Tabs from '@components/ui/Tabs'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import Section from '../../../../../../components/common/Section'
import SectionHeader from '../../../../../../components/common/SectionHeader'
import { CmsLandingPageCatalogSectionCatalogSectionFragment } from '@generated/types'
import CmsLandingPageCatalogSectionProducts from './CmsLandingPageCatalogSectionProducts'
import staticData from '../../../../../../generated/static.json'

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

  const [categoryId, setCategoryId] = React.useState<number | undefined>(
    categories[0]?.id,
  )

  const { title, description } = catalogSection

  const activeCategory = staticData.categories.find(
    category => category.id === categoryId,
  )

  if (!categoryId) {
    return null
  }

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
              href={
                activeCategory
                  ? routes.internal.catalog.category.show.href({
                      categorySlug: activeCategory.custom_url.url,
                    })
                  : routes.internal.catalog.href()
              }
            >
              Browse catalog
            </Button>
          </div>

          <Tabs
            value={categoryId?.toString()}
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
            <CmsLandingPageCatalogSectionProducts categoryId={categoryId} />
          </div>
        </div>
      </Section>
    </Container>
  )
}

export default CmsLandingPageCatalogSection
