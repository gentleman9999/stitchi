'use client'

import { gql, useQuery } from '@apollo/client'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import { ClosetDashboardPageGetDataQuery } from '@generated/ClosetDashboardPageGetDataQuery'
import React from 'react'
import UnclaimedDesignRequestsCard from './UnclaimedDesignRequestsCard'

interface Props {}

const ClosetDashboardPage = ({}: Props) => {
  const { data } = useQuery<ClosetDashboardPageGetDataQuery>(GET_DATA)

  const { user } = data?.viewer || {}

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title={`Hey, ${user?.name}`} />
      </ClosetPageHeader>
      <ClosetSection>
        <UnclaimedDesignRequestsCard />
      </ClosetSection>
    </ClosetPageContainer>
  )
}

const GET_DATA = gql`
  query ClosetDashboardPageGetDataQuery {
    viewer {
      id
      user {
        id
        name
      }
    }
  }
`

export default ClosetDashboardPage
