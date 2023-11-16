'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'
import BreadcrumbsBase, {
  BreadcrumbProps,
} from '@components/common/Breadcrumbs'
import routes from '@lib/routes'
import staticData from '@generated/static.json'
import Container from '@components/ui/Container'

const Breadcrumbs = () => {
  const selectedLayoutSegments = useSelectedLayoutSegments()

  const [first, ...rest] = selectedLayoutSegments

  const breadcrumbs: BreadcrumbProps['breadcrumbs'] = [
    {
      href: routes.internal.home.href(),
      label: 'Home',
      hidden: true,
    },
    {
      href: routes.internal.catalog.href(),
      label: 'Catalog',
      hidden: selectedLayoutSegments.length === 1,
    },
  ]

  if (first === '(grid)') {
    // It's a catalog grid page
    const [entity, entitySlug] = rest

    if (entity === 'brands') {
      const brand = staticData.brands.find(
        brand => brand.custom_url.url === `/${entitySlug}/`,
      )

      if (brand) {
        breadcrumbs.push({
          href: routes.internal.catalog.brand.show.href({
            brandSlug: entitySlug,
          }),
          label: brand.name,
        })
      }
    } else if (entity === 'categories') {
      const category = staticData.categories.find(
        category => category.custom_url.url === `/${entitySlug}/`,
      )

      if (category) {
        breadcrumbs.push({
          href: routes.internal.catalog.category.show.href({
            categorySlug: entitySlug,
          }),
          label: category.name,
        })
      }
    }
  } else if (first === 'brands') {
    const [brandSlug, _, productSlug] = rest

    const brand = staticData.brands.find(
      brand => brand.custom_url.url === `/${brandSlug}/`,
    )

    if (brand) {
      breadcrumbs.push({
        href: routes.internal.catalog.brand.show.href({
          brandSlug,
        }),
        label: brand.name,
      })

      if (productSlug) {
        breadcrumbs.push({
          href: routes.internal.catalog.product.href({
            brandSlug,
            productSlug,
          }),
          label: productSlug
            .split('-')
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(' '),
        })
      }
    }
  }

  if (breadcrumbs.length === 2) {
    return null
  }

  return (
    <Container className="max-w-none">
      <BreadcrumbsBase breadcrumbs={breadcrumbs} />
    </Container>
  )
}

export default Breadcrumbs
