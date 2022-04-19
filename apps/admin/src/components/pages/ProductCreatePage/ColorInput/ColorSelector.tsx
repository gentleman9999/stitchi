import React from 'react'
import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  ColorDot,
} from '@components/ui'
import { useController } from 'react-hook-form'
import { Schema } from '../schema'
import { InputAdornment } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import useColors from './useColors'

const filter =
  createFilterOptions<ReturnType<typeof useColors>['colors'][number]>()

interface Props {
  index: number
  onCreateColor: () => void
}

const ColorSelector = ({ index, onCreateColor }: Props) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController<Schema>({ name: `variants.${index}.colorId` })

  const { colors } = useColors()

  return (
    <Autocomplete
      onChange={(e, v) => {
        if (v && v.id === 0) {
          // timeout to avoid instant validation of the dialog's form.
          setTimeout(() => {
            onCreateColor()
          })
        } else {
          onChange(v?.id)
        }
      }}
      onBlur={onBlur}
      value={colors.find(c => c.id === value)}
      ref={ref}
      options={colors}
      getOptionLabel={option => `${option.name} - ${option.hex}`}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '100%',
              backgroundColor: option.hex,
              display: 'flex',
              marginRight: 2,
            }}
          />
          <Typography variant="caption">
            {option.name} - {option.hex}
          </Typography>
        </Box>
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params as any)

        filtered.push({
          id: 0,
          name: `Add ${params.inputValue ? `"${params.inputValue}"` : ''}`,
          hex: '',
        })

        return filtered
      }}
      renderInput={params => {
        const color = colors.find(c => c.id === value)
        return (
          <TextField
            {...params}
            size="small"
            label="Choose a color"
            placeholder="Choose a color"
            error={Boolean(error?.message)}
            helperText={error?.message}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <ColorDot hex={color?.hex} />
                </InputAdornment>
              ),
            }}
          />
        )
      }}
    />
  )
}

export default ColorSelector
