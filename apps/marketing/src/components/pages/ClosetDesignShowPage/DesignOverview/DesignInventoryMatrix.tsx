import ClosetSection from '@components/common/ClosetSection'
import { Card, CardContent } from '@components/ui/Card'
import Table from '@components/ui/Table/Table'
import React from 'react'
import cx from 'classnames'
import { gql } from '@apollo/client'

import ColorSwatch from '@components/common/ColorSwatch'
import { DesignInventoryMatrixDesignProductFragment } from '@generated/DesignInventoryMatrixDesignProductFragment'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import routes from '@lib/routes'

interface Props {
  designProduct: DesignInventoryMatrixDesignProductFragment
}

const DesignInventoryMatrix = ({ designProduct }: Props) => {
  const { sizes, colors } = designProduct

  return (
    <ClosetSection>
      <ClosetSectionHeader>
        <ClosetSectionTitle
          title="Inventory"
          actions={
            <Button
              size="xl"
              Component={Link}
              variant="ghost"
              href={routes.internal.closet.inventory.show.products.show.buy.href(
                {
                  designId: designProduct.id,
                },
              )}
            >
              Restock
            </Button>
          }
        />
      </ClosetSectionHeader>
      <Card>
        <CardContent>
          <Table>
            <div
              className="grid"
              style={{
                gridTemplateColumns: `150px repeat(${sizes?.length || 1}, 1fr)`,
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

DesignInventoryMatrix.fragments = {
  designProduct: gql`
    fragment DesignInventoryMatrixDesignProductFragment on DesignProduct {
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
  `,
}

export default DesignInventoryMatrix
