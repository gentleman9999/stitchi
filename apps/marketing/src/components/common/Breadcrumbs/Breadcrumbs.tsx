import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import { BreadcrumbJsonLd } from 'next-seo'
import makeAbsoluteUrl from '@utils/get-absolute-url'

interface Breadcrumb {
  label: string
  href: string
  hidden?: boolean
}

interface Props {
  breadcrumbs: Breadcrumb[]
}

const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={breadcrumbs.map((crumb, i) => ({
          position: i + 1,
          name: crumb.label,
          item: makeAbsoluteUrl(crumb.href),
        }))}
      />
      <nav aria-label="breadcrumbs" className="sr-only sm:not-sr-only">
        <ol className="flex gap-2 text-gray-600 text-xs">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              <li className={crumb.hidden ? 'sr-only' : ''}>
                <Link
                  href={crumb.href}
                  className={cx('hover:text-gray-800', {
                    'pointer-events-none underline':
                      i === breadcrumbs.length - 1,
                  })}
                >
                  {crumb.label}
                </Link>
              </li>
              {i < breadcrumbs.length - 1 ? (
                <li className={crumb.hidden ? 'sr-only' : ''}>
                  <span>/</span>
                </li>
              ) : null}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
