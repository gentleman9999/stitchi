import React, { Suspense } from 'react'
import ProductLayoutHeader from './ProductLayoutHeader'
import { ProductProvider } from './product-context'
import Skeleton from '@components/ui/Skeleton'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ProductProvider>
      <Suspense
        fallback={
          <>
            <Skeleton width={120} height={8} />
            <br />
            <Skeleton width="100%" height={220} />
          </>
        }
      >
        <ProductLayoutHeader />
      </Suspense>

      {children}
    </ProductProvider>
  )
}

export default Layout
