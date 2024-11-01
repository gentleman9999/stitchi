import React from 'react'

export interface Props {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

const ClosetPageTitle = (props: Props) => {
  return (
    <div className="pt-8 pb-4">
      <div className="flex flex-row flex-wrap gap-4 items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-medium font-heading text-gray-800">
            {props.title}
          </h1>

          {props.description && (
            <div className="text-gray-500 mt-1">{props.description}</div>
          )}
        </div>

        {props.actions}
      </div>
    </div>
  )
}

export default ClosetPageTitle
