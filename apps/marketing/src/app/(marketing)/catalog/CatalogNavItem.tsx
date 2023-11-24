'use client'

import React from 'react'
import NavItem from '../../(app)/NavItem'
import routes from '@lib/routes'
import { SwatchIcon } from '@heroicons/react/24/outline'
import { useSelectedLayoutSegments } from 'next/navigation'

const CatalogNavItem = () => {
  const selectedLayoutSegments = useSelectedLayoutSegments()

  let active = false

  if (selectedLayoutSegments.includes('catalog')) {
    active = true
  }

  return (
    <NavItem
      activeOverride={active}
      label="Catalog"
      href={routes.internal.closet.catalog.href()}
      icon={<SwatchIcon className="w-5 h-5" />}
    />
  )
}

export default CatalogNavItem
