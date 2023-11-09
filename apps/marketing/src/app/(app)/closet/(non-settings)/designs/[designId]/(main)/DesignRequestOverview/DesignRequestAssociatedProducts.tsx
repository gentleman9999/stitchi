import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import Button from '@components/ui/ButtonV2/Button'
import {
  DesignRequestAssociatedProductsGetDataQuery,
  DesignRequestAssociatedProductsGetDataQueryVariables,
} from '@generated/DesignRequestAssociatedProductsGetDataQuery'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  designRequestId: string
}

const DesignRequestAssociatedProducts = ({ designRequestId }: Props) => {
  const { data, loading } = useQuery<
    DesignRequestAssociatedProductsGetDataQuery,
    DesignRequestAssociatedProductsGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const designRequest = data?.designRequest

  if (loading || !designRequest || designRequest.designProducts.length === 0) {
    return null
  }

  return (
    <ClosetSection>
      <ClosetSectionHeader>
        <ClosetSectionTitle title="Good news, your design is ready for production!" />{' '}
      </ClosetSectionHeader>

      <div className="flex flex-col gap-2">
        {designRequest.designProducts.map(designProduct => (
          <Link
            key={designProduct.id}
            className="flex justify-between gap-2 items-center border rounded-md p-4"
            href={routes.internal.closet.inventory.show.products.show.href({
              designId: designProduct.id,
            })}
          >
            <div className="flex gap-2 items-center">
              <img
                src={designProduct.primaryImageFile?.url}
                alt={designProduct.name}
                width={designProduct.primaryImageFile?.width}
                height={designProduct.primaryImageFile?.height}
                className="w-12 h-12 rounded-md object-contain"
              />

              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {designProduct.name}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="xs"
              endIcon={<ArrowRightIcon className="w-5" />}
            >
              View inventory
            </Button>
          </Link>
        ))}
      </div>
    </ClosetSection>
  )
}

const GET_DATA = gql`
  query DesignRequestAssociatedProductsGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      designProducts {
        id
        name
        primaryImageFile {
          id
          url
          width
          height
        }
      }
    }
  }
`

export default DesignRequestAssociatedProducts
