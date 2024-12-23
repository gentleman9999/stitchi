import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormSection from './FormSection'
import useProductEstimate from './useProductEstimate'
import { InputGroup } from '@components/ui/inputs'
import { MIN_ORDER_QTY } from '@lib/constants'
import ProductVariantQuantityMatrixForm from '@components/common/ProductVariantQuantityMatrixForm'
import { ClosetDesignBuyPageFormDesignProductFragment } from '@generated/types'

const sizeSchema = yup.object().shape({
  catalogProductVariantId: yup.string().required(),
  catalogSizeEntityId: yup.string().required(),
  quantity: yup.number().min(0).nullable().defined().label('Quantity'),
  disabled: yup.boolean().nullable().defined(),
})

const colorSchema = yup.object().shape({
  catalogProductColorId: yup.string().required(),
  sizes: yup.array().of(sizeSchema).required(),
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
  renderContainer: (props: {
    children: React.ReactNode
    loading: boolean
    submitting: boolean
    priceCents: number | null
    unitPriceCents: number | null
    error: boolean
    onSubmit: () => void
  }) => React.ReactNode
}

const ClosetDesignBuyPageForm = ({
  designProduct,
  onSubmit,
  error,
  renderContainer,
}: Props) => {
  const [submitting, setSubmitting] = React.useState(false)

  const [getEstimate, { estimate, loading: estimateLoading }] =
    useProductEstimate({
      designProductId: designProduct.id,
    })

  const defaultColors = React.useMemo(
    () =>
      designProduct.colors.map(color => ({
        catalogProductColorId: color.catalogProductColorId,
        sizes: designProduct.variants
          .filter(
            variant =>
              variant.catalogProductColorId === color.catalogProductColorId,
          )
          .map(variant => ({
            catalogProductVariantId: variant.id,
            catalogSizeEntityId: variant.catalogProductSizeId || '',
            quantity: null,
            disabled: null,
          })),
      })),
    [designProduct.colors, designProduct.variants],
  )

  const form = useForm<FormValues>({
    defaultValues: {
      colors: defaultColors,
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
    getEstimate({
      variants: colors.flatMap(color =>
        color.sizes.map(size => ({
          quantity: size.quantity || 0,
          catalogProductVariantId: size.catalogProductVariantId,
        })),
      ),
    })
  }, [totalQuantity, colors, getEstimate])

  React.useEffect(() => {
    if (
      formErrors.colors?.type === 'validate' &&
      formErrors.colors?.message ===
        `Minimum order quantity is ${MIN_ORDER_QTY} pieces.` &&
      totalQuantity >= MIN_ORDER_QTY
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
    if (totalQuantity < MIN_ORDER_QTY) {
      form.setError('colors', {
        type: 'validate',
        message: `Minimum order quantity is ${MIN_ORDER_QTY} pieces.`,
      })
      return
    }

    setSubmitting(true)
    await onSubmit(data)
    setSubmitting(false)
  })

  return (
    <form>
      {renderContainer({
        onSubmit: handleSubmit,
        loading: estimateLoading,
        submitting,
        priceCents: estimate?.productTotalCostCents || null,
        unitPriceCents: estimate?.productUnitCostCents || null,
        error: Boolean(Object.keys(formErrors).length),
        children: (
          <div className="flex flex-col gap-20">
            <FormSection>
              <InputGroup
                label="Choose quantities to restock"
                error={formErrors.colors?.message}
              >
                <ProductVariantQuantityMatrixForm
                  form={form}
                  colors={designProduct.colors.map(color => ({
                    id: color.id,
                    catalogProductColorId: color.catalogProductColorId,
                    hex: color.hex,
                    name: color.name,
                  }))}
                  variants={designProduct.variants.map(variant => ({
                    catalogProductVariantId: variant.id,
                    catalogProductColorId: variant.catalogProductColorId,
                    catalogProductSizeId: variant.catalogProductSizeId,
                    sizeName: variant.sizeName,
                    colorName: variant.colorName,
                  }))}
                />
              </InputGroup>
            </FormSection>

            <ComponentErrorMessage error={error} />
            <ComponentErrorMessage error={formErrors.root?.message} />
          </div>
        ),
      })}
    </form>
  )
}

ClosetDesignBuyPageForm.fragments = {
  designProduct: gql`
    fragment ClosetDesignBuyPageFormDesignProductFragment on DesignProduct {
      id
      catalogProductId
      colors {
        id
        hex
        name
        catalogProductColorId
      }
      variants {
        id
        sizeName
        colorName
        catalogProductSizeId
        catalogProductColorId
      }
    }
  `,
}

export default ClosetDesignBuyPageForm
