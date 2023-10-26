import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import Button from '@components/ui/ButtonV2/Button'
import React from 'react'
import ClosetInventoryIndexPageInventoryList from './ClosetInventoryIndexPageInventoryList'

interface Props {}

const ClosetInventoryIndexPage = (props: Props) => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="Inventory" description="" />
      </ClosetPageHeader>

      <ClosetSection>
        <div className="bg-paper border rounded-md p-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-md">All your inventory in one place</h2>
              <p className="text-gray-700 text-sm max-w-2xl">
                Your inventory are all of the items stored with Stitchi. You can
                easily send items from your inventory anywhere, or use one of
                our integrations to auto-magically fulfill!
              </p>
            </div>

            <Button variant="ghost" size="xl">
              Got it
            </Button>
          </div>
        </div>
      </ClosetSection>

      <ClosetSection>
        <ClosetInventoryIndexPageInventoryList />
      </ClosetSection>
    </ClosetPageContainer>
  )
}

export default ClosetInventoryIndexPage
