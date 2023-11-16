'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import React from 'react'

import { ComponentErrorMessage } from '@components/common'

import DesignInventoryMatrix from './DesignInventoryMatrix'
import {
  Card,
  CardCollapsableContent,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/ui/Card'
import { useProductContext } from '../product-context'
import {
  DesignOverviewGetDataQuery,
  DesignOverviewGetDataQueryVariables,
} from '@generated/types'
import Link from 'next/link'
import routes from '@lib/routes'
import Button from '@components/ui/ButtonV2/Button'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface Props {
  designId: string
}

const DesignOverview = ({ designId }: Props) => {
  const { activeColorId, setActiveColorId } = useProductContext()

  const { data, error } = useSuspenseQuery<
    DesignOverviewGetDataQuery,
    DesignOverviewGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId },
  })

  const design = data?.designProduct

  React.useEffect(() => {
    if (!activeColorId && design) {
      setActiveColorId(design.colors[0]?.id || null)
    }
  }, [activeColorId, design, setActiveColorId])

  return (
    <>
      <ComponentErrorMessage error={error} />

      <div className="flex flex-col gap-4">
        {design ? (
          <Card collapsable>
            <CardHeader>
              <CardTitle title="Inventory" />
            </CardHeader>
            <CardCollapsableContent>
              <CardContent divide>
                <DesignInventoryMatrix
                  designProduct={design}
                  onColorClick={colorId => setActiveColorId(colorId)}
                />
              </CardContent>
            </CardCollapsableContent>
          </Card>
        ) : null}

        {design ? (
          <Card collapsable defaultCollapsed={!design.orders.length}>
            <CardHeader>
              <CardTitle title="Orders" />
            </CardHeader>

            <CardCollapsableContent>
              <CardContent divide>
                {design.orders.length ? (
                  <ul className="flex flex-col gap-4">
                    {design.orders.map(order => (
                      <li
                        key={order.id}
                        className="flex gap-2 justify-between items-center"
                      >
                        <div className="text-sm font-medium">
                          {order.humanOrderId}
                        </div>
                        <Button
                          variant="ghost"
                          Component={Link}
                          href={routes.internal.closet.orders.show.href({
                            orderId: order.id,
                          })}
                          endIcon={<ChevronRightIcon className="w-4 h-4" />}
                        >
                          View order
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>No orders</div>
                )}
              </CardContent>
            </CardCollapsableContent>
          </Card>
        ) : null}
      </div>
    </>
  )
}

const GET_DATA = gql`
  ${DesignInventoryMatrix.fragments.designProduct}
  query DesignOverviewGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      description
      designRequestId
      colors {
        id
        hex
        name
      }

      orders {
        id
        humanOrderId
      }

      ...DesignInventoryMatrixDesignProductFragment
    }
  }
`

export default DesignOverview
