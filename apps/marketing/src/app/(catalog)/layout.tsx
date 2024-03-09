import cx from 'classnames'
import Link from 'next/link'
import routes from '@lib/routes'
import Logo from '@components/ui/Logo'
import CategoryNavItem from './CategoryNavItem'
import PrimaryNavContainer from './PrimaryNavContainer'
import SearchNav from './SearchNav'
import SearchButton from './SearchButton'
import { SearchProvider } from './layout-context'
import { getSession } from '@auth0/nextjs-auth0'
import AppTopbarUser from '../AppTopbarUser'

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const session = await getSession()

  return (
    <div className={cx('flex flex-col justify-between min-h-screen')}>
      {/* Floating nav spacer */}
      <div className={`h-topbar-height`} />
      {/* End - Floating nav spacer */}

      <SearchProvider>
        <PrimaryNavContainer>
          <div className="flex-1">
            <Link
              href={routes.internal.home.href()}
              passHref
              className="contents"
            >
              <Logo className="h-[30px]" />
            </Link>
          </div>

          <div className="hidden flex-auto lg:flex items-center justify-center space-x-6">
            {/* <Link
              href={routes.internal.catalog.discover.href()}
              className={cx(s.link, {
                'underline underline-offset-8': pathname?.startsWith(
                  routes.internal.catalog.discover.href(),
                ),
              })}
            >
              Discover
            </Link> */}
            <CategoryNavItem
              categorySlug={routes.internal.catalog.discover.href()}
            >
              Discover
            </CategoryNavItem>
            <CategoryNavItem categorySlug="catalog">
              All products
            </CategoryNavItem>
            <CategoryNavItem categorySlug="apparel">Apparel</CategoryNavItem>
            <CategoryNavItem categorySlug="accessories">
              Accessories
            </CategoryNavItem>
            <CategoryNavItem categorySlug="home-goods">
              Home & Living
            </CategoryNavItem>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-6">
            <SearchButton />
            {session ? <AppTopbarUser /> : null}
          </div>
        </PrimaryNavContainer>

        <SearchNav />

        <main className="mb-auto relative">{children}</main>
      </SearchProvider>
    </div>
  )
}

export default Layout
