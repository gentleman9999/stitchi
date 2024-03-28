import Container from '@components/ui/Container'
import React from 'react'
import ValuePropositions from './ValuePropositions'
import Breadcrumbs, { BreadcrumbProps } from '@components/common/Breadcrumbs'
import staticData from '@generated/static.json'
import routes from '@lib/routes'

interface Params {
  brandSlug: string
  productSlug: string
}

interface Props {
  children: React.ReactNode
  share: React.ReactNode
  params: Params
}

const Layout = ({ children, share, params }: Props) => {
  const { brandSlug, productSlug } = params

  const breadcrumbs: BreadcrumbProps['breadcrumbs'] = [
    {
      href: routes.internal.home.href(),
      label: 'Home',
      hidden: true,
    },
    {
      href: routes.internal.catalog.href(),
      label: 'Product catalog',
    },
  ]

  const brand = staticData.brands.find(brand =>
    brand.custom_url.url.startsWith(`/${brandSlug}`),
  )

  if (brand) {
    breadcrumbs.push({
      href: routes.internal.catalog.brand.show.href({
        brandSlug,
      }),
      label: brand.name,
    })

    if (productSlug) {
      breadcrumbs.push({
        href: routes.internal.catalog.product.href({
          productSlug,
        }),
        label: productSlug
          .split('-')
          .map(word => word[0]?.toUpperCase() + word.slice(1))
          .join(' '),
      })
    }
  }

  return (
    <>
      {share}
      <Container className="flex flex-col gap-6 my-4">
        <Breadcrumbs useAppDir breadcrumbs={breadcrumbs} />
        {children}
        <ValuePropositions />
      </Container>
    </>
  )
}

export default Layout
