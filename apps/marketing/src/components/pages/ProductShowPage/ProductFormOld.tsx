import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import { InputGroup } from '@components/ui'
import { ProductShowPageProductFormProductFragment } from '@generated/ProductShowPageProductFormProductFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import useProductOptions from '@components/hooks/useProductOptions'
import { track } from '@lib/analytics'
import currency from 'currency.js'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  ArrowLongRightIcon,
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
} from '@heroicons/react/20/solid'
import Button from '@components/ui/ButtonV2/Button'
import * as Popover from '@radix-ui/react-popover'
import cx from 'classnames'
import { TrashIcon } from '@heroicons/react/24/outline'
import { XIcon } from 'icons'

const schema = yup.object().shape({
  colorEntityIds: yup
    .array()
    .of(yup.number().required())
    .min(1, 'Please select a color')
    .required()
    .label('Color'),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  product: ProductShowPageProductFormProductFragment
  onSubmit: (data: FormValues) => Promise<void>
  colors: ReturnType<typeof useProductOptions>['colors']
}

const ProductForm = ({ onSubmit, product, colors: availableColors }: Props) => {
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

  const selectedColors = serializedColors.filter(color => color.selected)

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Controller
        name="colorEntityIds"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <InputGroup
              label="Choose colors to customize"
              error={fieldState.error?.message}
            >
              {/* </InputGroup> */}
              {selectedColors.length ? (
                // <InputGroup
                //   label="Selected colors"
                //   error={fieldState.error?.message}
                // >
                <div className="mb-4">
                  <ul className="flex flex-wrap gap-3">
                    {selectedColors.map(color => (
                      <li key={color.entityId} className="relative">
                        <button
                          className="absolute inset-0 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-all"
                          onClick={() =>
                            field.onChange(
                              colorEntityIds.filter(
                                colorEntityId =>
                                  colorEntityId !== color.entityId,
                              ),
                            )
                          }
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                        <ColorSwatch
                          hexCode={color.hexColors[0]}
                          label={color.label}
                          width="w-8"
                          height="h-8"
                          selected={color.selected}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : // </InputGroup>
              null}
              <ColorSelect
                colors={serializedColors}
                onColorToggle={color => {
                  if (color.selected)
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
            </InputGroup>
          </>
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
            size="xl"
            className="whitespace-nowrap"
            color="brandPrimary"
            loading={submitting}
            onClick={() => {
              track.productPrimaryCtaClicked({ name: product.name })
            }}
          >
            Customize this
          </Button>
        </div>
      </div>
    </form>
  )
}

interface Color {
  entityId: number
  label: string
  hexColors: string[]
  selected: boolean
}

const ColorSelect = ({
  colors,
  onColorToggle,
}: {
  colors: Color[]
  onColorToggle: (color: Color) => void
}) => {
  const [open, setOpen] = React.useState(false)

  const handleColorClick = (color: Color) => {
    onColorToggle(color)
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          size="xl"
          variant="ghost"
          className="w-full"
          endIcon={<PlusIcon className="w-4" />}
        >
          Add colors
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-paper rounded-md p-2 w-full max-w-xs max-h-96 overflow-scroll shadow-magical"
          sideOffset={5}
          side="bottom"
          align="end"
        >
          <div className="flex flex-col gap-1">
            {colors.map(color => (
              <ColorSelectItem
                key={color.entityId}
                color={color}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

const ColorSelectItem = ({
  color,
  onClick,
}: {
  color: Color
  onClick: () => void
}) => {
  const item = (
    <button
      onClick={onClick}
      className={cx(
        'cursor-pointer flex items-center gap-2 justify-between rounded-md p-0.5 hover:ring ring-primary',
        {
          'bg-gray-50': color.selected,
        },
      )}
    >
      <div className="flex items-center gap-2 flex-1 truncate shrink">
        <ColorSwatch hexCode={color.hexColors[0]} width="w-6" height="h-6" />

        <span className="text-sm font-medium truncate">{color.label}</span>
      </div>

      {color.selected ? <CheckIcon className="w-4 h-4 shrink-0" /> : null}
    </button>
  )

  return <>{item}</>
}

ProductForm.fragments = {
  product: gql`
    fragment ProductShowPageProductFormProductFragment on Product {
      id
      name
      priceCents
    }
  `,
}

export default ProductForm
