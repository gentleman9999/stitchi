import React from 'react'
import { Box, TextField, Autocomplete, Typography } from '@components/ui'
import { useController } from 'react-hook-form'
import { Schema } from './schema'
import { InputAdornment } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'

import useColors from './useColors'

const filter =
  createFilterOptions<ReturnType<typeof useColors>['colors'][number]>()

interface Props {
  index: number
}

const ColorInput = ({ index }: Props) => {
  const [createColor, setCreateColor] = React.useState(false)
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController<Schema>({ name: `variants.${index}.colorId` })

  const { colors } = useColors()

  console.log('CrEATE COLOR', createColor)

  return (
    <Autocomplete
      onChange={(e, v) => {
        if (v && v.id === 0) {
          // timeout to avoid instant validation of the dialog's form.
          setTimeout(() => {
            setCreateColor(true)
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

        if (params.inputValue !== '') {
          filtered.push({
            id: 0,
            name: `Add "${params.inputValue}"`,
            hex: '',
          })
        }

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
                  <Box
                    sx={{
                      backgroundColor: color?.hex,
                      width: 20,
                      height: 20,
                      borderRadius: '100%',
                      border: '1px solid',
                      borderColor: 'grey.200',
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )
      }}
    />
  )
}

export default ColorInput
