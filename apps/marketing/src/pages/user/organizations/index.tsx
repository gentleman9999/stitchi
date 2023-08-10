import UserOrganizationsIndexPage from '@components/pages/UserOrganizationsIndexPage'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const Page = () => {
  return <UserOrganizationsIndexPage />
}

export default withAuthentication(Page)
