import { gql, useQuery } from '@apollo/client'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import React from 'react'
import SideBar from './SideBar'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
  const { data, loading } = useQuery<ClosetLayoutGetDataQuery>(GET_DATA)

  return (
    <div className="flex">
      <SideBar membershp={data?.viewer} loading={loading} />
      <div className="ml-64 overflow-auto flex items-center w-full">
        {props.children}
      </div>
    </div>
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
