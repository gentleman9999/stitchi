import { gql, useQuery } from '@apollo/client'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import { withAuthentication } from '@lib/auth'
import React from 'react'
import AppBetaDialog from './AppBetaDialog'
import SideBar from './SideBar'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
  const { data, loading: dataLoading } =
    useQuery<ClosetLayoutGetDataQuery>(GET_DATA)

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

export default withAuthentication(ClosetLayout)
