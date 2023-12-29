'use client'

import Link from 'next/link'
import React from 'react'
import cx from 'classnames'
import { BreadcrumbJsonLd } from 'next-seo'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'

interface Breadcrumb {
  label: string
  href: string
  hidden?: boolean
}

export interface Props {
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
      <nav aria-label="breadcrumbs" className="">
        <ol className="flex gap-2 text-gray-600 text-xs flex-wrap">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              <li className={crumb.hidden ? 'sr-only' : ''}>
                <Link
                  href={crumb.href}
                  className={cx('hover:text-gray-800 whitespace-nowrap', {
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
