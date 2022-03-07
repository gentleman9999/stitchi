import React from 'react'
import { useRouter } from 'next/router'
import { makeProduct, ProductShowPage } from '@components/pages'
import { withAuthenticatedUser } from '@components/hoc'

const ProductShow = () => {
  const router = useRouter()
  const { uuid } = router.query

  const [product, setProduct] = React.useState(
    uuid ? makeProduct(Number(uuid)) : null,
  )

  React.useEffect(() => {
    if (uuid) {
      setProduct(makeProduct(Number(uuid)))
    }
  }, [uuid])

  return <ProductShowPage product={product} />
}

export default withAuthenticatedUser(ProductShow)
