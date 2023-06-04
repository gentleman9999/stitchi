import React from 'react'
import cx from 'classnames'
import Color from 'color'

interface Props {
  hexCode: string
  label?: string
  selected?: boolean
  onClick?: () => void
}

const CatalogProductColorSwatch = (props: Props) => {
  const color = Color(props.hexCode)

  return (
    <div className="h-5 w-5">
      <span
        role="button"
        className={cx('inline-flex w-5 h-5 rounded-md border cursor-pointer', {
          // 'outline outline-2 outline-primary shadow-sm':
          //   selectedColorEntityIds.includes(entityId),
          'shadow-sm': props.selected,
        })}
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
