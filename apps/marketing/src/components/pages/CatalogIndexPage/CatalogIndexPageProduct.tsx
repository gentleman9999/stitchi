import { Star } from 'icons'
import Image from 'next/image'
import React from 'react'
import cx from 'classnames'
import { product } from './CatalogIndexPageProductGrid'

interface Props {
  product: ReturnType<typeof product>
}

const CatalogIndexPageProduct = ({ product }: Props) => {
  return (
    <div className="block rounded-lg border-2 border-primary bg-[#f6f9f8] p-4">
      <div className="relative w-full h-[150px]">
        <Image
          src={product.primaryImage.url}
          alt={product.name}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <h3 className="mt-4 text-sm font-medium tracking-wide">{product.name}</h3>
      {Object.keys(product.ratings).map(key => (
        <div key={key} className="flex items-center mt-2 justify-between">
          <data className="text-sm">{key}</data>
          <div className="flex gap-1">
            {Array.from(new Array(3), (_, i) => (
              <Star
                fill="none"
                className={cx('stroke-primary', {
                  'fill-primary': product.ratings[key] > i,
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
