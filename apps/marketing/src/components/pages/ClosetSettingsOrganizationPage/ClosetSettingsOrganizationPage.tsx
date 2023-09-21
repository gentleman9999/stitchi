import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import ClosetDescriptionList from '@components/common/ClosetDescriptionList'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { LoadingDots } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import { ClosetSettingsOrganizationPageOrganizationFragment } from '@generated/ClosetSettingsOrganizationPageOrganizationFragment'
import React from 'react'
import ClosetSettingsOrganizationForm from './ClosetSettingsOrganizationForm'
import useClosetSettingsOrganizationPage from './useClosetSettingsOrganizationPage'

interface Props {
  loading: boolean
  organization:
    | ClosetSettingsOrganizationPageOrganizationFragment
    | null
    | undefined
}

const ClosetSettingsOrganizationPage = ({ organization, loading }: Props) => {
  const { handleUpdateOrganization } = useClosetSettingsOrganizationPage()

  return (
    <ClosetPageContainer size="sm">
      <ClosetPageHeader>
        <ClosetPageTitle title="" />
      </ClosetPageHeader>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle
            title="Organization"
            description="This information is visible to your team."
          />
        </ClosetSectionHeader>

        {loading ? (
          <LoadingDots />
        ) : organization ? (
          <ClosetSettingsOrganizationForm
            onSubmit={async input =>
              handleUpdateOrganization({
                organizationId: organization.id,
                name: input.name,
              })
            }
            defaultValues={{
              name: organization.name || '',
            }}
          />
        ) : (
          <ComponentErrorMessage error="Organization failed to load" />
        )}
      </ClosetSection>
    </ClosetPageContainer>
  )
}

ClosetSettingsOrganizationPage.fragments = {
  organization: gql`
    fragment ClosetSettingsOrganizationPageOrganizationFragment on Organization {
      id
      name
    }
  `,
}

export default ClosetSettingsOrganizationPage
