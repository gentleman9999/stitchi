import { gql } from '@apollo/client'
import Button from '@components/ui/ButtonV2/Button'
import { CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import {
  InventoryProductDetailsGetDataQuery,
  InventoryProductDetailsGetDataQueryVariables,
} from '@generated/types'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import Link from 'next/link'
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
      <CardHeader>
        <div className="flex gap-4 justify-between items-center">
          <CardTitle title={designProduct.name} />
          <Button
            size="xs"
            variant="naked"
            Component={Link}
            href={routes.internal.closet.inventory.href()}
          >
            <XMarkIcon className="w-6 h-6" />
          </Button>
        </div>
      </CardHeader>

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
