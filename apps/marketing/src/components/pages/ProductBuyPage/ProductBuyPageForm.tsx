import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { ProductBuyPageFormProductFragment } from '@generated/ProductBuyPageFormProductFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import AddonsForm from './AddonsForm'
import FormSection from './FormSection'
import PrintLocationsForm from './PrintLocationsForm'
import SubmitBanner from './SubmitBanner'
import useProductQuote from './SubmitBanner/useProductQuote'
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
    .min(1, 'Please add at least one customization.')
    .max(4, 'You can only add up to 4 customizations.')
    .required()
    .label('Print locations'),
  includeFulfillment: yup.boolean().required(),
  colors: yup
    .array()
    .of(colorSchema.required())
    .min(1, 'Please choose at least one color.')
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
  const [submitting, setSubmitting] = React.useState(false)

  const [getQuote, { quote, loading: quoteLoading }] = useProductQuote({
    catalogProductEntityId: product.entityId,
  })

  const form = useForm<FormValues>({
    defaultValues: {
      includeFulfillment: false,
      colors: [],
      printLocations: [],
    },
    resolver: yupResolver(schema),
  })

  const { trigger, formState, clearErrors } = form
  const { errors: formErrors } = formState

  const { colors, includeFulfillment, printLocations } = form.watch()

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
      await getQuote({
        includeFulfillment,
        printLocations,
        // printLocations: memoizedPrintLocations,
        quantity: totalQuantity,
      })
    }

    // if (
    //   memoizedPrintLocations.some(location => Number.isNaN(location.colorCount))
    // ) {
    //   // We don't want to trigger validation since user hasn't entered anything yet
    //   return
    // }

    // get()
  }, [getQuote, includeFulfillment, printLocations, totalQuantity, trigger])

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
      <FormSection title="Choose colors & sizes">
        <VariantQuantityMatrixForm form={form} product={product} />
        <ComponentErrorMessage error={formErrors.colors?.message} />
      </FormSection>
      <FormSection title="Add customizations">
        <PrintLocationsForm form={form} />
      </FormSection>
      <FormSection title="Choose services">
        <AddonsForm form={form} />
      </FormSection>
      <ComponentErrorMessage error={error} />
      <ComponentErrorMessage error={formErrors.root?.message} />
      <SubmitBanner
        priceCents={quote?.productTotalCostCents || null}
        loading={quoteLoading}
        submitting={submitting}
        error={Boolean(Object.keys(formErrors).length)}
      />
    </form>
  )
}

ProductBuyPageForm.fragments = {
  product: gql`
    ${VariantQuantityMatrixForm.fragments.product}
    fragment ProductBuyPageFormProductFragment on Product {
      id
      entityId
      ...VariantQuantityMatrixFormProductFragment
    }
  `,
}

export default ProductBuyPageForm
