import React from 'react'

interface InformationGroupProps {
  children: React.ReactNode
  title: string
  description?: React.ReactNode
  icon: React.ReactNode
  footer?: React.ReactNode
  optional?: boolean
  error?: string
}

const InformationGroup = ({
  children,
  title,
  description,
  icon,
  optional,
  footer,
  error,
}: InformationGroupProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        {/* <div className="">{icon}</div> */}
        <div className="flex flex-col gap-1 text-left">
          <div className="text-2xl font-semibold flex items-center">
            {title}
            {optional ? (
              <span className="text-xs text-gray-400 ml-2 font-normal">
                (optional)
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="text-base text-gray-600">{description}</p>
          ) : null}
        </div>
      </div>
      {error ? <div className="text-xs text-red-500 mt-1">{error}</div> : null}

      {children}

      {footer ? (
        <div className="text-sm font-normal bg-gray-100 rounded-sm p-4">
          {footer}
        </div>
      ) : null}
    </div>
  )
}

export default InformationGroup
