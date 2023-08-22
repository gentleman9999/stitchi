import { gql } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import ClosetDescriptionList from '@components/common/ClosetDescriptionList'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import UserAvatar from '@components/common/UserAvatar'
import { ClosetSettingsGeneralPageUserFragment } from '@generated/ClosetSettingsGeneralPageUserFragment'
import React from 'react'

interface Props {
  loading: boolean
  user: ClosetSettingsGeneralPageUserFragment | null | undefined
}

const ClosetSettingsGeneralPage = ({ loading, user }: Props) => {
  if (!loading && !user) {
    return <ComponentErrorMessage error="No user found" />
  }

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="" />
      </ClosetPageHeader>
      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle
            title="Profile"
            description="This information will visible be to your team."
          />
        </ClosetSectionHeader>

        <ClosetDescriptionList>
          <Item label="Name" description={user?.name} />
          <Item label="Email" description={user?.email} />
          <Item
            label="Picture"
            description={<UserAvatar user={user} width="w-10" height="h-10" />}
          />
        </ClosetDescriptionList>
      </ClosetSection>
    </ClosetPageContainer>
  )
}

const Item = ({
  label,
  description,
}: {
  label: string
  description: React.ReactNode | null | undefined
}) => {
  return (
    <div className="flex items-center">
      <div className="w-64 font-semibold">{label}</div>
      <div>{description}</div>
    </div>
  )
}

ClosetSettingsGeneralPage.fragments = {
  user: gql`
    ${UserAvatar.fragments.user}
    fragment ClosetSettingsGeneralPageUserFragment on User {
      id
      name
      email
      ...UserAvatarUserFragment
    }
  `,
}

export default ClosetSettingsGeneralPage
