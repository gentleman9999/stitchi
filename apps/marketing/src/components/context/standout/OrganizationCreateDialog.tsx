import { gql, useMutation } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import useSetUserMembership from '@components/hooks/useSetUserMembership'
import FormSection from '@components/pages/ClosetDesignBuyPage/FormSection'
import Button from '@components/ui/ButtonV2/Button'
import Dialog from '@components/ui/Dialog'
import { InputGroup, TextField } from '@components/ui/inputs'
import {
  OrganizationCreateDialogCreateOrganizationMutation,
  OrganizationCreateDialogCreateOrganizationMutationVariables,
} from '@generated/OrganizationCreateDialogCreateOrganizationMutation'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
})

type FormValues = yup.InferType<typeof schema>

export interface Props {
  open: boolean
  onClose: () => void
  redirectUrl?: string
}

const OrganizationCreateDialog = ({ open, onClose, redirectUrl }: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [setUserMembership] = useSetUserMembership()

  const form = useForm<FormValues>({
    defaultValues: {
      name: undefined,
    },
    resolver: yupResolver(schema),
  })

  const [createOrganization, { error }] = useMutation<
    OrganizationCreateDialogCreateOrganizationMutation,
    OrganizationCreateDialogCreateOrganizationMutationVariables
  >(CREATE_ORGANIZATION)

  const handleSubmit = form.handleSubmit(async values => {
    setLoading(true)
    try {
      const { data } = await createOrganization({
        variables: {
          input: {
            name: values.name,
          },
        },
      })

      const { membership, organization } = data?.userOrganizationCreate || {}

      if (membership && organization) {
        await setUserMembership({
          membershipId: membership.id,
          organizationId: organization.id,
        })

        if (redirectUrl) {
          window.location.replace(redirectUrl)
        } else {
          window.location.reload()
        }
      }
    } finally {
      setLoading(false)
    }
  })

  return (
    <Dialog
      size="sm"
      open={open}
      onClose={() => onClose()}
      className="text-center"
    >
      <Dialog.Icon />
      <Dialog.Title>Create new account</Dialog.Title>
      <Dialog.Content>
        <Dialog.ContentText>
          <ComponentErrorMessage error={error} />
          <form onSubmit={handleSubmit}>
            <FormSection>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputGroup
                    label="Account name"
                    error={fieldState.error?.message}
                  >
                    <TextField
                      placeholder="Company"
                      inputRef={field.ref}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </InputGroup>
                )}
              />

              <InputGroup>
                <div className="flex gap-4 justify-end">
                  <Button variant="naked" onClick={() => onClose()}>
                    Cancel
                  </Button>
                  <Button type="submit" color="brandPrimary" loading={loading}>
                    Create account
                  </Button>
                </div>
              </InputGroup>
            </FormSection>
          </form>
        </Dialog.ContentText>
      </Dialog.Content>
    </Dialog>
  )
}

const CREATE_ORGANIZATION = gql`
  mutation OrganizationCreateDialogCreateOrganizationMutation(
    $input: UserOrganizationCreateInput!
  ) {
    userOrganizationCreate(input: $input) {
      organization {
        id
      }
      membership {
        id
      }
    }
  }
`

export default OrganizationCreateDialog
