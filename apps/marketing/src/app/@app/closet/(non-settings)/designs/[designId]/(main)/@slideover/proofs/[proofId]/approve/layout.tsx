import { SlideOverHeader } from '@components/ui/SlideOver'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <SlideOverHeader title="Approve design" />
      {children}
    </>
  )
}

export default Layout
