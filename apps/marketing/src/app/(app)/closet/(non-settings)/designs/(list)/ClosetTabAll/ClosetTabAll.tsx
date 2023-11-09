'use client'

import React from 'react'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import ClosetTabAllCollections from './ClosetTabAllCollections'
import ButtonV2 from '@components/ui/ButtonV2'
import ClosetTabAllDesignRequests from './ClosetTabAllDesignRequests'
import ClosetTabApprovedDesignRequests from './ClosetTabApprovedDesignRequests'

interface Props {}

const ClosetTabAll = ({}: Props) => {
  return (
    <div>
      {/* <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Recent" />
        </ClosetSectionHeader>

        <ClosetTabAllRecentGrid />
      </ClosetSection> */}

      {/* <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle
            title="Collections"
            actions={
              <div>
                <ButtonV2 variant="ghost">New collection</ButtonV2>
              </div>
            }
          />
        </ClosetSectionHeader>

        <ClosetTabAllCollections />
      </ClosetSection> */}

      <ClosetTabAllDesignRequests />
      <ClosetTabApprovedDesignRequests />
    </div>
  )
}

export default ClosetTabAll
