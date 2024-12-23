'use client'

import { gql, useQuery } from '@apollo/client'
import ClosetSettingsTeamPage from '@components/pages/ClosetSettingsTeamPage'
import { ClosetSettingsTeamPageGetDataQuery } from '@generated/ClosetSettingsTeamPageGetDataQuery'
import React from 'react'

const Page = () => {
  const { data, loading } = useQuery<ClosetSettingsTeamPageGetDataQuery>(
    GET_DATA,
    {
      fetchPolicy: 'cache-and-network',
    },
  )

  const { memberships } = data?.viewer?.organization || {}

  return <ClosetSettingsTeamPage memberships={memberships} loading={loading} />
}

const GET_DATA = gql`
  ${ClosetSettingsTeamPage.fragments.membership}
  query ClosetSettingsTeamPageGetDataQuery {
    viewer {
      id
      organization {
        id
        memberships {
          id
          ...ClosetSettingsTeamPageMembershipFragment
        }
      }
    }
  }
`

export default Page
