import React from 'react'
import DesignRequestApprovedMessage from './DesignRequestApprovedMessage'

interface Props {
  params: {
    designId: string
  }
}

const Page = ({ params: { designId } }: Props) => {
  return <DesignRequestApprovedMessage designRequestId={designId} />
}

export default Page
