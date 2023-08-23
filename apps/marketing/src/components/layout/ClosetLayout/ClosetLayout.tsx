import { gql, useQuery } from '@apollo/client'
import { Container, IconButton, LoadingDots } from '@components/ui'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import { Bars3Icon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import cx from 'classnames'
import React from 'react'
import AppBetaDialog from './AppBetaDialog'
import { ClosetLayoutContextProvider } from './closet-layout-context'
import SideBar from './SideBar'
import { AnimatePresence, motion } from 'framer-motion'

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
      <AppBetaDialog />
      <div className="flex flex-col md:flex-row relative">
        <nav
          className={cx(
            'fixed h-screen border-r bg-paper w-0 md:w-64 z-10 overflow-hidden flex flex-col',
            {
              'w-screen': mobileNavExpanded,
            },
          )}
        >
          <div className="md:hidden border-b py-2">
            <Container>
              <IconButton
                className="-translate-x-2"
                onClick={() => setMobileNavExpanded(prev => !prev)}
              >
                <Bars3Icon className="w-5 h-5" />
              </IconButton>
            </Container>
          </div>

          <SideBar membership={data?.viewer} loading={dataLoading} />
        </nav>

        <div className="md:hidden border-b py-2">
          <Container>
            <IconButton
              className="-translate-x-2"
              onClick={() => setMobileNavExpanded(prev => !prev)}
            >
              <Bars3Icon className="w-5 h-5" />
            </IconButton>
          </Container>
        </div>

        <div className="md:ml-64 overflow-auto flex items-center w-full z-0">
          {props.children}
        </div>
      </div>
    </ClosetLayoutContextProvider>
  )
}

const GET_DATA = gql`
  ${SideBar.fragments.membership}
  query ClosetLayoutGetDataQuery {
    viewer {
      id
      ...SideBarMembershipFragment
    }
  }
`

export default ClosetLayout
