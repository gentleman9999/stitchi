'use client'

import { SlideOver } from '@components/ui/SlideOver'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()

  return (
    <SlideOver
      open
      className="sm:w-full sm:max-w-xl"
      onOpenChange={() => router.back()}
    >
      {children}
    </SlideOver>
  )
}

export default Layout
