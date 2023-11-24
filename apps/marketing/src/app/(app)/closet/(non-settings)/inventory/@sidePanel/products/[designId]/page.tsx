import { gql } from '@apollo/client'
import { CardContent } from '@components/ui/Card'
import {
  InventoryProductDetailsGetDataQuery,
  InventoryProductDetailsGetDataQueryVariables,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import { notFound } from 'next/navigation'
import React from 'react'
import ProductActions from './ProductActions'
import { DESIGN_PRODUCT } from './ProductActions.fragments'
import DesignOverview from './DesignOverview'

export const dynamic = 'force-dynamic'

const Page = async ({
  params: { designId },
}: {
  params: { designId: string }
}) => {
  const client = await getClient()

  const { data } = await client.query<
    InventoryProductDetailsGetDataQuery,
    InventoryProductDetailsGetDataQueryVariables
  >({ query: GET_DATA, variables: { designId } })

  const { designProduct } = data || {}

  if (!designProduct) {
    return notFound()
  }

  return (
    <>
      <CardContent divide>
        <ProductActions designProduct={designProduct} />
      </CardContent>

      <CardContent divide>
        <DesignOverview designId={designId} />
      </CardContent>
    </>
  )
}

const GET_DATA = gql`
  ${DESIGN_PRODUCT}
  query InventoryProductDetailsGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      designRequestId
      name
      ...InventoryProductDetailsDesignFragment
    }
  }
`

export default Page
