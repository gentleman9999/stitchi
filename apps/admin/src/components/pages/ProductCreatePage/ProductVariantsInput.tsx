import React from 'react'
import { Paper, Grid, Typography } from '@components/ui'

interface Props {}

const ProductVariantInput = (props: Props) => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Typography variant="subtitle2">Product variants</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProductVariantInput
