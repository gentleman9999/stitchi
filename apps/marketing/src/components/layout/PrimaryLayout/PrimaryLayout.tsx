import { Footer } from '@components/common'
import React from 'react'

export interface PrimaryLayoutProps {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = props => {
  const { children } = props
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PrimaryLayout
