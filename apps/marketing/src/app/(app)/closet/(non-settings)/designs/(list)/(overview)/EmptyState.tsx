import { PaintBrushIcon } from '@heroicons/react/24/outline'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {}

const EmptyState = (props: Props) => {
  return (
    <Link
      href={routes.internal.closet.designs.create.href()}
      className="relative block w-full rounded-sm border border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <PaintBrushIcon
        className="mx-auto h-9 w-9 text-gray-200"
        aria-hidden="true"
      />
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Create a design
      </span>
    </Link>
  )
}

export default EmptyState
