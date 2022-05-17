import { PrimaryLayout } from '@components/layout'
import { DistributionPage } from '@components/pages'
import { ReactElement } from 'react'

const PromotionalProductsDistribution = () => {
  return <DistributionPage />
}

PromotionalProductsDistribution.getLayout = (page: ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

export default PromotionalProductsDistribution
