import React from 'react'
import cx from 'classnames'
import Color from 'color'
import { CheckIcon } from '@heroicons/react/20/solid'

interface Props {
  hexCode: string
  label?: string
  selected?: boolean
  onClick?: () => void
  width?: string
  height?: string
  checked?: boolean
}

const ColorSwatch = (props: Props) => {
  const { width = 'w-8', height = 'h-8' } = props

  // TODO(everest): Hack to path broken product catalog colors
  // https://linear.app/stitchi/issue/ENG-112/fix-product-color-swatch-codes-with-dropped-value
  const color = new Color(props.hexCode === '#DROPPED' ? '#000' : props.hexCode)

  return (
    <div
      onClick={props.onClick}
      style={{
        outlineColor: ensureMaximumLightness(color, 96).toString(),
      }}
      className={cx(
        props.selected ? 'outline outline-4 ' : '',
        Boolean(props.onClick) ? 'cursor-pointer' : '',
        'relative flex items-center justify-center rounded-full p-0.5',
      )}
    >
      <label className="sr-only">{props.label}</label>
      <span
        aria-hidden="true"
        style={{
          backgroundColor: color.toString(),
          borderColor: color.darken(0.1).toString(),
        }}
        className={cx(`${width} ${height} rounded-full border`)}
      />
      {props.checked ? (
        <CheckIcon
          className={`absolute w-4 h-4 ${getContrastingTextColor(color)}`}
        />
      ) : null}
    </div>
  )
}

function ensureMaximumLightness(inputColorHex: Color, maxLightness: number) {
  let color = inputColorHex

  // Get the lightness value
  let lightness = color.lightness()

  // If it's below the minimum, set it to the minimum
  if (lightness > maxLightness) {
    color = color.lightness(maxLightness)
  }

  // Return the color
  return color
}

function getContrastingTextColor(inputColorHex: Color) {
  const luminance = inputColorHex.luminosity()

  if (luminance > 0.5) {
    return 'text-gray-900'
  } else {
    return 'text-gray-50'
  }
}

export default ColorSwatch
