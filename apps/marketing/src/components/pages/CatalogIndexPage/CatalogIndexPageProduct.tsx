import { Star } from 'icons'
import Image from 'next/image'
import React from 'react'
import cx from 'classnames'

interface Image {
  label?: string
  url?: string
}

interface Product {
  id: string
  name: string
  category?: string
  description?: string
  ratings?: {
    quality?: number
    softness?: number
    weight?: number
  }
  image?: Image
  additionalImages?: Image[]
}

export interface Props {
  product: Product
}

const CatalogIndexPageProduct = ({ product }: Props) => {
  return (
    <div className="block rounded-lg border-2 border-primary bg-[#f6f9f8] p-4">
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
      {Object.keys(product.ratings || {}).map(key => (
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
      ))}
    </div>
  )
}

export default CatalogIndexPageProduct
