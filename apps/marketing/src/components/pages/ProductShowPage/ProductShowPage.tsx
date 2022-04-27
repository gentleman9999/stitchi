import { gql } from '@apollo/client'
import { ProductShowPageProductFragment } from '@generated/ProductShowPageProductFragment'
import { ProductShowPageSiteFragment } from '@generated/ProductShowPageSiteFragment'
import React from 'react'
import CatalogIndexPage from '../CatalogIndexPage'
import ProductDialog from './ProductDialog/ProductDialog'
import ProductSeo from './ProductSeo'

interface Props {
  product: ProductShowPageProductFragment
  site?: ProductShowPageSiteFragment | null
}

const ProductShowPage = ({ site, product }: Props) => {
  return (
    <>
      <ProductSeo product={product} />
      <CatalogIndexPage site={site} />
      <ProductDialog product={product} />
    </>
  )
}

ProductShowPage.fragments = {
  site: gql`
    ${CatalogIndexPage.fragments.site}
    fragment ProductShowPageSiteFragment on Site {
      ...CatalogIndexPageSiteFragment
    }
  `,
  product: gql`
    ${ProductDialog.fragments.product}
    ${ProductSeo.fragments.product}
    fragment ProductShowPageProductFragment on Product {
      id
      ...ProductSeoProductFragment
      ...ProductDialogProductFragment
    }
  `,
}

export default ProductShowPage
