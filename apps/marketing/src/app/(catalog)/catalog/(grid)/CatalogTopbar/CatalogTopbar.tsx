import React from 'react'
import SortButton from './SortButton'
import Breadcrumbs, { BreadcrumbProps } from '@components/common/Breadcrumbs'
import routes from '@lib/routes'
import staticData from '@generated/static.json'
import { useSelectedLayoutSegments } from 'next/navigation'

interface Props {}

const CatalogTopbar = ({}: Props) => {
  const selectedLayoutSegments = useSelectedLayoutSegments()

  const breadcrumbs: BreadcrumbProps['breadcrumbs'] = [
    {
      href: routes.internal.home.href(),
      label: 'Home',
      hidden: true,
    },
    {
      href: routes.internal.catalog.href(),
      label: 'Catalog',
      hidden: true,
    },
  ]

  // It's a catalog grid page
  const [entity, entitySlug] = selectedLayoutSegments

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
    const categorySlugs = entitySlug.split('/')
    categorySlugs.forEach((_, i) => {
      const category = staticData.categories.find(
        category =>
          category.custom_url.url ===
          `/${categorySlugs.slice(0, i + 1).join('/')}/`,
      )

      if (category) {
        breadcrumbs.push({
          href: routes.internal.catalog.category.show.href({
            categorySlug: category.custom_url.url,
          }),
          label: category.name,
        })
      }
    })
  }

  return (
    <div className="flex justify-between items-center">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>
        <SortButton />
      </div>
    </div>
  )
}

export default CatalogTopbar
