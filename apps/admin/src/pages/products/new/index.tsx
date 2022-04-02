import { withAuthenticatedUser } from '@components/hoc'
import { MainDashboard } from '@components/layout'
import { ProductCreatePage } from '@components/pages'
import { ReactElement } from 'react'

const ProductNew = () => {
  return <ProductCreatePage />
}

ProductNew.getLayout = (page: ReactElement) => (
  <MainDashboard>{page}</MainDashboard>
)

export default withAuthenticatedUser(ProductNew)
