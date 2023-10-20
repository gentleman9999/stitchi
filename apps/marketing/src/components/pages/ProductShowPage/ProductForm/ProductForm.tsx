import { gql } from '@apollo/client'
import ProductVariantQuantityMatrixForm, {
  ProductVariantQuantityMatrixFormProps,
} from '@components/common/ProductVariantQuantityMatrixForm'
import { Checkbox, FileInput, RichTextEditor, TextField } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import Tooltip from '@components/ui/Tooltip'
import { CatalogProductCustomizationAddonType } from '@generated/globalTypes'
import { ProductFormProductFragment } from '@generated/ProductFormProductFragment'
import {
  ChatBubbleBottomCenterIcon,
  FolderPlusIcon,
  QuestionMarkCircleIcon,
  SquaresPlusIcon,
  SwatchIcon,
} from '@heroicons/react/20/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeProductTitle } from '@lib/utils/catalog'
import currency from 'currency.js'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import * as yup from 'yup'
import InformationGroup from './InformationGroup'
import useProductQuote from './useProductQuote'

const customizationOptions = [
  {
    name: 'Front',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    selected: false,
  },
  {
    name: 'Back',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    selected: false,
  },
  {
    name: 'Left Sleeve',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    selected: false,
  },
  {
    name: 'Right Sleeve',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    selected: false,
  },
]

const sizeSchema = yup.object().shape({
  catalogSizeEntityId: yup.string().required(),
  quantity: yup.number().min(0).nullable().defined().label('Quantity'),
  disabled: yup.boolean().nullable().defined(),
})

const colorSchema = yup.object().shape({
  catalogProductColorId: yup.string().required(),
  sizes: yup.array().of(sizeSchema).required(),
})

const schema = yup.object().shape({
  designBrief: yup
    .string()
    .min(10, 'Please provide more details about your design.')
    .required('Please provide details about your design.')
    .label('Design Brief'),
  fileIds: yup.array().of(yup.string().required()).required(),
  colors: yup
    .array()
    .of(colorSchema.required())
    .min(1, 'Please choose at least one color.')
    .required()
    .label('Colors'),
  customizations: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          selected: yup.boolean().required(),
          name: yup.string().required(),
          type: yup
            .mixed<CatalogProductCustomizationAddonType>()
            .oneOf(Object.values(CatalogProductCustomizationAddonType))
            .required(),
        })
        .required(),
    )
    .required(),
})

export type FormValues = yup.InferType<typeof schema>

const iconStyle = 'w-7 h-7 text-primary'

interface ProductFormProps {
  product: ProductFormProductFragment
  colors: ProductVariantQuantityMatrixFormProps['colors']
  variants: ProductVariantQuantityMatrixFormProps['variants']
  onSubmit: (values: FormValues) => Promise<void>
  onActiveColorChange?: (colorId: string | null) => void
}

const ProductForm = (props: ProductFormProps) => {
  const [submitting, setSubmitting] = React.useState(false)

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      colors: [],
      fileIds: [],
      designBrief: '',
      customizations: customizationOptions,
    },
  })

  const { colors, customizations } = form.watch()

  let totalQuantity = 0

  colors.forEach(({ sizes }) => {
    sizes?.forEach(({ quantity }) => {
      if (quantity) {
        totalQuantity += quantity
      }
    })
  })

  const printLocations = customizations
    .filter(
      c =>
        c.type === CatalogProductCustomizationAddonType.PRINT_LOCATION &&
        c.selected,
    )
    .map(() => ({
      colorCount: 1,
    }))

  const {
    quote,
    maxQuote,
    loading: quoteLoading,
  } = useProductQuote({
    printLocations,
    productId: props.product.id,
    quantity: totalQuantity,
  })

  const handleSubmit = form.handleSubmit(async (values: FormValues) => {
    setSubmitting(true)
    await props.onSubmit(values)
    setSubmitting(false)
  })

  const customizationFields = useFieldArray({
    control: form.control,
    name: 'customizations',
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex flex-col gap-8 my-8 bg-paper rounded-lg ">
        <h1 className="font-headingDisplay font-semibold text-2xl sm:text-3xl text-gray-800 hidden sm:block">
          {makeProductTitle(props.product)}
        </h1>

        <div className="flex flex-col gap-16">
          <InformationGroup
            title="Sizes & Colors"
            description="Select size range and article colors. If you aren't sure how many you want to order, you can leave the quantity blank."
            icon={<SwatchIcon className={iconStyle} />}
            error={form.formState.errors.colors?.message}
          >
            <ProductVariantQuantityMatrixForm
              form={form}
              colors={props.colors}
              variants={props.variants}
              onSwatchClick={color => {
                props.onActiveColorChange?.(color.id)
              }}
            />
          </InformationGroup>
          <InformationGroup
            title="Customizations"
            description="Add customization"
            icon={<SquaresPlusIcon className={iconStyle} />}
          >
            <div className="@container">
              <div className="grid grid-cols-1 @[500px]:grid-cols-2 gap-1.5">
                {customizationFields.fields.map((customization, index) => (
                  <Controller
                    key={customization.id}
                    name={`customizations.${index}.selected`}
                    control={form.control}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <button
                        type="button"
                        ref={ref}
                        key={index}
                        className="flex flex-row items-center gap-4 border rounded-md p-4 hover:bg-gray-50 transition-all"
                        onClick={() => onChange(!value)}
                      >
                        <Checkbox
                          name={name}
                          value="checked"
                          checked={value}
                          onChange={() => {}}
                          size={2}
                        />
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-semibold">
                            {customization.name}
                          </div>
                        </div>
                      </button>
                    )}
                  />
                ))}
              </div>
            </div>
          </InformationGroup>
          <Controller
            name="designBrief"
            control={form.control}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              let content

              try {
                content = JSON.parse(value)
              } catch (e) {
                content = null
              }

              return (
                <InformationGroup
                  title="Design Brief"
                  description="Discuss your design. You'll be connected with a designer to help perfect your design."
                  icon={<ChatBubbleBottomCenterIcon className={iconStyle} />}
                  error={form.formState.errors.designBrief?.message}
                >
                  <RichTextEditor
                    ref={ref}
                    placeholder="Describe your design and how you want it to look. If you have any design files, you can upload it below."
                    editorOptions={{
                      content,
                      onBlur: onBlur,
                      onUpdate: params => {
                        // Auto format as ordered list
                        if (!params.editor.getHTML().includes('<ol>')) {
                          const content = params.editor.getHTML()
                          params.editor
                            .chain()
                            .focus()
                            .setContent(`<ol><li>${content}</li></ol>`)
                            .run()
                        }
                        // Check for empty ordered list and clear editor
                        else if (
                          params.editor.getHTML() ===
                            '<ol><li><p></p></li></ol>' ||
                          params.editor.getHTML().trim() === ''
                        ) {
                          params.editor.chain().focus().setContent('').run()
                        }

                        if (params.editor.isEmpty) {
                          onChange('')
                        } else {
                          onChange(JSON.stringify(params.editor.getJSON()))
                        }
                      },
                    }}
                  />
                </InformationGroup>
              )
            }}
          />

          <Controller
            name="fileIds"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <InformationGroup
                optional
                title="Files"
                description="Add brand assets, complete designs, design inspiration, etc..."
                icon={<FolderPlusIcon className={iconStyle} />}
              >
                <FileInput
                  keepUploadStatus
                  fileIds={value}
                  folder="/design-request-general"
                  onChange={onChange}
                />
              </InformationGroup>
            )}
          />
        </div>
      </div>
      <div className="sticky bottom-0 bg-paper">
        <div className="p-4 border-t rounded-b-lg flex flex-wrap gap-4 justify-between items-end">
          <div className="flex flex-col">
            <Tooltip
              label="The price per unit is based on the total quantity of all colors and sizes."
              renderTrigger={() => (
                <span className="text-xl text-gray-400 font-medium font-headingDisplay flex">
                  from
                  <QuestionMarkCircleIcon className="w-3 h-3" />
                </span>
              )}
            />{' '}
            <span className="text-4xl font-medium font-headingDisplay text-gray-600 whitespace-nowrap">
              {quoteLoading ? (
                <Skeleton width={100} />
              ) : quote ? (
                <>
                  {currency(quote.productUnitCostCents, {
                    fromCents: true,
                  }).format()}{' '}
                  {totalQuantity === 0 && maxQuote?.productUnitCostCents
                    ? `-
                  ${currency(maxQuote.productUnitCostCents, {
                    fromCents: true,
                  }).format()}`
                    : null}
                </>
              ) : null}
            </span>
          </div>
          <Button
            size="xl"
            color="brandPrimary"
            type="submit"
            loading={submitting}
          >
            Customize
          </Button>
        </div>
      </div>
    </form>
  )
}

ProductForm.fragments = {
  product: gql`
    fragment ProductFormProductFragment on Product {
      id
      name
      brand {
        id
        name
      }
    }
  `,
}

export default ProductForm
