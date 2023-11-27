'use client'

import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React from 'react'
import BreadcrumbsBase, {
  BreadcrumbProps,
} from '@components/common/Breadcrumbs'
import routes from '@lib/routes'
import staticData from '@generated/static.json'
import Container from '@components/ui/Container'

const Breadcrumbs = () => {
  const selectedLayoutSegments = useSelectedLayoutSegments()
  const pathname = usePathname()!

  const isCloset = pathname.startsWith('/closet')

  const catalogRoutes = isCloset
    ? routes.internal.closet.catalog
    : routes.internal.catalog

  const [first, ...rest] = selectedLayoutSegments

  const breadcrumbs: BreadcrumbProps['breadcrumbs'] = [
    {
      href: isCloset
        ? routes.internal.closet.href()
        : routes.internal.home.href(),
      label: 'Home',
      hidden: true,
    },
    {
      href: catalogRoutes.href(),
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
          href: catalogRoutes.brand.show.href({
            brandSlug: entitySlug,
          }),
          label: brand.name,
        })
      }
    } else if (entity === 'categories') {
      const categorySlugs = entitySlug.split('/')
      categorySlugs.forEach((_, i) => {
        const category = staticData.categories.find(
          category =>
            category.custom_url.url ===
            `/${categorySlugs.slice(0, i + 1).join('/')}/`,
        )

        if (category) {
          breadcrumbs.push({
            href: catalogRoutes.category.show.href({
              categorySlug: category.custom_url.url,
            }),
            label: category.name,
          })
        }
      })
    }
  } else if (first === 'brands') {
    const [brandSlug, _, productSlug] = rest

    const brand = staticData.brands.find(
      brand => brand.custom_url.url === `/${brandSlug}/`,
    )

    if (brand) {
      breadcrumbs.push({
        href: catalogRoutes.brand.show.href({
          brandSlug,
        }),
        label: brand.name,
      })

      if (productSlug) {
        breadcrumbs.push({
          href: catalogRoutes.product.href({
            brandSlug,
            productSlug,
          }),
          label: productSlug
            .split('-')
            .map(word => word[0]?.toUpperCase() + word.slice(1))
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
