'use client'

import { gql, useQuery } from '@apollo/client'
import ClosetSettingsOrganizationPage from '@components/pages/ClosetSettingsOrganizationPage'
import { ClosetSettingsOrganizatoinPageGetDataQuery } from '@generated/ClosetSettingsOrganizatoinPageGetDataQuery'
import React from 'react'

const Page = () => {
  const { data, loading } =
    useQuery<ClosetSettingsOrganizatoinPageGetDataQuery>(GET_DATA)

  return (
    <ClosetSettingsOrganizationPage
      organization={data?.viewer?.organization}
      loading={loading}
    />
  )
}

const GET_DATA = gql`
  ${ClosetSettingsOrganizationPage.fragments.organization}
  query ClosetSettingsOrganizatoinPageGetDataQuery {
    viewer {
      id
      organization {
        id
        ...ClosetSettingsOrganizationPageOrganizationFragment
      }
    }
  }
`

export default Page
