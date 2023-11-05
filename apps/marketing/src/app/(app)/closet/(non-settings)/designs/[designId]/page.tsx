import ClosetDesignRequestShowPage from '@components/pages/ClosetDesignRequestShowPage'
import React from 'react'

interface Props {
  params: {
    designId: string
  }
}

const Page = ({ params: { designId } }: Props) => {
  return <ClosetDesignRequestShowPage designId={designId} />
}

export default Page
