import Checkbox from '@components/ui/inputs/Checkbox'
import Link from 'next/link'
import cx from 'classnames'

type FilterItemProps =
  | {
      label: string
      onClick: () => void
      active?: boolean
      children?: React.ReactNode
    }
  | {
      label: string
      href: string
      active?: boolean
      children?: React.ReactNode
    }

const FilterItem = (props: FilterItemProps) => {
  const linkClassName = cx('flex items-center gap-2', {
    'font-bold': props.active,
  })

  return (
    <li className="flex flex-col gap-2">
      {'href' in props ? (
        <Link href={props.href} className={linkClassName}>
          {props.label}
        </Link>
      ) : (
        <button onClick={props.onClick} className={linkClassName}>
          <Checkbox
            name="checkbox"
            value="checkbox"
            onChange={() => {}}
            checked={props.active}
          />
          {props.label}
        </button>
      )}

      {props.children}
    </li>
  )
}

export default FilterItem
