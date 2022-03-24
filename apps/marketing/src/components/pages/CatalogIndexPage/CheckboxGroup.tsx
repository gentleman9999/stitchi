import { useFuzzySearch } from 'hooks'
import React from 'react'
import { Checkbox, TextField } from '@components/ui'
import * as uuid from 'uuid'

interface Option {
  name: string
  value: string
  label: string
  defaultChecked?: boolean
  [key: string]: any
}

interface Props {
  options: Option[]
  onChange: (options: Option[]) => void
}

const CheckboxGroup = (props: Props) => {
  const allOptions = props.options.map(o => ({
    ...o,
    id: uuid.v4(),
    checked: o.defaultChecked || false,
  }))

  const {
    term,
    search,
    result: searchResults,
  } = useFuzzySearch({ data: allOptions })

  const viewableOptions = React.useMemo(
    () => allOptions.filter(o => searchResults.some(r => r.id === o.id)),
    [allOptions, searchResults],
  )

  const handleCheck = (v: string, checked: boolean) => {
    console.log('CHECKED CHANGED', v, checked)
    props.onChange(
      allOptions.map(option => ({
        ...option,
        checked: option.value === v ? checked : option.checked,
      })),
    )
  }

  console.log('ALL OPTIONS', allOptions)

  return (
    <div>
      <div className="mb-4">
        <TextField
          name="search"
          value={term}
          multiline={false}
          placeholder="Search"
          onChange={e => search(e.target.value)}
        />
      </div>
      {viewableOptions.map(result => (
        <Checkbox
          {...result}
          key={result.name}
          onChange={checked => handleCheck(result.value, checked)}
          // onChange={handleCheck}
          //   onSecondaryAction={() => setSelected([brand])}
          //   showSecondaryAction={
          //     !brand.checked || brands.filter(b => b.checked).length > 1
          //   }
        />
      ))}
    </div>
  )
}

export default CheckboxGroup
