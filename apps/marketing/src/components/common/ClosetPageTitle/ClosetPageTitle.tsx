import { Button } from '@components/ui'
import React from 'react'

interface Props {
  title: React.ReactNode
  actions?: React.ReactNode
}

const ClosetPageTitle = (props: Props) => {
  return (
    <div className="py-4 flex flex-row items-center justify-between">
      <h1 className="text-3xl font-medium font-heading text-gray-800">
        {props.title}
      </h1>

      {props.actions}
    </div>
  )
}

export default ClosetPageTitle
