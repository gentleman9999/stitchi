import { gql } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import Table from '@components/ui/Table/Table'
import TableZeroState from '@components/ui/Table/TableZeroState'
import { ClosetSettingsTeamPageMembershipFragment } from '@generated/ClosetSettingsTeamPageMembershipFragment'
import React from 'react'
import ClosetSettingsTeamPageTableDesktop from './ClosetSettingsTeamPageTableDesktop'
import ClosetSettingsTeamPageTableMobile from './ClosetSettingsTeamPageTableMobile'

interface Props {
  loading: boolean
  memberships: ClosetSettingsTeamPageMembershipFragment[] | null | undefined
}

const ClosetSettingsTeamPage = ({ loading, memberships }: Props) => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="" />
      </ClosetPageHeader>
      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle
            title="Team members"
            actions={
              <ClosetPageActions
                actions={[
                  {
                    label: 'Add user',
                    primary: true,
                    href: '',
                  },
                ]}
              />
            }
            // description="This information will be to your team."
          />
        </ClosetSectionHeader>

        <Table loading={loading}>
          {!memberships?.length ? (
            <TableZeroState />
          ) : (
            <>
              <div className="hidden md:block">
                <ClosetSettingsTeamPageTableDesktop memberships={memberships} />
              </div>

              <div className="md:hidden">
                <ClosetSettingsTeamPageTableMobile memberships={memberships} />
              </div>
            </>
          )}
        </Table>
      </ClosetSection>
    </ClosetPageContainer>
  )
}

ClosetSettingsTeamPage.fragments = {
  membership: gql`
    ${ClosetSettingsTeamPageTableDesktop.fragments.membership}
    ${ClosetSettingsTeamPageTableMobile.fragments.member}
    fragment ClosetSettingsTeamPageMembershipFragment on Membership {
      id
      ...ClosetSettingsTeamPageTableMobileMemberFragment
      ...ClosetSettingsTeamPageTableDesktopMembershipFragment
    }
  `,
}

export default ClosetSettingsTeamPage
