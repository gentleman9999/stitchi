'use client'

import { gql, useQuery } from '@apollo/client'
import { ClosetSettingsGeneralPageGetDataQuery } from '@generated/ClosetSettingsGeneralPageGetDataQuery'
import React from 'react'
import ClosetSettingsGeneralPage from './ClosetSettingsGeneralPage'

const Page = () => {
  const { data, loading } =
    useQuery<ClosetSettingsGeneralPageGetDataQuery>(GET_DATA)

  const { user } = data?.viewer || {}

  return <ClosetSettingsGeneralPage user={user} loading={loading} />
}

const GET_DATA = gql`
  ${ClosetSettingsGeneralPage.fragments.user}
  query ClosetSettingsGeneralPageGetDataQuery {
    viewer {
      id
      user {
        id
        ...ClosetSettingsGeneralPageUserFragment
      }
    }
  }
`

export default Page
