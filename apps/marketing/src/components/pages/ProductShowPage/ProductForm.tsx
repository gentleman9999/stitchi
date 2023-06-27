import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import { Button, InputGroup } from '@components/ui'
import { ProductShowPageProductFormProductFragment } from '@generated/ProductShowPageProductFormProductFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import useProductOptions from '@hooks/useProductOptions'
import { track } from '@lib/analytics'
import currency from 'currency.js'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  colorEntityIds: yup.array().of(yup.number().required()).required(),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  product: ProductShowPageProductFormProductFragment
  onSubmit: (data: FormValues) => Promise<void>
}

const ProductForm = ({ onSubmit, product }: Props) => {
  const { colors: availableColors } = useProductOptions({ product })

  const [submitting, setSubmitting] = React.useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      colorEntityIds: [],
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async data => {
    setSubmitting(true)

    try {
      await onSubmit(data)
    } finally {
      setSubmitting(false)
    }
  })

  const { colorEntityIds } = form.watch()

  const serializedColors = availableColors.map(color => ({
    ...color,
    selected: Boolean(
      colorEntityIds.find(colorEntityId => colorEntityId === color.entityId),
    ),
  }))

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Controller
        name="colorEntityIds"
        control={form.control}
        render={({ field, fieldState }) => (
          <InputGroup label="Choose colors" error={fieldState.error?.message}>
            <ul className="flex flex-wrap gap-3">
              {serializedColors.map(color => (
                <li key={color.entityId}>
                  <ColorSwatch
                    hexCode={color.hexColors[0]}
                    label={color.label}
                    width="w-8"
                    height="h-8"
                    selected={color.selected}
                    onClick={() => {
                      if (
                        colorEntityIds.find(
                          colorEntityId => colorEntityId === color.entityId,
                        )
                      )
                        field.onChange(
                          colorEntityIds.filter(
                            colorEntityId => colorEntityId !== color.entityId,
                          ),
                        )
                      else {
                        field.onChange([...colorEntityIds, color.entityId])
                      }
                    }}
                  />
                </li>
              ))}
            </ul>
          </InputGroup>
        )}
      />

      <div className="flex flex-col @xs:flex-row justify-between @xs:items-center gap-4">
        <div className="flex flex-col">
          <span className="text-gray-400 font-medium font-headingDisplay">
            from
          </span>{' '}
          <span className="text-5xl font-medium font-headingDisplay text-gray-600">
            {currency(product.priceCents, { fromCents: true }).format()}{' '}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 w-full @xs:w-auto">
          <Button
            type="submit"
            className="whitespace-nowrap"
            color="brandPrimary"
            loading={submitting}
            onClick={() => {
              track.productPrimaryCtaClicked({ name: product.name })
            }}
          >
            Create a design
          </Button>
        </div>
      </div>
    </form>
  )
}

ProductForm.fragments = {
  product: gql`
    ${useProductOptions.fragments.product}
    fragment ProductShowPageProductFormProductFragment on Product {
      id
      name
      priceCents
      ...UseProductColorsProductFragment
    }
  `,
}

export default ProductForm
