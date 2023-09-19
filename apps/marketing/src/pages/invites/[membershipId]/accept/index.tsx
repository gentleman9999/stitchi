import { FocusedLayout } from '@components/layout'
import React from 'react'

const AcceptMembershipPage = () => {
  return <div>AcceptMembershipPage</div>
}

AcceptMembershipPage.getLayout = (page: React.ReactElement) => (
  <FocusedLayout>{page}</FocusedLayout>
)

export default AcceptMembershipPage
