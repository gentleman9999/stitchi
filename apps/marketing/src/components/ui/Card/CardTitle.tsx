import React from 'react'

interface Props {
  title?: string
  subtitle?: string
}

const CardTitle = ({ title, subtitle }: Props) => {
  return (
    <div>
      {title ? (
        <h2 className="text-lg font-medium capitalize">{title}</h2>
      ) : null}
      {subtitle ? <p className="text-gray-500 text-sm">{subtitle}</p> : null}
    </div>
  )
}

export default CardTitle
