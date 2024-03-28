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
            <CategoryNavItem path={routes.internal.catalog.href()}>
              Discover
            </CategoryNavItem>
            <CategoryNavItem path={routes.internal.catalog.all.href()}>
              All products
            </CategoryNavItem>
            <CategoryNavItem
              path={routes.internal.catalog.category.show.href({
                categorySlug: 'apparel',
              })}
            >
              Apparel
            </CategoryNavItem>
            <CategoryNavItem
              path={routes.internal.catalog.category.show.href({
                categorySlug: 'accessories',
              })}
            >
              Accessories
            </CategoryNavItem>
            <CategoryNavItem
              path={routes.internal.catalog.category.show.href({
                categorySlug: 'home-goods',
              })}
            >
              Home & Living
            </CategoryNavItem>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-6">
            <SearchButton />
            {session ? (
              <AppTopbarUser />
            ) : (
              <Link href={routes.internal.login.href()}>Login</Link>
            )}
          </div>
        </PrimaryNavContainer>

        <SearchNav />

        <main className="mb-auto relative">{children}</main>
      </SearchProvider>
    </div>
  )
}

export default Layout
