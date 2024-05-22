import ClosetDescriptionList from '@components/common/ClosetDescriptionList'
import Button from '@components/ui/ButtonV2/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import cx from 'classnames'
import { useAuthorizedComponent } from '@lib/auth'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { TextField } from '@components/ui/inputs'

const schema = yup.object().shape({
  name: yup.string().required(),
})

type FormInput = yup.InferType<typeof schema>

interface Props {
  defaultValues: FormInput
  onSubmit: (data: FormInput) => any | Promise<any>
}

const ClosetSettingsOrganizationForm = ({ defaultValues, onSubmit }: Props) => {
  const { can, loading: authorizationLoading } = useAuthorizedComponent()
  const [loading, setLoading] = React.useState(false)
  const form = useForm<FormInput>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async data => {
    setLoading(true)
    await onSubmit(data)
    setLoading(false)
  })

  const { name } = form.watch()

  return (
    <form onSubmit={handleSubmit}>
      <ClosetDescriptionList>
        <Item
          label="Name"
          description={name}
          loading={loading}
          form={
            !authorizationLoading &&
            can(ScopeResource.Organization, ScopeAction.UPDATE) ? (
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => <TextField {...field} size="sm" />}
              />
            ) : null
          }
        />
        {/* <Item label="Logo" description={<img src="" />} /> */}
      </ClosetDescriptionList>
    </form>
  )
}

const Item = ({
  label,
  description,
  form,
  loading,
}: {
  label: string
  description: React.ReactNode | null | undefined
  form?: React.ReactNode
  loading?: boolean
}) => {
  const [editing, setEditing] = React.useState(false)

  React.useEffect(() => {
    if (!loading) {
      setEditing(false)
    }
  }, [loading])

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-8">
      <div className="w-64 font-semibold">{label}</div>
      <div className="flex sm:items-center gap-8 flex-1">
        <div className="flex-1">
          <div
            className={cx({
              hidden: editing,
            })}
          >
            {description}
          </div>

          <div
            className={cx({
              hidden: !editing,
            })}
          >
            {form}
          </div>
        </div>

        {form ? (
          <div>
            {editing || loading ? (
              <div className="flex gap-4">
                <Button
                  variant="naked"
                  onClick={() => setEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="flat"
                  type="submit"
                  loading={loading}
                  // onClick={() => {
                  //   setLoading(true)
                  //   setTimeout(() => {
                  //     setLoading(false)
                  //     setEditing(false)
                  //   }, 1000)
                  // }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button variant="ghost" onClick={() => setEditing(true)}>
                Update
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ClosetSettingsOrganizationForm
