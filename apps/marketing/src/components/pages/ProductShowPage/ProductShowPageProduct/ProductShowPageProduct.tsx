import { gql } from '@apollo/client'
import { ProductShowPageProductProductFragment } from '@generated/ProductShowPageProductProductFragment'
import routes from '@lib/routes'
import { generateImageSizes } from '@utils/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductColorGrid from './ProductColorGrid'
import CalculatorForm from './CalculatorForm'
import { Button } from '@components/ui'
import { ArrowRight } from 'icons'

interface ProductOptionValues {
  colorEntityId: number | null
}

interface Props {
  product: ProductShowPageProductProductFragment
}

const ProductShowPageProduct = ({ product }: Props) => {
  const [productOptionValues, setProductOptionValues] =
    React.useState<ProductOptionValues>({
      colorEntityId: null,
    })

  const handleColorSelect = (colorEntityId: number) => {
    setProductOptionValues({
      ...productOptionValues,
      colorEntityId,
    })
  }

  const productVariants = product.variants.edges?.map(edge => edge?.node)

  const activeVariant = React.useMemo(
    () =>
      productVariants?.find(variant => {
        const options = variant?.options.edges?.map(edge => edge?.node)
        return options?.find(option => {
          const values = option?.values.edges?.map(edge => edge?.node)

          return values?.find(value => {
            return value?.entityId === productOptionValues.colorEntityId
          })
        })
      }) || productVariants?.[0],
    [productOptionValues.colorEntityId, productVariants],
  )

  const image = activeVariant?.defaultImage || product.defaultImage

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-10">
        <div className="col-span-12 sm:col-span-6 lg:col-span-7 flex flex-col gap-4">
          {image ? (
            <div className="relative w-full h-[350px] sm:h-[400px] border-b">
              <Image
                fill
                priority
                style={{
                  objectFit: 'contain',
                }}
                src={image.url}
                alt={image.altText || product.name}
                sizes={generateImageSizes([{ imageWidth: '624px' }])}
              />
            </div>
          ) : null}
          <ProductColorGrid
            product={product}
            onColorSelect={handleColorSelect}
            colorEntityId={productOptionValues.colorEntityId}
          />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-5">
          <div className="flex flex-col gap-6">
            {activeVariant ? (
              <div className="p-6 border rounded-md">
                <CalculatorForm
                  productVariantEntityId={activeVariant?.entityId}
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-4">
              <span className="text-sm">
                Elevate your brand by collaborating with one of our skilled
                designers at no additional cost!
              </span>
              <Link
                href={routes.internal.getStarted.href()}
                className="flex items-center underline font-medium"
              >
                Work with a designer{' '}
                <ArrowRight width={16} className="stroke-2 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-8">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <table className="table-auto w-full text-gray-600 ">
            <caption className="font-medium">Specifications</caption>

            <tbody>
              <tr className="border-y">
                <td>Brand</td>
                <td className="flex justify-end">
                  {product.brand ? (
                    <Link
                      href={routes.internal.catalog.brand.show.href({
                        brandSlug: product.brand.path.replace('/', ''),
                      })}
                      className="underline"
                    >
                      {product.brand.name}
                    </Link>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-sm max-w-none col-span-12 sm:col-span-6 lg:col-span-8">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  )
}

ProductShowPageProduct.fragments = {
  product: gql`
    ${ProductColorGrid.fragments.product}
    fragment ProductShowPageProductProductFragment on Product {
      ...ProductColorGridProductFragment
      id
      entityId
      name
      description
      brand {
        id
        name
        path
      }
      defaultImage {
        urlOriginal
        altText
        url(width: 300)
      }
      variants(first: 250) {
        edges {
          node {
            id
            entityId
            defaultImage {
              url(width: 300)
              altText
            }
            options {
              edges {
                node {
                  values {
                    edges {
                      node {
                        entityId
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
}

export default ProductShowPageProduct
