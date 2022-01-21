import { Footer } from '@components/common'
import React from 'react'
import Navbar from './Navbar'

export interface PrimaryLayoutProps {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = props => {
  const { children } = props
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-hidden">{children}</main>
      <Footer />
    </>
  )
}

export default PrimaryLayout
