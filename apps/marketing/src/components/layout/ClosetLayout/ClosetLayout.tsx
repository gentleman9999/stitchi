import { gql, useQuery } from '@apollo/client'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'
import AppBetaDialog from './AppBetaDialog'
import SideBar from './SideBar'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
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

  return (
    <>
      <AppBetaDialog />
      <div className="flex">
        <SideBar membershp={data?.viewer} loading={dataLoading} />
        <div className="ml-64 overflow-auto flex items-center w-full">
          {props.children}
        </div>
      </div>
    </>
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
