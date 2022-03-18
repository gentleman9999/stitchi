import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { ProductShowPage } from '@components/pages'
import { withAuthenticatedUser } from '@components/hoc'
import { ComponentErrorMessage } from '@components/common'
import { MainDashboard } from '@components/layout'

const ProductShow = () => {
  const router = useRouter()
  const { id } = router.query

  if (typeof id !== 'string') {
    return <ComponentErrorMessage error="Product ID must be provided" />
  }

  return <ProductShowPage productId={id} />
}

ProductShow.getLayout = (page: ReactElement) => (
  <MainDashboard>{page}</MainDashboard>
)

export default withAuthenticatedUser(ProductShow)
