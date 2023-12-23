import NavbarRoot from '@components/layout/PrimaryLayout/Navbar/NavbarRoot'
import cx from 'classnames'
import UserNavItem from './UserNavItem'
import Link from 'next/link'
import routes from '@lib/routes'
import s from './layout.module.css'
import Logo from '@components/ui/Logo'
import Container from '@components/ui/Container'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={cx('flex flex-col justify-between min-h-screen')}>
      {/* Floating nav spacer */}
      <div className={`h-topbar-height`} />
      {/* End - Floating nav spacer */}

      <div className="fixed h-topbar-height bg-white top-0 left-0 right-0 z-40 transition-all border-b">
        <Container className="max-w-none flex items-center h-full">
          <nav className="flex-1 grid grid-cols-12">
            <div className="col-span-1">
              <Link
                href={routes.internal.home.href()}
                passHref
                className="contents"
              >
                <Logo className="h-[40px]" />
              </Link>
            </div>

            <div className="col-span-10 flex items-center justify-center space-x-6">
              <Link
                href={routes.internal.login.href()}
                passHref
                className={s.link}
              >
                Discover
              </Link>
              <Link
                href={routes.internal.login.href()}
                passHref
                className={s.link}
              >
                All products
              </Link>
              <Link
                href={routes.internal.login.href()}
                passHref
                className={s.link}
              >
                Apparel
              </Link>
              <Link
                href={routes.internal.login.href()}
                passHref
                className={s.link}
              >
                Accessories
              </Link>
              <Link
                href={routes.internal.login.href()}
                passHref
                className={s.link}
              >
                Home & Living
              </Link>
            </div>

            <div className="col-span-1 flex items-center justify-center">
              <UserNavItem />
            </div>
          </nav>
        </Container>
      </div>

      <main className="mb-auto relative">{children}</main>
    </div>
  )
}

export default Layout
