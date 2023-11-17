import React from 'react'

import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import ClosetBrandIndexPageFiles from './ClosetBrandIndexPageFiles'
import ClosetBrandIndexPageColors from './ClosetBrandIndexPageColors'

const Page = () => {
  return (
    <ClosetPageContainer>
      <div className="max-w-6xl m-auto">
        <ClosetPageHeader>
          <ClosetPageTitle
            title="Brand"
            description="Keep on-brand by saving your logos and colors."
          />
        </ClosetPageHeader>

        <ClosetSection>
          <ClosetSectionHeader>
            <ClosetSectionTitle title="Logos" />
          </ClosetSectionHeader>

          <ClosetBrandIndexPageFiles />
        </ClosetSection>

        <ClosetSection>
          <ClosetSectionHeader>
            <ClosetSectionTitle title="Colors" />
          </ClosetSectionHeader>

          <ClosetBrandIndexPageColors />
        </ClosetSection>
      </div>
    </ClosetPageContainer>
  )
}

export default Page
