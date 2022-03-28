import { Star } from 'icons'
import Image from 'next/image'
import React from 'react'
import cx from 'classnames'
import { gql } from '@apollo/client'
import { CatalogIndexPageProductProductFragment } from '@generated/CatalogIndexPageProductProductFragment'
import SwatchGroup from './SwatchGroup'
import { notEmpty } from '@utils/typescript'

export interface Props {
  product: CatalogIndexPageProductProductFragment
}

const CatalogIndexPageProduct = ({ product }: Props) => {
  return (
    <div className="block rounded-2xl border-2 border-gray-100 bg-[#f6f9f8] p-4">
      {product.image?.url && (
        <div className="relative w-full h-[150px]">
          <Image
            src={product.image.url}
            alt={product.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}

      <h3 className="mt-4 text-sm font-medium tracking-wide">{product.name}</h3>
      <div className="mt-4 flex items-center">
        <SwatchGroup
          hexColors={
            product.colors?.map(({ hex }) => hex).filter(notEmpty) || []
          }
        />
        <span className="ml-auto text-xs font-medium tracking-tight text-gray-700">
          {product.variantCount} options
        </span>
      </div>

      {/* {Object.keys(product.ratings || {}).map(key => (
        <div key={key} className="flex items-center mt-2 justify-between">
          <data className="text-sm">{key}</data>
          <div className="flex gap-1">
            {Array.from(new Array(3), (_, i) => (
              <Star
                fill="none"
                className={cx('stroke-primary', {
                  'fill-primary':
                    product.ratings &&
                    product.ratings[key as keyof typeof product['ratings']] > i,
                })}
              />
            ))}
          </div>
        </div>
      ))} */}
    </div>
  )
}

CatalogIndexPageProduct.fragments = {
  product: gql`
    fragment CatalogIndexPageProductProductFragment on Material {
      id
      name
      variantCount
      image {
        id
        url
      }
      manufacturer {
        name
      }
      colors {
        id
        hex
      }
    }
  `,
}

export default CatalogIndexPageProduct
