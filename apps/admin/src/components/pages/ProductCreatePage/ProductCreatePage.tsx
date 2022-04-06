import React from 'react'
import { Button, Container, Grid } from '@components/ui'
import { DetailPageHeading } from '@components/common'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateProduct from './useCreateProduct'
import schema, { Schema } from './schema'
import { useSnackbar } from 'notistack'
import ProductDetailsInput from './ProductDetailsInput'
import ProductVariantInput from './ProductVariantsInput'

const defaultVariant = {
  gtin: '',
  vendorPartNumber: '',
  colorId: '',
  sizeId: '',
}

export interface ProductCreatePageProps {}

const ProductCreatePage = (props: ProductCreatePageProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [createProduct, { loading }] = useCreateProduct()
  const form = useForm<Schema>({
    resolver: yupResolver(schema),
    defaultValues: {
      variants: [defaultVariant],
    },
  })

  const handleSubmit = form.handleSubmit(async data => {
    try {
      await createProduct(data)
    } catch (error) {
      console.error('Failed to create product', { context: { error } })
      enqueueSnackbar('Failed to add product', { variant: 'error' })
    }
  })

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DetailPageHeading title="Add product" />
        </Grid>
        <Grid item xs={12}>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ProductDetailsInput />
                </Grid>
                <Grid item xs={12}>
                  <ProductVariantInput defaultValue={defaultVariant} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" loading={loading}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductCreatePage
