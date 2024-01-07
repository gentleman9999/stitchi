'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import {
  DesignRequestApprovedMessageGetDataQuery,
  DesignRequestApprovedMessageGetDataQueryVariables,
  OrderPaymentStatus,
} from '@generated/types'
import React from 'react'
import { SlideOverContent } from '@components/ui/SlideOver'
import routes from '@lib/routes'
import { GlobalDistribution, NeedleThread } from 'icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import Button from '@components/ui/ButtonV2/Button'
import OrderPaymentStatusBadge from '@components/common/OrderPaymentStatusBadge'

interface Props {
  designRequestId: string
}

const DesignRequestApprovedMessage = ({ designRequestId }: Props) => {
  const { data } = useSuspenseQuery<
    DesignRequestApprovedMessageGetDataQuery,
    DesignRequestApprovedMessageGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designProducts, orders } = data.designRequest || {}

  const designProduct = designProducts?.[0]

  if (!designProduct) {
    redirect(
      routes.internal.closet.designs.show.href({
        designId: designRequestId,
      }),
    )
  }

  return (
    <>
      <div className=" bg-gray-50 w-full max-h-[180px] h-full">
        {designProduct.primaryImageFile ? (
          <img
            src={designProduct.primaryImageFile.url}
            width={designProduct.primaryImageFile.width}
            height={designProduct.primaryImageFile.height}
            className="w-full max-h-[180px] aspect-square object-contain"
          />
        ) : null}
      </div>

      <SlideOverContent>
        <h2 className="text-2xl font-bold">{designProduct?.name}</h2>
        {designProduct.description ? (
          <p className="text-sm text-gray-600">{designProduct.description}</p>
        ) : null}

        <div className="flex flex-col gap-4 mt-8">
          {orders?.length ? (
            <Card>
              <CardHeader>
                <CardTitle
                  title="Purchase orders"
                  subtitle="Your ongoing purchase orders for this design."
                />
              </CardHeader>

              <CardContent>
                <ul>
                  {orders.map(order => (
                    <li
                      key={order.id}
                      className="flex border rounded-sm p-3 items-center justify-between gap-4"
                    >
                      <div className="flex gap-3">
                        <div>{order.humanOrderId}</div>
                        <div>
                          <OrderPaymentStatusBadge
                            humanStatus={order.humanPaymentStatus}
                            status={order.paymentStatus}
                            size="small"
                          />
                        </div>
                      </div>

                      {order.paymentStatus === OrderPaymentStatus.PAID ? (
                        <Button
                          Component={Link}
                          href={routes.internal.closet.orders.show.href({
                            orderId: order.id,
                          })}
                        >
                          View order
                        </Button>
                      ) : (
                        <Button
                          Component={Link}
                          href={routes.internal.order.show.pay.href({
                            orderId: order.id,
                          })}
                        >
                          Complete order
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          <Link
            className="p-4 flex gap-4 border border-gray-200 rounded-sm hover:bg-gray-100 transition-all"
            href={routes.internal.closet.inventory.show.products.show.buy.href({
              designId: designProduct.id,
            })}
          >
            <NeedleThread className="w-16 h-16 shrink-0" />
            <div>
              <h2 className="font-bold">Place order</h2>
              <p className="text-gray-600">
                Now that your design is complete, it&apos;s time to bring it to
                life! Place an order, and we&apos;ll start the printing process
                immediately.
              </p>
            </div>
          </Link>
          <Link
            className="p-4 flex gap-4 border border-gray-200 rounded-sm hover:bg-gray-100 transition-all"
            href={routes.internal.closet.inventory.show.products.show.href({
              designId: designProduct.id,
            })}
          >
            <GlobalDistribution className="w-16 h-16 shrink-0" />
            <div>
              <h2 className="font-bold">Manage product</h2>
              <p className="text-gray-600">
                Manage your product and its inventory. Seamlessly share it with
                your network or itegrate it with your e-commerce platform.
              </p>
            </div>
          </Link>
        </div>
      </SlideOverContent>
    </>
  )
}

const GET_DATA = gql`
  query DesignRequestApprovedMessageGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      designProducts {
        id
        name
        description
        primaryImageFile {
          id
          url
          width
          height
        }
      }
      orders {
        id
        humanOrderId
        humanPaymentStatus
        paymentStatus
      }
    }
  }
`

export default DesignRequestApprovedMessage
