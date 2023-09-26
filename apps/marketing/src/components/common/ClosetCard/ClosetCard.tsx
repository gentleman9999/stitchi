import { Badge, BadgeProps, LoadingDots } from '@components/ui'
import {
  Dropdown,
  DropdownItem,
  DropdownItemProps,
} from '@components/ui/Dropdown'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface Image {
  src: string
  alt: string
  width?: number
  height?: number
}

interface Props {
  href?: string
  loading?: boolean
  title?: string
  description?: React.ReactNode
  image?: Image
  badge?: Pick<BadgeProps, 'label' | 'severity'>
  actions?: DropdownItemProps[]
}

const ClosetCard = ({
  href,
  loading,
  title,
  description,
  image,
  badge,
  actions,
}: Props) => {
  const LinkComponent = href ? Link : 'div'

  return (
    <LinkComponent
      className="relative group rounded-md overflow-hidden border flex flex-col w-full bg-paper"
      href={href || ''}
    >
      {badge || actions?.length ? (
        <div className="absolute right-0 top-0">
          <div className="p-2 flex gap-1">
            {badge ? <Badge {...badge} className="opacity-90" /> : null}
            {actions?.length ? (
              <Dropdown
                renderTrigger={() => (
                  <button
                    className="max-w-0 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:max-w-[60px] p-1 bg-gray-900/50 hover:bg-gray-900/60 data-[state=open]:opacity-100 data-[state=open]:pointer-events-auto data-[state=open]:max-w-none rounded-md transition-all outline-none"
                    onClick={e => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                  >
                    <EllipsisHorizontalIcon className="w-6 h-6 text-white" />
                  </button>
                )}
                renderItems={() =>
                  actions.map(action => (
                    <DropdownItem key={action.label} {...action} />
                  ))
                }
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="aspect-square overflow-hidden rounded-md bg-paper flex justify-center items-center">
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

      <div className="p-4 flex flex-col gap-1 flex-1">
        {loading || title ? (
          <h2 className="text-sm font-medium leading-tight text-gray-700">
            {loading ? <Skeleton width={100} /> : title}
          </h2>
        ) : null}
        {loading || description ? (
          <>
            {loading ? (
              <div>
                <Skeleton width={50} />
                <Skeleton width={80} />
                <Skeleton width={60} />
              </div>
            ) : typeof description === 'string' ? (
              <p className="text-xs text-gray-500">{description}</p>
            ) : (
              description
            )}
          </>
        ) : null}
      </div>
    </LinkComponent>
  )
}

export default ClosetCard
