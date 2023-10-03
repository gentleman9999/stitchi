import { gql, useQuery } from '@apollo/client'
import ProductVariantQuantityMatrixForm, {
  ProductVariantQuantityMatrixFormProps,
} from '@components/common/ProductVariantQuantityMatrixForm'
import { Checkbox, FileInput, TextField } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import {
  ProductFormGetProductQuoteQuery,
  ProductFormGetProductQuoteQueryVariables,
} from '@generated/ProductFormGetProductQuoteQuery'
import { ProductFormProductFragment } from '@generated/ProductFormProductFragment'
import {
  ChatBubbleBottomCenterIcon,
  FolderPlusIcon,
  SquaresPlusIcon,
  SwatchIcon,
} from '@heroicons/react/20/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeProductTitle } from '@lib/utils/catalog'
import currency from 'currency.js'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import * as yup from 'yup'

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
      yup.object().shape({
        name: yup.string().required(),
      }),
    )
    .required(),
})

export type FormValues = yup.InferType<typeof schema>

const iconStyle = 'w-7 h-7 text-primary'

interface ProductFormProps {
  product: ProductFormProductFragment
  colors: ProductVariantQuantityMatrixFormProps['colors']
  variants: ProductVariantQuantityMatrixFormProps['variants']
}

const ProductForm = (props: ProductFormProps) => {
  const {
    data,
    loading: quoteLoading,
    refetch,
  } = useQuery<
    ProductFormGetProductQuoteQuery,
    ProductFormGetProductQuoteQueryVariables
  >(GET_PRODUCT_QUOTE, {
    variables: {
      productId: props.product.id,
      quantity: 10_000,
      printLocations: [
        {
          colorCount: 1,
        },
      ],
    },
  })

  const form = useForm<FormValues>({
    defaultValues: {
      colors: [],
      fileIds: [],
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async (values: FormValues) => {})

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
    if (totalQuantity === 0) {
      return
    } else {
      refetch({
        quantity: totalQuantity,
      })
    }
  }, [refetch, totalQuantity])

  const quote = data?.site.product?.quote

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex flex-col gap-8 p-8 bg-gray-50 rounded-lg ">
        <h1 className="font-headingDisplay font-semibold text-2xl sm:text-3xl text-gray-800">
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
            />
          </InformationGroup>
          <InformationGroup
            title="Customizations"
            description="Add customization"
            icon={<SquaresPlusIcon className={iconStyle} />}
          >
            <div className="@container">
              <div className="grid grid-cols-1 @[500px]:grid-cols-2 gap-1.5">
                {[
                  {
                    name: 'Front',
                    price: null,
                  },
                  {
                    name: 'Back',
                    price: null,
                  },
                  {
                    name: 'Left Sleeve',
                    price: null,
                  },
                  {
                    name: 'Right Sleeve',
                    price: null,
                  },
                  // { name: 'Custom Label', price: 50 },
                ].map((addon, index) => (
                  <button
                    key={index}
                    className="flex flex-row items-center gap-4 border rounded-md p-4 hover:bg-gray-50 transition-all"
                  >
                    <Checkbox
                      name="check"
                      value={'true'}
                      onChange={() => {}}
                      size={2}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-semibold">{addon.name}</div>
                    </div>
                    <div className="flex flex-row gap-2 flex-1 justify-end">
                      <div className="text-xs text-gray-400">
                        {addon.price ? (
                          <>
                            +
                            {currency(addon.price, {
                              fromCents: true,
                            }).format()}
                          </>
                        ) : (
                          <>
                            <span className="">Variable</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </InformationGroup>
          <Controller
            name="designBrief"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <InformationGroup
                title="Design Brief"
                description="Discuss your design. You'll be connected with a designer to help perfect your design."
                icon={<ChatBubbleBottomCenterIcon className={iconStyle} />}
                error={form.formState.errors.designBrief?.message}
              >
                <TextField
                  multiline
                  placeholder="Describe your design and how you want it to look. If you have any design files, you can upload it below."
                  onChange={onChange}
                  value={value}
                  error={Boolean(form.formState.errors.designBrief?.message)}
                />
              </InformationGroup>
            )}
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
      <div className="sticky bottom-0 pb-6 bg-paper">
        <div className="bg-gray-50 p-4 border-t rounded-b-lg flex gap-4 justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-400 font-medium font-headingDisplay">
              from
            </span>{' '}
            <span className="text-4xl font-medium font-headingDisplay text-gray-600">
              {quoteLoading ? (
                <Skeleton width={100} />
              ) : quote ? (
                <>
                  {currency(quote.productUnitCostCents, {
                    fromCents: true,
                  }).format()}{' '}
                </>
              ) : null}
            </span>
          </div>
          <Button size="xl" color="brandPrimary" type="submit">
            Customize
          </Button>
        </div>
      </div>
    </form>
  )
}

interface InformationGroupProps {
  children: React.ReactNode
  title: string
  description: string
  icon: React.ReactNode
  optional?: boolean
  error?: string
}

const InformationGroup = ({
  children,
  title,
  description,
  icon,
  optional,
  error,
}: InformationGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <div className="">{icon}</div>
        <div className="flex flex-col gap-1 text-left">
          <div className="text font-semibold flex items-center">
            {title}
            {optional ? (
              <span className="text-xs text-gray-400 ml-2 font-normal">
                (optional)
              </span>
            ) : null}
          </div>
          <div className="text-xs">{description}</div>
        </div>
      </div>
      {error ? <div className="text-xs text-red-500 mt-1">{error}</div> : null}

      {children}
    </div>
  )
}

const GET_PRODUCT_QUOTE = gql`
  query ProductFormGetProductQuoteQuery(
    $productId: ID!
    $quantity: Int!
    $printLocations: [QuoteGeneratePrintLocationInput!]!
  ) {
    site {
      product(id: $productId) {
        quote(quantity: $quantity, printLocations: $printLocations) {
          id
          productUnitCostCents
        }
      }
    }
  }
`

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
