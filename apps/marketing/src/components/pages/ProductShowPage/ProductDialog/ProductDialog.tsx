import { gql } from '@apollo/client'
import { Dialog, IconButton } from '@components/ui'
import { ProductDialogProductFragment } from '@generated/ProductDialogProductFragment'
import routes from '@lib/routes'
import { makeProductTitle } from '@utils/catalog'
import { XIcon } from 'icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import ProductColorGrid from './ProductColorGrid'
import ProductWishlistButton from './ProductWishlistButton'

interface ProductOptionValues {
  colorEntityId: number | null
}

interface Props {
  product: ProductDialogProductFragment
}

const ProductDialog = ({ product }: Props) => {
  const router = useRouter()

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

  const handleClose = () => {
    const params = { ...router.query }
    delete params['catchAllSlug']
    router.push(routes.internal.catalog.href({ params }), undefined, {
      scroll: false,
    })
  }

  const activeVariant = product.variants.edges
    ?.map(edge => edge?.node)
    .find(variant => {
      return variant?.options.edges
        ?.map(edge => edge?.node)
        .find(option => {
          return option?.values.edges
            ?.map(edge => edge?.node)
            .find(value => {
              return value?.entityId === productOptionValues.colorEntityId
            })
        })
    })

  const image = activeVariant?.defaultImage || product.defaultImage

  return (
    <Dialog open={true} onClose={handleClose} mobileFullScreen disablePortal>
      <Dialog.Title className="flex justify-between gap-2" as="div">
        <h1>{makeProductTitle(product)}</h1>
        <IconButton onClick={handleClose} variant="ghost" disableGutters>
          <XIcon width={20} height={20} />
        </IconButton>
      </Dialog.Title>
      <Dialog.Content>
        {image ? (
          <div className="relative w-full h-[250px] border-b">
            <Image
              src={image.url}
              alt={image.altText || product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : null}

        <Dialog.ContentText>
          <div className="flex flex-col justify-center items-center mt-4">
            <ProductWishlistButton entityId={product.entityId} />
            <span className="text-center text-xs mt-2 max-w-[225px]">
              Save products you think you may want to include in your merch
              program.
            </span>
          </div>
          <table className="table-auto w-full mt-8">
            <tbody>
              <tr className="border-y">
                <td>Brand</td>
                <td className="flex justify-end">{product.brand?.name}</td>
              </tr>
            </tbody>
          </table>
          <div className="prose prose-sm">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
          <VariantOptionSection title="Available Colors">
            <ProductColorGrid
              product={product}
              onColorSelect={handleColorSelect}
            />
          </VariantOptionSection>
        </Dialog.ContentText>
      </Dialog.Content>
    </Dialog>
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

ProductDialog.fragments = {
  product: gql`
    ${ProductColorGrid.fragments.product}
    fragment ProductDialogProductFragment on Product {
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
      variants {
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

export default ProductDialog
