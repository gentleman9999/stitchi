import React from 'react'
import { TextField, Autocomplete } from '@components/ui'
import { createFilterOptions } from '@mui/material/Autocomplete'
import useSizes from './useSizes'
import { useController } from 'react-hook-form'
import { Schema } from '../schema'

const filter =
  createFilterOptions<ReturnType<typeof useSizes>['sizes'][number]>()

interface Props {
  index: number
  onCreateSize: () => void
}

const SizeSelector = ({ index, onCreateSize }: Props) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController<Schema>({ name: `variants.${index}.sizeId` })

  const { sizes } = useSizes()

  return (
    <Autocomplete
      onChange={(e, v) => {
        if (v && v.id === 0) {
          // timeout to avoid instant validation of the dialog's form.
          setTimeout(() => {
            onCreateSize()
          })
        } else {
          onChange(v?.id)
        }
      }}
      onBlur={onBlur}
      value={sizes.find(c => c.id === value)}
      ref={ref}
      options={sizes}
      getOptionLabel={option => `${option.name} - ${option.value}`}
      filterOptions={(options, params) => {
        const filtered = filter(options, params as any)

        filtered.push({
          id: 0,
          name: `Add ${params.inputValue ? `"${params.inputValue}"` : ''}`,
          value: '',
        })

        return filtered
      }}
      renderInput={params => {
        return (
          <TextField
            {...params}
            size="small"
            label="Choose a size"
            placeholder="Choose a size"
            error={Boolean(error?.message)}
            helperText={error?.message}
          />
        )
      }}
    />
  )
}

export default SizeSelector
