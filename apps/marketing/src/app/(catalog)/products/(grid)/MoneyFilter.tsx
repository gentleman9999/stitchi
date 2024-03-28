import TextField from '@components/ui/inputs/TextField'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  value: { min: number | null; max: number | null }
  onChange: (value: { min: number | null; max: number | null }) => void
}

const MoneyFilter = ({ value, onChange }: Props) => {
  const debouncedOnChange = useDebouncedCallback(onChange, 300)

  return (
    <div className="grid grid-cols-2 gap-4">
      <TextField
        label="Min"
        value={value.min || undefined}
        onChange={e =>
          debouncedOnChange({ min: parseInt(e.target.value), max: value.max })
        }
      />
      <TextField
        label="Max"
        value={value.max || undefined}
        onChange={e => {
          debouncedOnChange({ min: value.min, max: parseInt(e.target.value) })
        }}
      />
    </div>
  )
}

export default MoneyFilter
