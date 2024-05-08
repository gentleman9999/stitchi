import { StarIcon } from '@heroicons/react/20/solid'
import React from 'react'
import cx from 'classnames'

interface Props {
  pretitle?: string
  title: string
  rating?: number
  ratingCount?: number
}

const ProductTitle = ({
  pretitle,
  title,
  rating = 0,
  ratingCount = 0,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-500 font-light">{pretitle}</span>

      <h1 className="font-headingDisplay  font-semibold text-2xl sm:text-3xl text-gray-800">
        {title}
      </h1>

      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-0.5">
          {Array.from(new Array(5)).map((_, index) => (
            <StarIcon
              key={index}
              className={cx('w-6 h-6 fill-gray-200', {
                ' !fill-gray-900': index < rating,
              })}
            />
          ))}
        </div>
        <span className="text-gray-500 text-sm">({ratingCount})</span>
      </div>
    </div>
  )
}

export default ProductTitle
