import ProductVariantQuantityMatrixForm, {
  ProductVariantQuantityMatrixFormProps,
} from '@components/common/ProductVariantQuantityMatrixForm'
import Button from '@components/ui/ButtonV2/Button'
import { FileInput, RichTextEditor } from '@components/ui/inputs'
import Checkbox from '@components/ui/inputs/Checkbox'
import Tooltip from '@components/ui/Tooltip'
import {
  ChatBubbleBottomCenterIcon,
  FolderPlusIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  SquaresPlusIcon,
  SwatchIcon,
} from '@heroicons/react/20/solid'
import { XIcon } from 'icons'
import { Dropdown, DropdownItem } from '@components/ui/Dropdown'
import { yupResolver } from '@hookform/resolvers/yup'
import currency from 'currency.js'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import InformationGroup from './InformationGroup'
import { MIN_ORDER_QTY } from '@lib/constants'
import Skeleton from '../../../../../../../../../../../components/ui/Skeleton/Skeleton'
import useProductQuote from './useProductQuote'
import {
  CatalogProductCustomizationAddonType,
  ProductFormProductFragment,
  PrintType,
} from '@generated/types'
import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr'
import { fragments } from './ProductForm.fragments'
import routes from '@lib/routes'

const customizationOptions = [
  {
    name: 'Front',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    printType: undefined,
  },
  {
    name: 'Back',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    printType: undefined,
  },
  {
    name: 'Left Sleeve',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    printType: undefined,
  },
  {
    name: 'Right Sleeve',
    type: CatalogProductCustomizationAddonType.PRINT_LOCATION,
    printType: undefined,
  },
]
const availPrintingMethods = [
  PrintType.SCREENPRINT,
  PrintType.EMBROIDERY,
  PrintType.HEATTRANSFER,
]


const sizeSchema = yup.object().shape({
  catalogProductVariantId: yup.string().nullable().defined(),
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
          printType: yup.mixed<PrintType>().oneOf(Object.values(PrintType)),
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

const iconStyle = 'w-7 h-7 text-midnight'

interface ProductFormProps {
  productEntityId: string
  productId: string
  colors: ProductVariantQuantityMatrixFormProps['colors']
  variants: ProductVariantQuantityMatrixFormProps['variants']
  requireLogin: boolean
  onSubmit: (values: FormValues) => Promise<void>
  onActiveColorChange?: (colorId: string | null) => void
  defaultColorId: string | undefined
}

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const ProductForm = (props: ProductFormProps) => {
  const { data: product } = useFragment<ProductFormProductFragment>({
    fragment: fragments.product,
    fragmentName: 'ProductFormProductFragment',
    from: {
      __typename: 'Product',
      id: props.productId,
    },
  })
  const [submitting, setSubmitting] = React.useState(false)

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      colors: props.defaultColorId
        ? [
            {
              catalogProductColorId: props.defaultColorId,
              sizes: props.variants
                .filter(
                  v =>
                    v.catalogProductColorId === props.defaultColorId &&
                    v.catalogProductSizeId,
                )
                .map(v => ({
                  catalogProductVariantId: v.catalogProductVariantId,
                  catalogSizeEntityId: v.catalogProductSizeId!,
                  quantity: 0,
                  disabled: false,
                })),
            },
          ]
        : [],
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

  const addons = customizations
    .filter(
      c =>
        c.type === CatalogProductCustomizationAddonType.PRINT_LOCATION &&
        c.printType,
    )
    .map(c => ({
      printLocation: {
        ...(c.printType !== PrintType.EMBROIDERY && { colorCount: 1 }),
        embellishmentType: c.printType
      },
    }))

  const {
    createQuote,
    quote,
    loading: loadingQuote,
  } = useProductQuote({
    catalogProductId: props.productEntityId,
  })

  React.useEffect(() => {
    createQuote({
      addons,
      items: colors.flatMap(color =>
        color.sizes
          .filter(size => Boolean(size.catalogProductVariantId))
          .map(size => ({
            catalogProductVariantId: size.catalogProductVariantId!,
            quantity: size.quantity || 0,
          }))
          .filter(
            item => item.quantity > 0 && Boolean(item.catalogProductVariantId),
          ),
      ),
    })
  }, [totalQuantity, colors, createQuote, addons])

  const handleSubmit = form.handleSubmit(async (values: FormValues) => {
    if (totalQuantity !== 0 && totalQuantity < MIN_ORDER_QTY) {
      form.setError('colors', {
        type: 'validate',
        message: `Minimum order quantity is ${MIN_ORDER_QTY} pieces.`,
      })
      return
    }

    setSubmitting(true)
    await props.onSubmit(values)
    setSubmitting(false)
  })

  const customizationFields = useFieldArray({
    control: form.control,
    name: 'customizations',
  })

  const { value: price } = product.prices?.price || {}

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-16">
        <InformationGroup
          title="Colors & Sizes"
          description="Choose color to view available sizes."
          footer={
            colors.length ? (
              <>
                <b>Haven&apos;t decided the quantity?</b> No worries! You can
                leave that empty for now.
              </>
            ) : null
          }
          icon={<SwatchIcon className={iconStyle} />}
          error={form.formState.errors.colors?.message}
        >
          <ProductVariantQuantityMatrixForm
            showColorOptions
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
          description="Select the locations you want to customize."
          footer={
            <button
              className="cursor-pointer flex flex-col relative w-full"
              onClick={() =>
                window.open(
                  routes.external.support.production.printProcesses.href(),
                )
              }
            >
              <b>Want to learn more about our customization options?</b>
              Get immersed in advanced customization options.
              <a
                target="blank"
                href={routes.external.support.production.printProcesses.href()}
              >
                <PlusCircleIcon className="w-4 h-4 absolute -top-2 -right-2" />
              </a>
            </button>
          }
          icon={<SquaresPlusIcon className={iconStyle} />}
        >
          <div className="@container">
            <div className="grid grid-cols-1 @[500px]:grid-cols-2 gap-2">
              {customizationFields.fields.map((customization, index) => (
                <Controller
                  key={customization.id}
                  name={`customizations.${index}.printType`}
                  control={form.control}
                  render={({ field: { onChange: onControllerChange, value, name, ref } }) => (
                    <Dropdown
                      align="end"
                      renderTrigger={() => (
                        <button
                          type="button"
                          ref={ref}
                          key={index}
                          className="flex flex-row w-full items-center gap-4 border rounded-sm p-4 hover:bg-gray-50 transition-all"
                        >
                          <Checkbox
                            name={name}
                            value="checked"
                            checked={!!value}
                            disabled={true}
                            onChange={()=> {}}
                            size={2}
                          />
                          <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold">
                              {customization.name}
                              {value && ' - ' + capitalizeString(value)}
                            </div>
                          </div>
                          { value && 
                            <span
                              className="x-btn p-1 hover:bg-gray-100 rounded-sm"
                              onClick={(e) => {
                                if(e && e.stopPropagation)
                                  e.stopPropagation();
                                onControllerChange(undefined);
                              }}
                            >
                              <XIcon className="w-4 h-4 text-gray-400" />
                            </span>
                          }
                        </button>
                      )}
                      renderItems={() => availPrintingMethods.map((element, idx) => (
                        <DropdownItem
                          key={"design-request-" + idx}
                          label={capitalizeString(element)}
                          onClick={() => onControllerChange(element)}
                        />
                      ))}
                    />
                    
                  )}
                />
              ))}
            </div>
          </div>
        </InformationGroup>

        <Controller
          name="fileIds"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <InformationGroup
              title="Design Files"
              description={
                <>
                  Upload your logo, designs, quotes, images, or other
                  inspiration that you want to imprint on this merch.
                </>
              }
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
                footer={
                  <>
                    A <b>Stitchi Designer</b> will collaborate with you{' '}
                    <b>within 24 hours</b> to refine and perfect your concept.
                  </>
                }
                icon={<ChatBubbleBottomCenterIcon className={iconStyle} />}
                error={form.formState.errors.designBrief?.message}
              >
                <RichTextEditor
                  inputRef={ref}
                  placeholder="Describe your design and how you want it to look."
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
      </div>
      <br />
      <div className="sticky bottom-0 bg-paper">
        <div className="p-4 border-t rounded-b-lg flex flex-wrap gap-4 justify-between items-end">
          <div className="flex flex-col">
            <Tooltip
              label="Price varies based on print areas, ink colors, and quantity ordered."
              renderTrigger={() => (
                <button>
                  <span className="text-xl text-gray-400 font-medium font-headingDisplay flex">
                    from
                    <QuestionMarkCircleIcon className="w-3 h-3" />
                  </span>
                </button>
              )}
            />{' '}
            <span className="text-4xl font-medium font-headingDisplay text-gray-600 whitespace-nowrap">
              <>
                {totalQuantity === 0 || totalQuantity >= MIN_ORDER_QTY ? (
                  <>
                    {totalQuantity === 0 ? (
                      currency(price, {}).format()
                    ) : loadingQuote ? (
                      <Skeleton />
                    ) : quote?.productUnitCostCents ? (
                      <>
                        {currency(quote?.productUnitCostCents, {
                          fromCents: true,
                        }).format()}
                      </>
                    ) : null}
                  </>
                ) : (
                  <p className="text-xs text-gray-800 max-w-[300px] whitespace-pre-line">
                    Minimum order quantity is {MIN_ORDER_QTY} pieces. This
                    ensures we can offer the best prices to our customers.
                  </p>
                )}

                {/* {totalQuantity === 0 && priceMetadata?.maxPriceCents
                  ? `-
                  ${currency(priceMetadata.maxPriceCents, {
                  }).format()}`
                  : null} */}
              </>
            </span>
          </div>
          <Button
            size="xl"
            color="brandPrimary"
            type="submit"
            loading={submitting}
            className="min-w-[200px]"
          >
            Customize
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ProductForm
