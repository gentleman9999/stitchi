import { gql } from '@apollo/client'
import { ClosetBrandIndexPageColorsColorPreviewColorFragment } from '@generated/ClosetBrandIndexPageColorsColorPreviewColorFragment'
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Color from 'color'
import React from 'react'

interface Props {
  color: ClosetBrandIndexPageColorsColorPreviewColorFragment
  onEdit: (colorId: string) => void
  onDelete: (colorId: string) => void
}

const ClosetBrandIndexPageColorsColorPreview = ({
  color,
  onEdit,
  onDelete,
}: Props) => {
  const rgbColor = new Color(color.hex)

  return (
    <div className="flex flex-col items-center group">
      <div
        className="w-36 h-36 rounded-md relative overflow-hidden"
        style={{
          backgroundColor: color.hex || undefined,
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gray-900/25 flex flex-col items-center justify-end p-2">
          <span className="text-sm text-white">hex({rgbColor.hex()})</span>
          <span className="text-sm text-white">{rgbColor.string()}</span>
          <span className="text-sm text-white">
            cmyk({rgbColor.cmyk().round().array().join(', ')})
          </span>

          <div className="absolute top-2 right-2">
            <div className="flex gap-1">
              <button
                className="p-1 rounded-md bg-white/50 hover:bg-white/25"
                onClick={() => onEdit(color.id)}
              >
                <PencilIcon className="w-4 h-4 text-white" />
              </button>
              <button
                className="p-1 rounded-md bg-white/50 hover:bg-white/25"
                onClick={() => onDelete(color.id)}
              >
                <TrashIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <span className="text-sm">{color.name}</span>
    </div>
  )
}

ClosetBrandIndexPageColorsColorPreview.fragments = {
  color: gql`
    fragment ClosetBrandIndexPageColorsColorPreviewColorFragment on Color {
      id
      name
      hex
      cmykC
      cmykM
      cmykY
      cmykK
    }
  `,
}

export default ClosetBrandIndexPageColorsColorPreview
