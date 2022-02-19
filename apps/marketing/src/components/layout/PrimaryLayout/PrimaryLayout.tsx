import { Footer } from '@components/common'
import React from 'react'
import Navbar from './Navbar'

export interface PrimaryLayoutProps {}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = props => {
  const { children } = props
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <main className="mb-auto relative overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  )
}

export default PrimaryLayout
