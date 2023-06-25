import React from 'react'

export interface Props {
  title: React.ReactNode
  actions?: React.ReactNode
}

const ClosetPageTitle = (props: Props) => {
  return (
    <div className="py-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-medium font-heading text-gray-800">
          {props.title}
        </h1>

        {props.actions}
      </div>
    </div>
  )
}

export default ClosetPageTitle
