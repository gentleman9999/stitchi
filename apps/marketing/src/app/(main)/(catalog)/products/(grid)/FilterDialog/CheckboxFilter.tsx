import Checkbox from '@components/ui/inputs/Checkbox'
import cx from 'classnames'

const CheckboxFilter = ({
  onChange,
  label,
  value,
  sectionName,
  active,
  className,
  productCount,
  disabled,
}: {
  onChange: () => void
  label: string
  value: string | number
  sectionName: string
  active: boolean
  className?: string
  productCount?: number
  disabled?: boolean
}) => {
  const name = `${sectionName}-${value}`

  return (
    <div
      key={value}
      className={cx('flex', className, {
        'opacity-50 pointer-events-none': disabled,
      })}
    >
      <div className="mr-3">
        <Checkbox
          name={name}
          value={value}
          checked={active}
          onChange={onChange}
          size={2}
        />
      </div>
      <label
        htmlFor={name}
        className="font-medium text-gray-500 select-none cursor-pointer font-heading text-md"
      >
        {label}
        {productCount && (
          <span className="text-sm text-gray-400"> ({productCount})</span>
        )}
      </label>
    </div>
  )
}

export default CheckboxFilter
