import { gql } from '@apollo/client'
import { ProductColorGridProductFragment } from '@generated/ProductColorGridProductFragment'
import useProductColors from '@hooks/useProductColors'
import React from 'react'
import cx from 'classnames'

interface Props {
  product: ProductColorGridProductFragment
  colorEntityId: number | null
  onColorSelect: (colorEntityId: number) => void
}

const ProductColorGrid = ({ product, colorEntityId, onColorSelect }: Props) => {
  const { colors } = useProductColors({ product })

  const currentColor = colors.find(c => c.entityId === colorEntityId)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h3 className="text font-bold text-gray-700">Available Colors</h3>
        {currentColor ? (
          <span className="text-sm font-semibold text-gray-600">
            {currentColor.label}
          </span>
        ) : null}
      </div>

      <ul className="flex flex-wrap gap-1">
        {colors.map(({ hexColors, entityId, label }) => (
          <li key={entityId}>
            <span
              role="button"
              className={cx(
                'inline-flex w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer',
                {
                  'outline outline-2 outline-primary outline-offset-1 ':
                    colorEntityId === entityId,
                },
              )}
              style={{
                backgroundColor: hexColors[0],
              }}
              onClick={() => onColorSelect(entityId)}
            />
            <span className="sr-only">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

ProductColorGrid.fragments = {
  product: gql`
    ${useProductColors.fragments.product}
    fragment ProductColorGridProductFragment on Product {
      id
      ...UseProductColorsProductFragment
    }
  `,
}

export default ProductColorGrid
