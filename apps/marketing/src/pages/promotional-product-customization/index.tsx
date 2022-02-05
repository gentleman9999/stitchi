import { PrimaryLayout } from '@components/layout'
import { CustomizationPage } from '@components/pages'
import { ReactElement } from 'react'

const PromotionalProductsCustomization = () => {
  return <CustomizationPage />
}

PromotionalProductsCustomization.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default PromotionalProductsCustomization
