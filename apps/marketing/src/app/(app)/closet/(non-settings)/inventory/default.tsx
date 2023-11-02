import React from 'react'
import ClosetSection from '@components/common/ClosetSection'
import ClosetInventoryIndexPageInventoryList from './ClosetInventoryIndexPageInventoryList'
import OnboardingActionPanel from './OnboardingActionPanel'

import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'

const Page = () => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="Inventory" description="" />
      </ClosetPageHeader>
      <OnboardingActionPanel />

      <ClosetSection>
        <ClosetInventoryIndexPageInventoryList />
      </ClosetSection>
    </ClosetPageContainer>
  )
}

export default Page
