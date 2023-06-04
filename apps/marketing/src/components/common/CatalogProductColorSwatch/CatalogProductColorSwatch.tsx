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

const CatalogProductColorSwatch = (props: Props) => {
  const { width = 'w-5', height = 'h-5' } = props
  const color = Color(props.hexCode)

  return (
    <div className={`${width} ${height}`}>
      <span
        role="button"
        className={cx(
          `inline-flex rounded-md border cursor-pointer ${width} ${height}`,
          {
            // 'outline outline-2 outline-primary shadow-sm':
            //   selectedColorEntityIds.includes(entityId),
            'shadow-sm': props.selected,
          },
        )}
        style={{
          backgroundColor: color.toString(),
          borderColor: color.darken(0.1).toString(),
        }}
        onClick={props.onClick}
      />
      <span className="sr-only">{props.label}</span>
    </div>
  )
}

export default CatalogProductColorSwatch
