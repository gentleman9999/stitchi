'use client'

import React from 'react'
import { useFilters } from '../filters-context'
import SortButton from '../CatalogFilters/SortButton'
import Container from '@components/ui/Container'

const Header = () => {
  const { sort } = useFilters()

  return (
    <Container className="max-w-none">
      <div className="flex justify-between items-center">
        <h1>Header</h1>
        <div>
          <SortButton />
        </div>
      </div>
    </Container>
  )
}

export default Header
