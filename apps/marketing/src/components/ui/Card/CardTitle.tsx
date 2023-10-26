import React from 'react'

interface Props {
  title?: React.ReactNode
  subtitle?: React.ReactNode
}

const CardTitle = ({ title, subtitle }: Props) => {
  return (
    <div>
      {title ? <h2 className="text-lg font-medium">{title}</h2> : null}
      {subtitle ? (
        <p className="text-gray-500 text-sm mt-2">{subtitle}</p>
      ) : null}
    </div>
  )
}

export default CardTitle
