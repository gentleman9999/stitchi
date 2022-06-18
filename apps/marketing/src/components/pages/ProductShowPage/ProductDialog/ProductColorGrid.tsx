import { gql } from '@apollo/client'
import { ProductColorGridProductFragment } from '@generated/ProductColorGridProductFragment'
import useProductColors from '@hooks/useProductColors'
import React from 'react'

interface Props {
  product: ProductColorGridProductFragment
  onColorSelect: (colorEntityId: number) => void
}

const ProductColorGrid = ({ product, onColorSelect }: Props) => {
  const { colors } = useProductColors({ product })

  return (
    <div className="flex flex-wrap gap-1">
      {colors.map(({ hexColors, entityId }) => (
        <span
          role="button"
          key={entityId}
          className="inline-flex w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer"
          style={{
            backgroundColor: hexColors[0],
          }}
          onClick={() => onColorSelect(entityId)}
        />
      ))}
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
