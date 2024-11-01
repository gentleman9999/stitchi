import { gql, useMutation } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { StandoutType, useStandout } from '@components/context'
import { useSnackbar } from '@components/context/snackbar-context'
import useConfirmAction from '@components/hooks/useConfirmAction'
import { TableContainer } from '@components/ui/Table'
import Table from '@components/ui/Table/Table'
import TableZeroState from '@components/ui/Table/TableZeroState'
import { ClosetSettingsTeamPageMembershipFragment } from '@generated/ClosetSettingsTeamPageMembershipFragment'
import {
  ClosetSettingsTeamPageResendInviteMutation,
  ClosetSettingsTeamPageResendInviteMutationVariables,
} from '@generated/ClosetSettingsTeamPageResendInviteMutation'
import {
  ClosetSettingsTeamPageRevokeInviteMutation,
  ClosetSettingsTeamPageRevokeInviteMutationVariables,
} from '@generated/ClosetSettingsTeamPageRevokeInviteMutation'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
import { useLogger } from 'next-axiom'
import React from 'react'
import ClosetSettingsTeamPageTableDesktop from './ClosetSettingsTeamPageTableDesktop'
import ClosetSettingsTeamPageTableMobile from './ClosetSettingsTeamPageTableMobile'

interface Props {
  loading: boolean
  memberships: ClosetSettingsTeamPageMembershipFragment[] | null | undefined
}

const ClosetSettingsTeamPage = ({ loading, memberships }: Props) => {
  const logger = useLogger()
  const { setStandout } = useStandout()
  const { enqueueSnackbar } = useSnackbar()
  const { can } = useAuthorizedComponent()

  const [resendInvite] = useMutation<
    ClosetSettingsTeamPageResendInviteMutation,
    ClosetSettingsTeamPageResendInviteMutationVariables
  >(RESEND_INVITE)

  const [revokeInvite] = useMutation<
    ClosetSettingsTeamPageRevokeInviteMutation,
    ClosetSettingsTeamPageRevokeInviteMutationVariables
  >(REVOKE_INVITE, {
    update(cache, { data }) {
      const membership = data?.membershipInviteRevoke?.membership

      if (membership) {
        cache.evict({
          id: cache.identify({ ...membership }),
        })

        cache.gc()
      }
    },
  })

  const handleResendInvite = async (membership: {
    id: string
    invitedEmail: string | null
  }) => {
    try {
      await resendInvite({
        variables: {
          input: {
            membershipId: membership.id,
          },
        },
      })

      enqueueSnackbar({
        title: `Invite for ${membership.invitedEmail} has been resent`,
      })
    } catch (error) {
      logger.error(`Error resending invite to member ${membership.id}`, {
        context: { error, membership },
      })

      enqueueSnackbar({
        title: 'Error resending invite',
        description: 'Please try again or contact support.',
        severity: 'error',
      })
    }
  }

  const { confirm: handleRevokeInvite, ConfirmDialog } = useConfirmAction(
    async (membership: { id: string; invitedEmail: string | null }) => {
      try {
        await revokeInvite({
          variables: {
            input: {
              membershipId: membership.id,
            },
          },
        })

        enqueueSnackbar({
          title: `Invitation for ${membership.invitedEmail} has been revoked`,
        })
      } catch (error) {
        logger.error(`Error revoking invite to member ${membership.id}`, {
          context: { error, membership },
        })

        enqueueSnackbar({
          title: 'Error revoking invite',
          description: 'Please try again or contact support.',
          severity: 'error',
        })
      }
    },
  )

  return (
    <>
      <ConfirmDialog
        renderTitle={({ invitedEmail }) =>
          `Are you sure you want to revoke ${invitedEmail}'s invite?`
        }
        renderMessage={() => "They won't be able to join your workspace."}
      />
      <ClosetPageContainer size="sm">
        <ClosetPageHeader>
          <ClosetPageTitle title="" />
        </ClosetPageHeader>
        <ClosetSection>
          <ClosetSectionHeader>
            <ClosetSectionTitle
              title="Team members"
              description="Manage who has access to this workspace"
              actions={
                <ClosetPageActions
                  actions={
                    can(ScopeResource.Membership, ScopeAction.CREATE)
                      ? [
                          {
                            label: 'Invite people',
                            primary: true,
                            onClick: () => {
                              setStandout({
                                type: StandoutType.UserInvite,
                              })
                            },
                          },
                        ]
                      : []
                  }
                />
              }
            />
          </ClosetSectionHeader>

          <TableContainer loading={loading}>
            {!memberships?.length ? (
              <TableZeroState />
            ) : (
              <>
                <div className="hidden md:block">
                  <ClosetSettingsTeamPageTableDesktop
                    memberships={memberships}
                    onResendInvite={handleResendInvite}
                    onRevokeInvite={handleRevokeInvite}
                  />
                </div>

                <div className="md:hidden">
                  <ClosetSettingsTeamPageTableMobile
                    memberships={memberships}
                  />
                </div>
              </>
            )}
          </TableContainer>
        </ClosetSection>
      </ClosetPageContainer>
    </>
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

const RESEND_INVITE = gql`
  mutation ClosetSettingsTeamPageResendInviteMutation(
    $input: MembershipInviteResendInput!
  ) {
    membershipInviteResend(input: $input) {
      membership {
        id
      }
    }
  }
`

const REVOKE_INVITE = gql`
  mutation ClosetSettingsTeamPageRevokeInviteMutation(
    $input: MembershipInviteRevokeInput!
  ) {
    membershipInviteRevoke(input: $input) {
      membership {
        id
      }
    }
  }
`

export default ClosetSettingsTeamPage
