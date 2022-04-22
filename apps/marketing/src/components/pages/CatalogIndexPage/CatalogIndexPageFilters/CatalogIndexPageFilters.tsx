import React from 'react'
import Desktop from './Desktop'
import Mobile from './Mobile'

interface Props {}

const CatalogIndexPageFilters = ({}: Props) => {
  return (
    <>
      <nav>
        <div className="hidden sm:block">
          <Desktop />
          <div className="mt-8 ">{/* <CatalogIndexPageFilterSummary /> */}</div>
        </div>

        <div className="sm:hidden">
          <Mobile />
        </div>
      </nav>
    </>
  )
}

export default CatalogIndexPageFilters
