import { Footer } from '@components/common'
import React from 'react'
import cx from 'classnames'
import Navbar from './Navbar'
import PageloadProgressIndicator from './PageloadProgressIndicator'

export interface PrimaryLayoutProps {
  children: React.ReactNode
  className?: string
  navBackgroundColor?: string
  disableNavSpacing?: boolean
}

const PrimaryLayout = (props: PrimaryLayoutProps) => {
  const { children, className, navBackgroundColor, disableNavSpacing } = props

  React.useEffect(() => {
    // Because we have a sticky nav, we want to ensure that "scroll-to-top" is offset by the height of the nav

    if (typeof window === 'undefined') {
      return
    }

    const classList = ['scroll-pt-40', 'scroll-smooth']

    window.document.documentElement.classList.add(...classList)

    return () => {
      window.document.documentElement.classList.remove(...classList)
    }
  }, [])

  return (
    <>
      <PageloadProgressIndicator />
      <div
        className={cx('flex flex-col justify-between min-h-screen', className)}
      >
        {/* Floating nav spacer */}
        {!disableNavSpacing && (
          <div className={`${navBackgroundColor} h-[111px]`} />
        )}
        {/* End - Floating nav spacer */}
        <Navbar />
        <main className="mb-auto relative">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default PrimaryLayout
