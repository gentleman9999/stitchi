import { Paper, Grid, TextField } from '@components/ui'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Schema } from './schema'

interface Props {}

const ProductDetailsInput = (props: Props) => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller<Schema>
            name="name"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) => (
              <TextField
                fullWidth
                label="Name"
                placeholder="My cool product"
                name={name}
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={Boolean(error?.message)}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller<Schema>
            name="description"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) => (
              <TextField
                fullWidth
                multiline
                label="Description"
                placeholder="This product is best for..."
                name={name}
                inputRef={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={Boolean(error?.message)}
                helperText={error?.message}
                minRows={3}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProductDetailsInput
