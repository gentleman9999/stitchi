import { gql, useQuery } from '@apollo/client'
import { ClosetLayout } from '@components/layout'
import ClosetSettingsGeneralPage from '@components/pages/ClosetSettingsGeneralPage'
import { ClosetSettingsGeneralPageGetDataQuery } from '@generated/ClosetSettingsGeneralPageGetDataQuery'
import React from 'react'

const Page = () => {
  const { data, loading } =
    useQuery<ClosetSettingsGeneralPageGetDataQuery>(GET_DATA)

  const { user } = data?.viewer || {}

  return <ClosetSettingsGeneralPage user={user} loading={loading} />
}

Page.getLayout = (page: React.ReactNode) => <ClosetLayout>{page}</ClosetLayout>

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
