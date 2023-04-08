import { gql } from '@apollo/client'
import { ProductShowPageProductProductFragment } from '@generated/ProductShowPageProductProductFragment'
import { generateImageSizes } from '@utils/image'
import Image from 'next/image'
import React from 'react'
import ProductColorGrid from './ProductColorGrid'
import ProductWishlistButton from './ProductWishlistButton'

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
      }),
    [productOptionValues.colorEntityId, productVariants],
  )

  const image = activeVariant?.defaultImage || product.defaultImage

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div>
        {image ? (
          <div className="relative w-full h-[250px] border-b">
            <Image
              fill
              style={{
                objectFit: 'contain',
              }}
              src={image.url}
              alt={image.altText || product.name}
              sizes={generateImageSizes([{ imageWidth: '624px' }])}
            />
          </div>
        ) : null}
        <VariantOptionSection title="Available Colors">
          <ProductColorGrid
            product={product}
            onColorSelect={handleColorSelect}
          />
        </VariantOptionSection>

        <table className="table-auto w-full mt-8">
          <caption>Specifications</caption>

          <tbody>
            <tr className="border-y">
              <td>Brand</td>
              <td className="flex justify-end">{product.brand?.name}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col justify-center items-center mt-4">
          <ProductWishlistButton entityId={product.entityId} />
          <span className="text-center text-xs mt-2 max-w-[225px]">
            Save products you think you may want to include in your merch
            program.
          </span>
        </div>
      </div>

      <div className="prose prose-sm">
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  )
}

const VariantOptionSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className="mt-6">
      <h3 className="text font-bold text-gray-700 mb-2">{title}</h3>
      {children}
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
