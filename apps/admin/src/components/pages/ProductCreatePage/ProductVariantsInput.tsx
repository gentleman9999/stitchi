import React from 'react'
import { Paper, Grid, Typography, TextField } from '@components/ui'
import { Controller, useFieldArray } from 'react-hook-form'
import { Schema } from './schema'

interface ProductVariantsInputProps {}

const ProductVariantsInput = (props: ProductVariantsInputProps) => {
  const { fields, append, remove } = useFieldArray<Schema>({
    name: 'variants',
  })

  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Product variants</Typography>
        </Grid>
        {fields.map((field, index) => {
          return <VariantInput key={field.id} index={index} />
        })}
      </Grid>
    </Paper>
  )
}

interface VariantInputProps {
  index: number
}

const VariantInput = ({ index }: VariantInputProps) => {
  return (
    <Grid item container xs spacing={2}>
      <Grid item xs={12} sm={6}>
        <Controller<Schema>
          name={`variants.${index}.gtin`}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => {
            return (
              <TextField
                fullWidth
                label="GTIN"
                placeholder="12345678a"
                name={name}
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={Boolean(error?.message)}
                helperText={error?.message}
              />
            )
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller<Schema>
          name={`variants.${index}.vendorPartNumber`}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => {
            return (
              <TextField
                fullWidth
                label="Vendor part number"
                placeholder="12345678a"
                name={name}
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={Boolean(error?.message)}
                helperText={error?.message}
              />
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default ProductVariantsInput
