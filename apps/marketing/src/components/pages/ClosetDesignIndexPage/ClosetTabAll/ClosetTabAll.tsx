import { gql } from '@apollo/client'
import React from 'react'
import { ClosetTabAllDesignRequestFragment } from '@generated/ClosetTabAllDesignRequestFragment'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import ClosetTabAllRecentGrid from './ClosetTabAllRecentGrid'
import ClosetTabAllCollections from './ClosetTabAllCollections'
import ButtonV2 from '@components/ui/ButtonV2'
import ClosetDesignIndexPageDesignRequestCard from '../ClosetDesignIndexPageDesignRequestCard'

interface Props {
  designRequests: ClosetTabAllDesignRequestFragment[]
}

const ClosetTabAll = ({ designRequests }: Props) => {
  return (
    <div>
      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Recent" />
        </ClosetSectionHeader>

        <ClosetTabAllRecentGrid />
      </ClosetSection>

      <ClosetSection>
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
      </ClosetSection>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Approved Designs" />
        </ClosetSectionHeader>
      </ClosetSection>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Design Requests" />
        </ClosetSectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designRequests.map(designRequest => (
            <ClosetDesignIndexPageDesignRequestCard
              key={designRequest.id}
              designRequest={designRequest}
            />
          ))}
        </div>
      </ClosetSection>
    </div>
  )
}

ClosetTabAll.fragments = {
  designRequest: gql`
    ${ClosetDesignIndexPageDesignRequestCard.fragments.designRequest}
    fragment ClosetTabAllDesignRequestFragment on DesignRequest {
      id
      ...ClosetDesignIndexPageDesignRequestCardDesignRequestFragment
    }
  `,
}

export default ClosetTabAll
