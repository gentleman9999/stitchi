import { gql } from '@apollo/client'
import Button from '@components/ui/ButtonV2/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import { DesignRequestOrderListOrderFragment } from '@generated/DesignRequestOrderListOrderFragment'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  orders: DesignRequestOrderListOrderFragment[]
}

const DesignRequestOrderList = ({ orders }: Props) => {
  if (!orders.length) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle title="Orders" />
      </CardHeader>
      <CardContent divide>
        <ul>
          {orders.map(order => (
            <li
              key={order.id}
              className="flex justify-between items-center gap-2 text-sm"
            >
              <span>
                Order <b>#{order.humanOrderId}</b>
              </span>
              <Button
                {...{
                  target: '_blank',
                }}
                Component={Link}
                href={routes.internal.closet.orders.show.href({
                  orderId: order.id,
                })}
                variant="naked"
                endIcon={<ArrowRightIcon className="w-4 h-4" />}
              >
                View
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

DesignRequestOrderList.fragments = {
  order: gql`
    fragment DesignRequestOrderListOrderFragment on Order {
      id
      humanOrderId
    }
  `,
}

export default DesignRequestOrderList
