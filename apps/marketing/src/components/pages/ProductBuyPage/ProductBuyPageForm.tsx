import { gql } from '@apollo/client'
import { ProductBuyPageFormProductFragment } from '@generated/ProductBuyPageFormProductFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormSection from './FormSection'
import VariantQuantityMatrixForm from './VariantQuantityMatrixForm/VariantQuantityMatrixForm'

const colorSchema = yup.object().shape({
  colorEntityId: yup.number().nullable().required(),
  sizes: yup.array().of(
    yup.object().shape({
      sizeEntityId: yup.number().nullable().defined(),
      quantity: yup.number().min(0).nullable().defined(),
    }),
  ),
})

const schema = yup.object().shape({
  colors: yup.array().of(colorSchema).min(1).required(),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  product: ProductBuyPageFormProductFragment
}

const ProductBuyPageForm = ({ product }: Props) => {
  const form = useForm<FormValues>({ resolver: yupResolver(schema) })

  const handleSubmit = form.handleSubmit(async data => {})

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormSection>
        <VariantQuantityMatrixForm form={form} product={product} />
      </FormSection>
      <FormSection>Decordations</FormSection>
      <FormSection>Addons</FormSection>
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
