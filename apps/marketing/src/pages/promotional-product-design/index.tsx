import { PrimaryLayout } from '@components/layout'
import { DesignPage } from '@components/pages'
import { ReactElement } from 'react'

const PromotionalProductsDesign = () => {
  return <DesignPage />
}

PromotionalProductsDesign.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default PromotionalProductsDesign
