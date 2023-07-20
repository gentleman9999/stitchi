import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import React from 'react'
import ClosetBrandIndexPageFiles from './ClosetBrandIndexPageFiles/ClosetBrandIndexPageFiles'
import ClosetBrandIndexPageColors from './ClosetBrandIndexPageColors'

const ClosetBrandIndexPage = () => {
  return (
    <ClosetPageContainer>
      <div className="max-w-6xl m-auto">
        <ClosetPageHeader>
          <ClosetPageTitle title="Brand" />
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

export default ClosetBrandIndexPage
