import React from 'react'

interface Props {
  title?: React.ReactNode
  actions?: React.ReactNode
}

const ClosetSectionTitle = ({ title, actions }: Props) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div>{actions}</div>
    </div>
  )
}

export default ClosetSectionTitle
