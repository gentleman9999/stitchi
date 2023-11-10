import React from 'react'
import cx from 'classnames'
import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import { DesignInventoryMatrixDesignProductFragment } from '@generated/DesignInventoryMatrixDesignProductFragment'

interface Props {
  designProduct: DesignInventoryMatrixDesignProductFragment
  onColorClick?: (colorId: string) => void
}

const DesignInventoryMatrix = ({ designProduct, onColorClick }: Props) => {
  const { sizes, colors } = designProduct

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `150px repeat(${sizes?.length || 1}, 1fr)`,
      }}
    >
      <Cell className="text-sm font-semibold">Color</Cell>
      {sizes?.map(size => (
        <Cell key={size.id} className="text-sm font-semibold text-center">
          {size.name}
        </Cell>
      )) || <Cell className="text-sm font-semibold">One size</Cell>}

      {colors?.map(color => (
        <React.Fragment key={color.id}>
          <Cell>
            <div className="flex items-center text-xs">
              <ColorSwatch
                hexCode={color.hex || '#000'}
                label={color.name}
                onClick={() => onColorClick?.(color.id)}
              />

              <span className="ml-1 w-full">{color.name}</span>
            </div>
          </Cell>
          {sizes?.map(size => (
            <Cell key={size.id} className="text-sm text-gray-400 text-center">
              0
            </Cell>
          ))}
        </React.Fragment>
      ))}
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
        'border-b border-gray-50 px-2 py-2 flex flex-col justify-center',
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
