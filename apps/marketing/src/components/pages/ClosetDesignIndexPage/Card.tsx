import { Badge, BadgeProps, LoadingDots } from '@components/ui'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface Image {
  src: string
  width: number
  height: number
  alt: string
}

interface Props {
  href: string
  loading?: string
  title?: string
  description?: string
  image?: Image
  badge?: Pick<BadgeProps, 'label' | 'severity'>
}

const Card = ({ href, loading, title, description, image, badge }: Props) => {
  return (
    <Link className="relative rounded-md overflow-hidden border" href={href}>
      {badge ? (
        <div className="absolute right-0 top-0">
          <div className="p-2">
            <Badge {...badge} className="opacity-90" />
          </div>
        </div>
      ) : null}

      <div className="aspect-square overflow-hidden rounded-md bg-gray-50 flex justify-center items-center">
        {loading ? (
          <LoadingDots />
        ) : image ? (
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-gray-300 text-sm">Preview unavailable</span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        {loading || title ? (
          <h2 className="font-semibold leading-tight">
            {loading ? <Skeleton width={100} /> : title}
          </h2>
        ) : null}
        {loading || description ? (
          <p className="text-xs text-gray-500 ">
            {loading ? (
              <>
                <Skeleton width={50} />
                <Skeleton width={80} />
                <Skeleton width={60} />
              </>
            ) : (
              description
            )}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

export default Card
