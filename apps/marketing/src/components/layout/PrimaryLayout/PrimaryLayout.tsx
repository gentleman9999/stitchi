import { Footer } from '@components/common'
import React from 'react'
import cx from 'classnames'
import Navbar from './Navbar'

export interface PrimaryLayoutProps {
  className?: string
  navBackgroundColor?: string
  disableNavSpacing?: boolean
}

const PrimaryLayout: React.FC<PrimaryLayoutProps> = props => {
  const { children, className, navBackgroundColor, disableNavSpacing } = props
  return (
    <div
      className={cx('flex flex-col justify-between min-h-screen', className)}
    >
      {/* Floating nav spacer */}
      {!disableNavSpacing && (
        <div className={`${navBackgroundColor} h-[111px]`} />
      )}
      {/* End - Floating nav spacer */}
      <Navbar />
      <main className="mb-auto relative overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  )
}

export default PrimaryLayout
