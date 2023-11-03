'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import {
  InventoryProductLayoutGetDataQuery,
  InventoryProductLayoutGetDataQueryVariables,
} from '@generated/types'
import { useParams } from 'next/navigation'
import React from 'react'
import Button from '@components/ui/ButtonV2/Button'
import { CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import { XMarkIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import Link from 'next/link'
import DesignPreviewGallery from './DesignOverview/DesignPreviewGallery'
import { useProductContext } from './product-context'

interface Props {}

const ProductLayoutHeader = ({}: Props) => {
  const { designId } = useParams<{ designId: string }>()!
  const { activeColorId } = useProductContext()

  if (!designId) {
    throw new Error('designId is required')
  }

  const { data } = useSuspenseQuery<
    InventoryProductLayoutGetDataQuery,
    InventoryProductLayoutGetDataQueryVariables
  >(GET_DATA, { variables: { designId } })

  const { designProduct } = data || {}

  return (
    <>
      <CardHeader>
        <div className="flex gap-4 justify-between items-center">
          <CardTitle title={designProduct?.name} />
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

      <CardContent>
        <div className="max-h-[220px] flex overflow-hidden">
          <DesignPreviewGallery
            design={designProduct}
            activeColorId={activeColorId}
          />
        </div>
      </CardContent>
    </>
  )
}

const GET_DATA = gql`
  ${DesignPreviewGallery.fragments.designProduct}
  query InventoryProductLayoutGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      name
      ...DesignPreviewGalleryDesignProductFragment
    }
  }
`

export default ProductLayoutHeader
