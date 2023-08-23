import ClosetSection from '@components/common/ClosetSection'
import { LinkInline } from '@components/ui'
import Alert from '@components/ui/Alert'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import Table from '@components/ui/Table/Table'
import routes from '@lib/routes'
import React from 'react'
import cx from 'classnames'
import { gql, useQuery } from '@apollo/client'
import {
  DesignInventoryTabGetDataQuery,
  DesignInventoryTabGetDataQueryVariables,
} from '@generated/DesignInventoryTabGetDataQuery'
import ColorSwatch from '@components/common/ColorSwatch'

interface Props {
  designId: string
}

const DesignInventory = (props: Props) => {
  const { data } = useQuery<
    DesignInventoryTabGetDataQuery,
    DesignInventoryTabGetDataQueryVariables
  >(GET_DATA, { variables: { designProductId: props.designId } })

  const { sizes, colors } = data?.designProduct || {}

  return (
    <div>
      <ClosetSection>
        <Alert
          description={
            <>
              <b>Storing inventory with Stitchi is currently in trial.</b>{' '}
              Please contact our team at{' '}
              <LinkInline href={routes.external.support.email.href()} external>
                {routes.external.support.email.href().replace('mailto:', '')}
              </LinkInline>{' '}
              to request access to Stitchi Fulfillment.
              <br />
              <br />
              <i>
                Please note: Stitchi Fulfillment is currently limited to
                customers processing at least 100 units per month.
              </i>
            </>
          }
        />
      </ClosetSection>
      <ClosetSection>
        <Card disabled>
          <CardContent>
            <Table>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `150px repeat(${
                    sizes?.length || 1
                  }, 1fr)`,
                }}
              >
                <Cell className="text-sm font-semibold">Color</Cell>
                {sizes?.map(size => (
                  <Cell
                    key={size.id}
                    className="text-sm font-semibold text-center"
                  >
                    {size.name}
                  </Cell>
                )) || <Cell className="text-sm font-semibold">One size</Cell>}

                {colors?.map(color => (
                  <>
                    <Cell>
                      <div className="flex items-center text-xs">
                        <ColorSwatch hexCode={color.hex || '#000'} />

                        <span className="ml-1 w-full">{color.name}</span>
                      </div>
                    </Cell>
                    {sizes?.map(size => (
                      <Cell
                        key={size.id}
                        className="text-sm text-gray-400 text-center"
                      >
                        0
                      </Cell>
                    ))}
                  </>
                ))}
              </div>
            </Table>
          </CardContent>
        </Card>
      </ClosetSection>
    </div>
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
  query DesignInventoryTabGetDataQuery($designProductId: ID!) {
    designProduct(id: $designProductId) {
      id
      sizes {
        id
        name
      }
      colors {
        id
        name
        hex
      }
    }
  }
`

export default DesignInventory
