import Footer from '@components/common/Footer'
import Navbar from '@components/layout/PrimaryLayout/Navbar'
import cx from 'classnames'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={cx('flex flex-col justify-between min-h-screen')}>
      {/* Floating nav spacer */}
      <div className={`h-topbar-height`} />
      {/* End - Floating nav spacer */}
      <Navbar />
      <main className="mb-auto relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
