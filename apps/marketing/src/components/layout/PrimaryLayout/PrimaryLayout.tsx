import { Footer } from '@components/common'
import React from 'react'
import cx from 'classnames'
import Navbar from './Navbar'

export interface PrimaryLayoutProps {
  className?: string
}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = props => {
  const { children, className } = props
  return (
    <div
      className={cx('flex flex-col justify-between min-h-screen', className)}
    >
      <Navbar />
      <main className="mb-auto relative overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  )
}

export default PrimaryLayout
