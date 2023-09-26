import { gql, useQuery } from '@apollo/client'
import { LoadingDots, Logo } from '@components/ui'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import cx from 'classnames'
import React from 'react'
import { ClosetLayoutContextProvider } from './closet-layout-context'
import SideBar from './SideBar'
import AppTopbar from '../AppTopbar/AppTopbar'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
  const [mobileNavExpanded, setMobileNavExpanded] = React.useState(false)

  const router = useRouter()
  const { data, loading: dataLoading } =
    useQuery<ClosetLayoutGetDataQuery>(GET_DATA)

  React.useEffect(() => {
    if (!dataLoading && !data?.viewer) {
      router.push(
        routes.internal.account.setup.href({ redirectUrl: router.asPath }),
      )
    }
  }, [data?.viewer, dataLoading, router])

  React.useEffect(() => {
    const handleRouteChange = () => {
      setMobileNavExpanded(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (dataLoading || !data?.viewer) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingDots />
      </div>
    )
  }

  return (
    <ClosetLayoutContextProvider>
      <div className="h-full relative">
        <AppTopbar
          membership={data.viewer}
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
                <Logo className="h-10" />
              </div>
            </>
          )}
        />
        <main className="min-h-[calc(100vh-56px)] mt-[56px] relative md:pl-64">
          <nav
            className={cx(
              'fixed h-[calc(100vh-56px)] left-0 top-[56px] border-r bg-paper w-0 md:w-64 z-10 overflow-scroll flex flex-col',
              {
                'w-screen': mobileNavExpanded,
              },
            )}
          >
            <SideBar membership={data?.viewer} loading={dataLoading} />
          </nav>

          <main className="overflow-auto w-full z-0 bg-gray-50 min-h-[calc(100vh-56px)] relative">
            {props.children}
          </main>
        </main>
      </div>
    </ClosetLayoutContextProvider>
  )
}

const GET_DATA = gql`
  ${SideBar.fragments.membership}
  ${AppTopbar.fragments.membership}
  query ClosetLayoutGetDataQuery {
    viewer {
      id
      ...SideBarMembershipFragment
      ...AppTopbarMembershipFragment
    }
  }
`

export default ClosetLayout
