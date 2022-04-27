import { gql } from '@apollo/client'
import { Dialog, IconButton } from '@components/ui'
import { ProductDialogProductFragment } from '@generated/ProductDialogProductFragment'
import routes from '@lib/routes'
import { XIcon } from 'icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import ProductColorGrid from './ProductColorGrid'

interface Props {
  product: ProductDialogProductFragment
}

const ProductDialog = ({ product }: Props) => {
  const router = useRouter()

  const handleClose = () => {
    const params = { ...router.query }
    delete params['productSlug']
    delete params['brandSlug']
    router.push(routes.internal.catalog.href({ params }), undefined, {
      scroll: false,
    })
  }

  console.log(product.description)

  return (
    <Dialog open={true} onClose={handleClose} mobileFullScreen>
      <Dialog.Title className="flex justify-between gap-2">
        <span>{product.name}</span>
        <IconButton onClick={handleClose} variant="ghost" disableGutters>
          <XIcon width={20} height={20} />
        </IconButton>
      </Dialog.Title>
      <Dialog.Content>
        {product.defaultImage && (
          <div className="relative w-full h-[250px]">
            <Image
              src={product.defaultImage.url}
              alt={product.defaultImage.altText || product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}

        <Dialog.ContentText>
          <span>{product.brand?.name}</span>
          <div className="prose">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
          <VariantOptionSection title="Available Colors">
            <ProductColorGrid product={product} />
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
    }
  `,
}

export default ProductDialog
