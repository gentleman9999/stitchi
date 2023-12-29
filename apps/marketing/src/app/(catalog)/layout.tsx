import cx from 'classnames'
import UserNavItem from './UserNavItem'
import Link from 'next/link'
import routes from '@lib/routes'
import Logo from '@components/ui/Logo'
import CategoryNavItem from './CategoryNavItem'
import PrimaryNavContainer from './PrimaryNavContainer'
import SearchNav from './SearchNav'
import SearchButton from './SearchButton'
import { SearchProvider } from './search-context'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
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
              <Logo className="h-[40px]" />
            </Link>
          </div>

          <div className="hidden flex-auto lg:flex items-center justify-center space-x-6">
            {/* <Link
                href={routes.internal.login.href()}
                passHref
                className={s.link}
              >
                Discover
              </Link> */}
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
            <UserNavItem />
          </div>
        </PrimaryNavContainer>

        <SearchNav />

        <main className="mb-auto relative">{children}</main>
      </SearchProvider>
    </div>
  )
}

export default Layout
