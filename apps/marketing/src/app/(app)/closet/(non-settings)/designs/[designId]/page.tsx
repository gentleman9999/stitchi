'use client'

import ClosetDesignRequestShowPage from '@components/pages/ClosetDesignRequestShowPage'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { designId } = useParams<{ designId: string }>() || {}

  if (typeof designId !== 'string') {
    return null
  }

  return <ClosetDesignRequestShowPage designId={designId} />
}

export default Page
