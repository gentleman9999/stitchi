import React from 'react'
// import Catalog from '@components/common/Catalog'
import routes from '@lib/routes'
import Breadcrumbs from '@components/common/Breadcrumbs'

export interface CatalogIndexPageProps {}

const CatalogIndexPage = ({}: CatalogIndexPageProps) => {
  return (
    <>
      <div className="sr-only">
        <Breadcrumbs
          useAppDir={false}
          breadcrumbs={[
            { label: 'Home', href: routes.internal.home.href() },
            { label: 'Catalog', href: routes.internal.catalog.href() },
          ]}
        />
      </div>

      {/* <Catalog /> */}
    </>
  )
}

export default CatalogIndexPage
