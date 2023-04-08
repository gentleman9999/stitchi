import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import cx from 'classnames'

interface Props {
  brandSlug: string
  productSlug: string
  brandLabel: string
  productLabel: string
}

const makeBreadcrumbs = (params: Props) => {
  return [
    { label: 'Home', href: routes.internal.home.href() },
    { label: 'Catalog', href: routes.internal.catalog.href() },
    {
      label: params.brandLabel,
      href: routes.internal.catalog.brand.show.href({
        brandSlug: params.brandSlug,
      }),
    },
    {
      label: params.productLabel,
      href: routes.internal.catalog.product.href({
        brandSlug: params.brandSlug,
        productSlug: params.productSlug,
      }),
    },
  ]
}

const Breadcrumbs = (props: Props) => {
  const breadcrumbs = makeBreadcrumbs(props)
  return (
    <nav aria-label="breadcrumbs" className="sr-only sm:not-sr-only">
      <ol className="flex gap-2 text-gray-600 text-xs">
        {breadcrumbs.map((crumb, i) => (
          <>
            <li key={crumb.href}>
              <Link
                href={crumb.href}
                className={cx('hover:text-gray-800', {
                  'pointer-events-none underline': i === breadcrumbs.length - 1,
                })}
              >
                {crumb.label}
              </Link>
            </li>
            {i < breadcrumbs.length - 1 ? (
              <li>
                <span>/</span>
              </li>
            ) : null}
          </>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
