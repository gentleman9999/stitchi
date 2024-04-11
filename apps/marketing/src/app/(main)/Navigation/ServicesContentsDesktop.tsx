import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {}

const ServicesContentsDesktop = ({}: Props) => {
  return (
    <ul className="p-2">
      <li>
        <Link
          href={routes.internal.solutions.design.href()}
          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Custom Design
        </Link>
      </li>
      <li>
        <Link
          href={routes.internal.solutions.customization.href()}
          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Bulk Orders
        </Link>
      </li>
      <li>
        <Link
          href={routes.internal.solutions.distribution.href()}
          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Express Delivery
        </Link>
      </li>

      <li>
        <Link
          href={routes.internal.solutions.swagBox.href()}
          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Unwrapping Experiences
        </Link>
      </li>
    </ul>
  )
}

export default ServicesContentsDesktop
