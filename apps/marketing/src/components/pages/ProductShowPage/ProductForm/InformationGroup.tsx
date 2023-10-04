import React from 'react'

interface InformationGroupProps {
  children: React.ReactNode
  title: string
  description: string
  icon: React.ReactNode
  optional?: boolean
  error?: string
}

const InformationGroup = ({
  children,
  title,
  description,
  icon,
  optional,
  error,
}: InformationGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <div className="">{icon}</div>
        <div className="flex flex-col gap-1 text-left">
          <div className="text font-semibold flex items-center">
            {title}
            {optional ? (
              <span className="text-xs text-gray-400 ml-2 font-normal">
                (optional)
              </span>
            ) : null}
          </div>
          <div className="text-xs">{description}</div>
        </div>
      </div>
      {error ? <div className="text-xs text-red-500 mt-1">{error}</div> : null}

      {children}
    </div>
  )
}

export default InformationGroup
