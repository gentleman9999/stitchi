import Image from 'next/image'
import React from 'react'
import { gql } from '@apollo/client'
import { CatalogIndexPageProductProductFragment } from '@generated/CatalogIndexPageProductProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import useProductColors from '@hooks/useProductColors'
import SwatchGroup from './SwatchGroup'
import { useRouter } from 'next/router'

export interface Props {
  product: CatalogIndexPageProductProductFragment
}

const CatalogIndexPageProduct = ({ product }: Props) => {
  const router = useRouter()
  const { colors } = useProductColors({ product })

  if (!product.brand) {
    console.warn('Product must have a brand')
    return null
  }

  const href = routes.internal.catalog.product.href({
    brandSlug: product.brand?.path,
    productSlug: product.path,
    params: router.query,
  })

  return (
    <li>
      <Link href={href}>
        <a className="block cursor-pointer rounded-2xl border-2 border-gray-100 p-4">
          {product.defaultImage?.url && (
            <div className="relative w-full h-[200px]">
              <Image
                src={product.defaultImage.url}
                alt={product.defaultImage.altText || product.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}

          <h3 className="mt-4 text-sm font-medium tracking-wide">
            {product.brand?.name} {product.name}
          </h3>
          <div className="mt-4 flex items-center">
            <SwatchGroup
              // Could add support for more colors in the future
              hexColors={colors.map(({ hexColors }) => hexColors[0])}
            />
          </div>
        </a>
      </Link>
    </li>
  )
}

CatalogIndexPageProduct.fragments = {
  product: gql`
    ${useProductColors.fragments.product}
    fragment CatalogIndexPageProductProductFragment on Product {
      ...UseProductColorsProductFragment
      id
      name
      path
      brand {
        id
        name
        path
      }
      defaultImage {
        urlOriginal
        altText
        url(width: 150)
      }
    }
  `,
}

export default CatalogIndexPageProduct
