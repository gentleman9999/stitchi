import { PrimaryLayout } from '@components/layout'
import { ProductComparrisonIndexPage } from '@components/pages'
import { ReactElement } from 'react'

const Compare = () => {
  return <ProductComparrisonIndexPage />
}

Compare.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default Compare
