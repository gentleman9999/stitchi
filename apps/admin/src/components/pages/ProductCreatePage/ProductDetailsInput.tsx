import { Paper, Grid, RHFTextField } from '@components/ui'
import React from 'react'
import { Schema } from './schema'

interface Props {}

const ProductDetailsInput = (props: Props) => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RHFTextField<Schema>
            name="name"
            label="Name"
            placeholder="My cool product"
          />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField<Schema>
            name="description"
            label="Description"
            placeholder="This product is best for..."
            minRows={3}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProductDetailsInput
