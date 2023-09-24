import React from 'react'
import { Container } from '@components/ui'
import Catalog from '@components/common/Catalog'
import routes from '@lib/routes'
import { Section } from '@components/common'
import Breadcrumbs from '@components/common/Breadcrumbs'

export interface CatalogIndexPageProps {}

const CatalogIndexPage = ({}: CatalogIndexPageProps) => {
  return (
    <>
      <Container>
        <div className="sr-only">
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Home', href: routes.internal.home.href() },
              { label: 'Catalog', href: routes.internal.catalog.href() },
            ]}
          />
        </div>

        <Section>
          <Catalog />
        </Section>
      </Container>
    </>
  )
}

export default CatalogIndexPage
