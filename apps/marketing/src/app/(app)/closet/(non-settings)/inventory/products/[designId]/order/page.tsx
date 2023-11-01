'use client'

import ClosetDesignBuyPage from '@components/pages/ClosetDesignBuyPage'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const { designId } = useParams<{ designId: string }>() || {}

  if (typeof designId !== 'string') return null

  return <ClosetDesignBuyPage designId={designId} />
}

export default Page
