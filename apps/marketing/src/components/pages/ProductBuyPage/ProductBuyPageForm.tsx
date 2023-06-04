import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { Button } from '@components/ui'
import { ProductBuyPageFormProductFragment } from '@generated/ProductBuyPageFormProductFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import AddonsForm from './AddonsForm'
import FormSection from './FormSection'
import PrintLocationsForm from './PrintLocationsForm'
import VariantQuantityMatrixForm from './VariantQuantityMatrixForm/VariantQuantityMatrixForm'

const printLocationSchema = yup.object({
  colorCount: yup.number().min(1).max(8).required(),
})

const sizeSchema = yup.object().shape({
  sizeEntityId: yup.number().nullable().defined(),
  quantity: yup.number().min(0).nullable().optional().label('Quantity'),
})

const colorSchema = yup.object().shape({
  colorEntityId: yup.number().nullable().required(),
  sizes: yup.array().of(sizeSchema.required()),
})

const schema = yup.object().shape({
  printLocations: yup
    .array(printLocationSchema.required())
    .min(1)
    .max(4)
    .required(),
  includeFulfillment: yup.boolean().required(),
  colors: yup
    .array()
    .of(colorSchema.required())
    .min(1, 'Please choose at least one color')
    .required()
    .label('Colors'),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  product: ProductBuyPageFormProductFragment
  onSubmit: (data: FormValues) => Promise<void>
  error?: string
}

const ProductBuyPageForm = ({ product, onSubmit, error }: Props) => {
  const [loading, setLoading] = React.useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      includeFulfillment: false,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async data => {
    let totalQuantity = 0

    data.colors.forEach(({ sizes }) => {
      sizes?.forEach(({ quantity }) => {
        if (quantity) {
          totalQuantity += quantity
        }
      })
    })

    if (totalQuantity < 50) {
      form.setError('root', {
        message: 'Minimum order quantity is 50 pieces.',
      })
      return
    }

    setLoading(true)
    await onSubmit(data)
    setLoading(false)
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormSection title="Choose colors">
        <VariantQuantityMatrixForm form={form} product={product} />
        <ComponentErrorMessage error={form.formState.errors.colors?.message} />
      </FormSection>
      <FormSection title="Add customizations">
        <PrintLocationsForm form={form} />
      </FormSection>
      <FormSection title="Addons">
        <AddonsForm form={form} />
      </FormSection>
      <ComponentErrorMessage error={error} />
      <ComponentErrorMessage error={form.formState.errors.root?.message} />
      <Button type="submit" loading={loading}>
        Add to Cart
      </Button>
    </form>
  )
}

ProductBuyPageForm.fragments = {
  product: gql`
    ${VariantQuantityMatrixForm.fragments.product}
    fragment ProductBuyPageFormProductFragment on Product {
      id
      ...VariantQuantityMatrixFormProductFragment
    }
  `,
}

export default ProductBuyPageForm
