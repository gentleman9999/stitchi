import { SlideOverHeader } from '@components/ui/SlideOver'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <SlideOverHeader title="Your design is ready for production!" />
      {children}
    </>
  )
}

export default Layout
