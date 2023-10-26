import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import React from 'react'
import ClosetInventoryIndexPageInventoryList from './ClosetInventoryIndexPageInventoryList'
import OnboardingActionPanel from './OnboardingActionPanel'

interface Props {}

const ClosetInventoryIndexPage = (props: Props) => {
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

export default ClosetInventoryIndexPage
