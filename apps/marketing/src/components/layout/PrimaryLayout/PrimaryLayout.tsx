import { Footer } from '@components/common'
import React from 'react'
import cx from 'classnames'
import PageLoadProgress from 'nextjs-progressbar'
import Navbar from './Navbar'
import { theme } from '../../../../tailwind.config'

export interface PrimaryLayoutProps {
  children: React.ReactNode
  className?: string
  navBackgroundColor?: string
  disableNavSpacing?: boolean
}

const PrimaryLayout = (props: PrimaryLayoutProps) => {
  const { children, className, navBackgroundColor, disableNavSpacing } = props
  return (
    <>
      <PageLoadProgress
        color={theme.colors.primary}
        options={{ showSpinner: false }}
      />
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
    </>
  )
}

export default PrimaryLayout
