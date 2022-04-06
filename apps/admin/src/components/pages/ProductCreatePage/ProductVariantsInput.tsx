import React from 'react'
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  RHFTextField,
  Button,
} from '@components/ui'
import { useFieldArray } from 'react-hook-form'
import { Schema } from './schema'
import { CloseIcon } from '@components/icons'

interface ProductVariantsInputProps {
  defaultValue: Record<string, any>
}

const ProductVariantsInput = (props: ProductVariantsInputProps) => {
  const { fields, append, remove } = useFieldArray<Schema>({
    name: 'variants',
  })

  const handleAppend = () => {
    append(props.defaultValue)
  }

  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">Product variants</Typography>
        </Grid>
        {fields.map((field, index) => {
          return (
            <VariantInput
              key={field.id}
              index={index}
              onRemove={fields.length > 1 ? () => remove(index) : null}
            />
          )
        })}
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handleAppend}>
            Add variant
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

interface VariantInputProps {
  index: number
  onRemove: (() => void) | null
}

const VariantInput = ({ index, onRemove }: VariantInputProps) => {
  return (
    <Grid item container spacing={2} xs={12}>
      <Grid item container spacing={1} xs={11}>
        <Grid item xs={6} md={2}>
          <RHFTextField<Schema>
            name={`variants.${index}.colorId`}
            label="Color"
            placeholder="12345678a"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <RHFTextField<Schema>
            name={`variants.${index}.sizeId`}
            label="Size"
            placeholder="m"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField<Schema>
            name={`variants.${index}.gtin`}
            label="GTIN"
            placeholder="12345678a"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RHFTextField<Schema>
            name={`variants.${index}.vendorPartNumber`}
            label="Vendor part number"
            placeholder="12345678a"
          />
        </Grid>
      </Grid>
      <Grid item xs={1} container justifyContent="center" alignItems="center">
        {onRemove && (
          <IconButton onClick={onRemove}>
            <CloseIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}

export default ProductVariantsInput
