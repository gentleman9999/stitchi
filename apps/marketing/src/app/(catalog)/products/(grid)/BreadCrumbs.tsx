'use client'

import BreadcrumbsBase from '@components/common/Breadcrumbs'
import routes from '@lib/routes'
import { usePathname } from 'next/navigation'

function slugToBreadcrumb(slug: string): string {
  // Remove all special characters except for dashes and underscores
  const cleanedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')

  // Split the slug by dashes or underscores
  const parts = cleanedSlug.split(/[-_]/)

  // Capitalize the first letter of each part and join them with spaces
  return parts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const BreadCrumbs = () => {
  const pathname = usePathname()!

  const breadcrumbs = [
    { label: 'All products', href: routes.internal.catalog.all.href() },
  ]

  const parts = pathname.split('/')

  if (!pathname.startsWith(routes.internal.catalog.href())) {
    parts.forEach((part, index) => {
      if (part) {
        const href = parts.slice(0, index + 1).join('/')

        breadcrumbs.push({
          href,
          label: slugToBreadcrumb(part),
        })
      }
    })
  }

  return <BreadcrumbsBase useAppDir breadcrumbs={breadcrumbs} />
}

export default BreadCrumbs
