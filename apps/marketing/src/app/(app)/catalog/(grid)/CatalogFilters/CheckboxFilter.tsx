import Checkbox from '@components/ui/inputs/Checkbox'

const CheckboxFilter = ({
  onChange,
  label,
  value,
  sectionName,
  active,
  className,
}: {
  onChange: () => void
  label: string
  value: string | number
  sectionName: string
  active: boolean
  className?: string
}) => {
  const name = `${sectionName}-${value}`

  return (
    <div key={value} className={'flex ' + className}>
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
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  )
}

export default CheckboxFilter
