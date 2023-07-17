import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { ClosetDesignBuyPageFormDesignProductFragment } from '@generated/ClosetDesignBuyPageFormDesignProductFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormSection from './FormSection'
import SubmitBanner from './SubmitBanner'
import useProductQuote from './SubmitBanner/useProductQuote'
import VariantQuantityMatrixForm from './VariantQuantityMatrixForm/VariantQuantityMatrixForm'

const sizeSchema = yup.object().shape({
  sizeEntityId: yup.number().nullable().defined(),
  quantity: yup.number().min(0).nullable().optional().label('Quantity'),
  disabled: yup.boolean().nullable().optional(),
})

const colorSchema = yup.object().shape({
  colorEntityId: yup.number().nullable().required(),
  sizes: yup.array().of(sizeSchema.required()),
})

const schema = yup.object().shape({
  colors: yup
    .array()
    .of(colorSchema.required())
    .min(1, 'Please choose at least one color.')
    .required()
    .label('Colors'),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  designProduct: ClosetDesignBuyPageFormDesignProductFragment
  onSubmit: (data: FormValues) => Promise<void>
  error?: string
}

const ClosetDesignBuyPageForm = ({ designProduct, onSubmit, error }: Props) => {
  const [submitting, setSubmitting] = React.useState(false)

  const [getQuote, { quote, loading: quoteLoading }] = useProductQuote({
    designProductId: designProduct.id,
  })

  const form = useForm<FormValues>({
    defaultValues: {
      colors: [],
    },
    resolver: yupResolver(schema),
  })

  const { formState, clearErrors } = form
  const { errors: formErrors } = formState

  const { colors } = form.watch()

  let totalQuantity = 0

  colors.forEach(({ sizes }) => {
    sizes?.forEach(({ quantity }) => {
      if (quantity) {
        totalQuantity += quantity
      }
    })
  })

  React.useEffect(() => {
    const get = async () => {
      await getQuote({ quantity: totalQuantity })
    }

    get()
  }, [getQuote, totalQuantity])

  React.useEffect(() => {
    if (
      formErrors.colors?.type === 'validate' &&
      formErrors.colors?.message === 'Minimum order quantity is 50 pieces.' &&
      totalQuantity >= 50
    ) {
      clearErrors('colors')
    }
  }, [
    clearErrors,
    formErrors.colors?.message,
    formErrors.colors?.type,
    totalQuantity,
  ])

  const handleSubmit = form.handleSubmit(async data => {
    if (totalQuantity < 50) {
      form.setError('colors', {
        type: 'validate',
        message: 'Minimum order quantity is 50 pieces.',
      })
      return
    }

    setSubmitting(true)
    await onSubmit(data)
    setSubmitting(false)
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-20">
      <FormSection title="Colors & sizes">
        <VariantQuantityMatrixForm form={form} designProduct={designProduct} />
        <ComponentErrorMessage error={formErrors.colors?.message} />
      </FormSection>

      <ComponentErrorMessage error={error} />
      <ComponentErrorMessage error={formErrors.root?.message} />
      <SubmitBanner
        priceCents={quote?.productTotalCostCents || null}
        unitPriceCents={quote?.productUnitCostCents || null}
        loading={quoteLoading}
        submitting={submitting}
        error={Boolean(Object.keys(formErrors).length)}
      />
    </form>
  )
}

ClosetDesignBuyPageForm.fragments = {
  designProduct: gql`
    ${VariantQuantityMatrixForm.fragments.designProduct}
    fragment ClosetDesignBuyPageFormDesignProductFragment on DesignProduct {
      id
      catalogProductId
      ...VariantQuantityMatrixFormDesignProductFragment
    }
  `,
}

export default ClosetDesignBuyPageForm
