import { gql, useQuery } from '@apollo/client'
import { Container, Badge, LinkInline } from '@components/ui'
import { ClosetOrdersIndexPageGetDataQuery } from '@generated/ClosetOrdersIndexPageGetDataQuery'
import currency from 'currency.js'
import React from 'react'
import cx from 'classnames'
import { format, parseISO } from 'date-fns'
import Section from '../Section'
import routes from '@lib/routes'
import { notEmpty } from '@utils/typescript'

interface Props {}

const ClosetOrdersIndexPage = (props: Props) => {
  const { data } = useQuery<ClosetOrdersIndexPageGetDataQuery>(GET_DATA)

  const { pageInfo, edges } = data?.viewer?.orders || {}

  const orders = edges?.map(edge => edge?.node).filter(notEmpty)

  return (
    <>
      <Container>
        <Section gutter="md">
          <h1 className="text-4xl">Your orders</h1>
        </Section>

        <div
          className="grid border-t"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          <Cell className="sr-only">Order Date</Cell>
          <Cell className="sr-only">Order Total</Cell>
          <Cell className="sr-only">Order Fulfillment Status</Cell>
          <Cell right className="sr-only">
            Actions
          </Cell>

          {orders?.map(order => (
            <>
              <Cell className="font-medium text-gray-500">
                {format(parseISO(order.createdAt), 'PP')}
              </Cell>
              <Cell>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 font-medium">
                    {currency(order.totalPriceCents, {
                      fromCents: true,
                    }).format()}
                    <Badge
                      label={order.humanPaymentStatus}
                      severity="success"
                      size="small"
                    />
                  </div>
                  <span className="text-gray-500 text-xs">
                    {currency(order.totalTaxCents, {
                      fromCents: true,
                    }).format()}{' '}
                    tax
                  </span>
                </div>
              </Cell>
              <Cell>FULFILLED</Cell>
              <Cell right>
                <div className="flex flex-col gap-2">
                  <LinkInline
                    external
                    href={routes.internal.order.show.href({
                      orderId: order.id,
                    })}
                  >
                    View order
                  </LinkInline>
                  <span className="text-xs text-gray-400">
                    Order{' '}
                    <span className="text-gray-600">{order.humanOrderId}</span>
                  </span>
                </div>
              </Cell>
            </>
          ))}
        </div>
      </Container>
    </>
  )
}

const Cell = ({
  children,
  right,
  className,
}: {
  children?: React.ReactNode
  right?: boolean
  className?: string
}) => {
  return (
    <div
      className={cx(
        className,
        'border-b px-2 py-3 flex flex-col justify-center',
        {
          'items-end': right,
        },
      )}
    >
      {children}
    </div>
  )
}

const GET_DATA = gql`
  query ClosetOrdersIndexPageGetDataQuery {
    viewer {
      id
      orders(first: 50) {
        edges {
          node {
            id
            humanOrderId
            humanPaymentStatus
            totalTaxCents
            totalPriceCents
            createdAt
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`

export default ClosetOrdersIndexPage
