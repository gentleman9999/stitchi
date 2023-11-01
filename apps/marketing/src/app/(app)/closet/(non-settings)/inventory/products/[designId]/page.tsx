'use client'

import ClosetInventoryShowPage from '@components/pages/ClosetInventoryShowPage'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { designId } = useParams<{ designId: string }>() || {}

  if (typeof designId !== 'string') return null

  return <ClosetInventoryShowPage designId={designId} />
}

export default Page
