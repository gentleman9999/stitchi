import { gql, useQuery } from '@apollo/client'
import { ClosetLayout } from '@components/layout'
import ClosetSettingsTeamPage from '@components/pages/ClosetSettingsTeamPage'
import { ClosetSettingsTeamPageGetDataQuery } from '@generated/ClosetSettingsTeamPageGetDataQuery'
import React from 'react'

const Page = () => {
  const { data, loading } =
    useQuery<ClosetSettingsTeamPageGetDataQuery>(GET_DATA)

  const { memberships } = data?.viewer?.organization || {}

  return <ClosetSettingsTeamPage memberships={memberships} loading={loading} />
}

Page.getLayout = (page: React.ReactNode) => <ClosetLayout>{page}</ClosetLayout>

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
