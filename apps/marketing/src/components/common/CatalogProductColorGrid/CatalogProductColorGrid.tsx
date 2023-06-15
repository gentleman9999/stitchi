import { gql } from '@apollo/client'
import { CatalogProductColorGridProductFragment } from '@generated/CatalogProductColorGridProductFragment'
import useProductOptions from '@hooks/useProductOptions'
import React from 'react'
import ColorSwatch from '../ColorSwatch'

interface Props {
  product: CatalogProductColorGridProductFragment
  selectedColorEntityIds: number[]
  onColorSelect: (input: { colorEntityId: number; label: string }) => void
}

const CatalogProductColorGrid = ({
  product,
  selectedColorEntityIds,
  onColorSelect,
}: Props) => {
  const { colors } = useProductOptions({ product })

  return (
    <ul className="flex flex-wrap gap-1">
      {colors.map(({ hexColors, entityId, label }) => (
        <li key={entityId}>
          <ColorSwatch
            onClick={() => onColorSelect({ colorEntityId: entityId, label })}
            hexCode={hexColors[0]}
            label={label}
            selected={selectedColorEntityIds.includes(entityId)}
          />
        </li>
      ))}
    </ul>
  )
}

CatalogProductColorGrid.fragments = {
  product: gql`
    ${useProductOptions.fragments.product}
    fragment CatalogProductColorGridProductFragment on Product {
      id
      ...UseProductColorsProductFragment
    }
  `,
}

export default CatalogProductColorGrid
