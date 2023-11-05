import { SlideOverHeader } from '@components/ui/SlideOver'
import React from 'react'
import DesignRequestApprovedMessage from './DesignRequestApprovedMessage'

interface Props {
  params: {
    designId: string
  }
}

const Page = ({ params: { designId } }: Props) => {
  return (
    <>
      <SlideOverHeader title="Your design is ready for production!" />
      <DesignRequestApprovedMessage designRequestId={designId} />
    </>
  )
}

export default Page
