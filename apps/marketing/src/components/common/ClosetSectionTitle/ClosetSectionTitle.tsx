'use client'

import React from 'react'
import { useClosetSectionContext } from '../ClosetSection/closet-section-context'
import Skeleton from '@components/ui/Skeleton'

interface Props {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

const ClosetSectionTitle = ({ title, description, actions }: Props) => {
  const { loading } = useClosetSectionContext()

  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">
          {loading ? <Skeleton width={90} /> : title}
        </h2>
        {description && typeof description === 'string' ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : (
          description
        )}
      </div>

      <div>{actions}</div>
    </div>
  )
}

export default ClosetSectionTitle
