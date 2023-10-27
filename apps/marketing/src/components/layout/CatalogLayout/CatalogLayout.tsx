import { gql, useQuery } from '@apollo/client'
import { Footer } from '@components/common'
import { Logo } from '@components/ui'
import { CatalogLayoutGetDataQuery } from '@generated/CatalogLayoutGetDataQuery'
import {
  ChevronDownIcon,
  HomeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import Link from 'next/link'
import cx from 'classnames'
import React from 'react'
import AppTopbar from '../AppTopbar'
import PageloadProgressIndicator from '../PageloadProgressIndicator'
import NavItem from '../NavItem'

interface Props {
  children: React.ReactNode
}

const CatalogLayout = ({ children }: Props) => {
  const [mobileNavExpanded, setMobileNavExpanded] = React.useState(false)

  const { data } = useQuery<CatalogLayoutGetDataQuery>(GET_DATA)

  return (
    <>
      <PageloadProgressIndicator />
      <div className="h-full relative">
        <AppTopbar
          membership={data?.viewer || null}
          renderLogo={() => (
            <>
              <button
                className="md:hidden flex gap-2 items-center"
                onClick={() => setMobileNavExpanded(prev => !prev)}
              >
                <Logo className="h-10" />{' '}
                <ChevronDownIcon
                  className={cx('w-6 transform transition-all', {
                    'rotate-180': mobileNavExpanded,
                  })}
                />
              </button>
              <div className="hidden md:block">
                <Link href={routes.internal.home.href()}>
                  <Logo className="h-10" />
                </Link>
              </div>
            </>
          )}
        />
      </div>
      <main className="min-h-[calc(100vh-56px)] mt-[56px] relative z-0">
        <nav
          className={cx(
            'fixed h-[calc(100vh-56px)] left-0 top-[56px] border-r bg-paper w-0 z-50 overflow-scroll flex flex-col',
            {
              'w-screen': mobileNavExpanded,
            },
          )}
        >
          <ul className="flex flex-col gap-1 p-2">
            <NavItem
              href={routes.internal.home.href()}
              label="Home"
              icon={<HomeIcon className="w-4 h-4" />}
            />
            <NavItem
              href={routes.internal.catalog.href()}
              label="Catalog"
              icon={<ShoppingBagIcon className="w-4 h-4" />}
            />
            <NavItem
              href={routes.internal.closet.href()}
              label="Closet"
              icon={<Squares2X2Icon className="w-4 h-4" />}
            />
          </ul>
        </nav>

        {children}
      </main>

      <Footer />
    </>
  )
}

const GET_DATA = gql`
  ${AppTopbar.fragments.membership}
  query CatalogLayoutGetDataQuery {
    viewer {
      id
      ...AppTopbarMembershipFragment
    }
  }
`

export default CatalogLayout
