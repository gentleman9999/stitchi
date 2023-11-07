import LoadingDots from '@components/ui/LoadingDots'
import React from 'react'

interface Props {}

const Loading = ({}: Props) => {
  return (
    <div className="w-full flex justify-center items-center flex-1">
      <LoadingDots />
    </div>
  )
}

export default Loading
