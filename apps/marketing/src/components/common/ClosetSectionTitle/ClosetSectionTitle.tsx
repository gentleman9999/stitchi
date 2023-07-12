import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useClosetSectionContext } from '../ClosetSection/closet-section-context'

interface Props {
  title?: React.ReactNode
  actions?: React.ReactNode
}

const ClosetSectionTitle = ({ title, actions }: Props) => {
  const { loading } = useClosetSectionContext()

  return (
    <div className="mb-6 flex justify-between items-center">
      <h2 className="text-lg font-semibold">
        {loading ? <Skeleton width={90} /> : title}
      </h2>
      <div>{actions}</div>
    </div>
  )
}

export default ClosetSectionTitle
