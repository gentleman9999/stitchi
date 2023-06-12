import AccountSetupPage from '@components/pages/AccountSetupPage'
import { withAuthentication } from '@lib/auth'
import React from 'react'

const Page = () => {
  return <AccountSetupPage />
}

export default withAuthentication(Page)
