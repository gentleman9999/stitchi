import { Button } from '@components/ui'
import Link from 'next/link'
import React from 'react'

interface Cta {
  label: string
  href: string
}

interface Props {
  title: React.ReactNode
  description: React.ReactNode
  cta?: Cta
}

const ClosetPageEmptyState = ({ cta, title, description }: Props) => {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl leading-loose">{title}</h2>
          <p className="text-sm text-gray-600"> {description}</p>
        </div>
        <div>
          {cta ? (
            <Button slim Component={Link} color="brandPrimary" href={cta.href}>
              {cta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ClosetPageEmptyState
