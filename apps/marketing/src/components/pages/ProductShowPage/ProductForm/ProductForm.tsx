import { gql, useQuery } from '@apollo/client'
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
import { makeProductTitle } from '@lib/utils/catalog'
import currency from 'currency.js'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const iconStyle = 'w-7 h-7 text-primary'

interface ProductFormProps {
  product: ProductFormProductFragment
}

const ProductForm = ({ product }: ProductFormProps) => {
  const { data, loading: quoteLoading } = useQuery<
    ProductFormGetProductQuoteQuery,
    ProductFormGetProductQuoteQueryVariables
  >(GET_PRODUCT_QUOTE, {
    variables: {
      productId: product.id,
      quantity: 10_000,
      printLocations: [
        {
          colorCount: 1,
        },
      ],
    },
  })

  const quote = data?.site.product?.quote

  return (
    <>
      <div className="relative flex flex-col gap-8 p-8 bg-gray-50 rounded-lg ">
        <h1 className="font-headingDisplay font-semibold text-2xl sm:text-3xl text-gray-800">
          {makeProductTitle(product)}
        </h1>

        <div className="flex flex-col gap-16">
          <InformationGroup
            title="Sizes & Colors"
            description="Select size range and article colors. If you aren't sure how many you want to order, you can leave the quantity blank."
            icon={<SwatchIcon className={iconStyle} />}
          >
            Size colors
          </InformationGroup>
          <InformationGroup
            title="Add-Ons"
            description="Add customization"
            icon={<SquaresPlusIcon className={iconStyle} />}
          >
            {[
              {
                name: 'Front Print',
                price: null,
              },
              { name: 'Custom Label', price: 50 },
              {
                name: 'Stitchi Fulfillment',
                price: 99,
              },
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
                        +{currency(addon.price, { fromCents: true }).format()}
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
          </InformationGroup>
          <InformationGroup
            title="Design Brief"
            description="Discuss your design. You'll be connected with a designer to help perfect your design."
            icon={<ChatBubbleBottomCenterIcon className={iconStyle} />}
          >
            <TextField
              multiline
              placeholder="Describe your design and how you want it to look. If you have a design file, you can upload it below."
            />
          </InformationGroup>
          <InformationGroup
            optional
            title="Files"
            description="Add brand assets, complete designs, design inspiration, etc..."
            icon={<FolderPlusIcon className={iconStyle} />}
          >
            <FileInput fileIds={[]} folder="" onChange={() => {}} />
          </InformationGroup>
        </div>
      </div>
      <div className="sticky bottom-0 pb-10 bg-paper">
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
          <Button size="xl" color="brandPrimary">
            Customize
          </Button>
        </div>
      </div>
    </>
  )
}

interface InformationGroupProps {
  children: React.ReactNode
  title: string
  description: string
  icon: React.ReactNode
  optional?: boolean
}

const InformationGroup = ({
  children,
  title,
  description,
  icon,
  optional,
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
