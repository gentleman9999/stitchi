import FormSection from '@components/pages/ClosetDesignBuyPage/FormSection'
import { Dialog, InputGroup, TextField } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  emails: yup.array().of(yup.string().email().required()).required(),
})

interface Props {
  open: boolean
  onClose: () => void
}

const UserInviteDialog = ({ open, onClose }: Props) => {
  const [loading, setLoading] = React.useState(false)
  const form = useForm({
    defaultValues: {
      emails: [],
    },
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async values => {
    setLoading(true)

    try {
    } catch (error) {
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Dialog size="md" open={open} onClose={onClose}>
        <Dialog.Title>Invite to your workspace</Dialog.Title>
        <Dialog.Content dividers>
          <FormSection>
            <Controller
              name="emails"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputGroup label="Email" error={fieldState.error?.message}>
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
              )}
            />
          </FormSection>
        </Dialog.Content>
        <Dialog.Actions>
          <div className="flex gap-4 justify-end">
            <Button variant="naked" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button type="submit" color="brandPrimary" loading={loading}>
              Send invites
            </Button>
          </div>
        </Dialog.Actions>
      </Dialog>
    </form>
  )
}

export default UserInviteDialog
