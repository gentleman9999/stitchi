import ClosetInventoryShowPage from '@components/pages/ClosetInventoryShowPage'
import React from 'react'

const Page = ({ params: { designId } }: { params: { designId: string } }) => {
  return <ClosetInventoryShowPage designId={designId} />
}

export default Page
