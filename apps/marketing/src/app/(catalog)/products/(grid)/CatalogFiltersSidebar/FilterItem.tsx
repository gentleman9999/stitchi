import Checkbox from '@components/ui/inputs/Checkbox'
import Link from 'next/link'
import cx from 'classnames'
import React from 'react'

type FilterItemProps =
  | {
      label: string
      onClick: () => void
      active?: boolean
      children?: React.ReactNode
      productCount?: number
    }
  | {
      label: string
      href: string
      active?: boolean
      children?: React.ReactNode
      productCount?: number
    }

const FilterItem = (props: FilterItemProps) => {
  const [nextState, setNextState] = React.useState(props.active)

  React.useEffect(() => {
    setNextState(props.active)
  }, [props.active])

  const linkClassName = cx('text-left flex items-center gap-2', {
    'font-bold': props.active,
  })

  const label = (
    <>
      {props.label}{' '}
      {props.productCount !== undefined ? (
        <span className="text-xs text-gray-500">({props.productCount})</span>
      ) : null}
    </>
  )

  return (
    <li className="flex flex-col gap-2">
      {'href' in props ? (
        <Link href={props.href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <Checkbox
          name={props.label}
          value="checkbox"
          onChange={() => {
            setNextState(!nextState)
            props.onClick()
          }}
          checked={nextState}
          label={label}
        />
      )}

      {props.children}
    </li>
  )
}

export default FilterItem
