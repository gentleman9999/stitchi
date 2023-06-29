import React from 'react'
import cx from 'classnames'
import Color from 'color'

interface Props {
  hexCode: string
  label?: string
  selected?: boolean
  onClick?: () => void
  width?: string
  height?: string
}

const ColorSwatch = (props: Props) => {
  const { width = 'w-8', height = 'h-8' } = props
  const color = new Color(props.hexCode)

  return (
    <div
      onClick={props.onClick}
      style={{
        outlineColor: ensureMaximumLightness(color, 96).toString(),
      }}
      className={cx(
        props.selected ? 'outline outline-4 ' : '',
        'relative flex cursor-pointer items-center justify-center rounded-full p-0.5',
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
    </div>
  )
}

function ensureMaximumLightness(inputColorHex: Color, maxLightness: number) {
  let color = Color(inputColorHex)

  // Get the lightness value
  let lightness = color.lightness()

  // If it's below the minimum, set it to the minimum
  if (lightness > maxLightness) {
    color = color.lightness(maxLightness)
  }

  // Return the color
  return color
}

export default ColorSwatch
