import { gql, useMutation } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import FormSection from '@components/pages/ClosetDesignBuyPage/FormSection'
import Button from '@components/ui/ButtonV2/Button'
import Dialog from '@components/ui/Dialog'
import { InputGroup, TextField } from '@components/ui/inputs'
import {
  UserInviteDialogInviteMemberMutation,
  UserInviteDialogInviteMemberMutationVariables,
} from '@generated/UserInviteDialogInviteMemberMutation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLogger } from 'next-axiom'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useSnackbar } from '../snackbar-context'

const schema = yup.object().shape({
  emails: yup.array().of(yup.string().email().required()).required(),
})

interface Props {
  open: boolean
  onClose: () => void
}

const UserInviteDialog = ({ open, onClose }: Props) => {
  const logger = useLogger()
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = React.useState(false)
  const form = useForm({
    defaultValues: {
      emails: [],
    },
    resolver: yupResolver(schema),
  })

  const [inviteUser, inviteUserMutation] = useMutation<
    UserInviteDialogInviteMemberMutation,
    UserInviteDialogInviteMemberMutationVariables
  >(INVITE_MEMBER, {
    update(cache, { data }) {
      const organizationId =
        data?.membershipInvite?.memberships?.[0].organizationId

      if (!organizationId) return

      cache.evict({
        id: cache.identify({ __typename: 'Organization', id: organizationId }),
        fieldName: 'memberships',
      })
    },
  })

  const handleSubmit = form.handleSubmit(async values => {
    setLoading(true)

    try {
      await inviteUser({
        variables: {
          input: {
            emails: values.emails,
          },
        },
      })

      onClose()
      enqueueSnackbar({
        title: 'Invites sent',
        description: `Invited members have been notified by email to join ${process.env.NEXT_PUBLIC_COMPANY_NAME}.`,
      })
    } catch (error) {
      logger.error('failed to notify members', { error })
    } finally {
      setLoading(false)
    }
  })

  return (
    <form>
      <Dialog size="md" open={open} onClose={onClose}>
        <Dialog.Title>Invite to your workspace</Dialog.Title>
        <Dialog.Content dividers>
          <FormSection>
            <ComponentErrorMessage error={inviteUserMutation.error} />
            <Controller
              name="emails"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <InputGroup
                    label="Email"
                    error={
                      form.formState.errors.emails?.message ||
                      form.formState.errors.emails
                        ?.map?.(emailErr => emailErr?.message)
                        .join(', ') ||
                      fieldState.error?.message
                    }
                  >
                    <TextField
                      multiline
                      placeholder="example@example.com, example2@example.com..."
                      inputRef={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={event =>
                        field.onChange(
                          event.target.value.replaceAll(' ', '').split(','),
                        )
                      }
                    />
                  </InputGroup>
                )
              }}
            />
          </FormSection>
        </Dialog.Content>
        <Dialog.Actions>
          <div className="flex gap-4 justify-end">
            <Button variant="naked" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button
              color="brandPrimary"
              loading={loading}
              onClick={handleSubmit}
            >
              Send invites
            </Button>
          </div>
        </Dialog.Actions>
      </Dialog>
    </form>
  )
}

const INVITE_MEMBER = gql`
  mutation UserInviteDialogInviteMemberMutation(
    $input: MembershipInviteInput!
  ) {
    membershipInvite(input: $input) {
      memberships {
        id
        organizationId
      }
    }
  }
`

export default UserInviteDialog
