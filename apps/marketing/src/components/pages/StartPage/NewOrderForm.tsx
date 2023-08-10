import React from 'react'
import { Button, RadioSelect, TextField } from '@components/ui'
import { object, string, Asserts } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import makeApi from '@lib/api'
import { useRouter } from 'next/router'
import routes from '@lib/routes'
import { ComponentErrorMessage } from '@components/common'

const schema = object({
  email: string().email().required(),
  first_name: string().optional().defined(),
  last_name: string().optional().defined(),
  company: string().optional().defined(),
  phone: string().optional().defined(),
  description: string().optional().defined(),
  budget: string().optional().defined(),
})

const NewOrderForm = () => {
  const [api] = React.useState(makeApi())
  const form = useForm<Asserts<typeof schema>>({
    resolver: yupResolver(schema),
  })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const router = useRouter()

  const { control, formState } = form

  const handleSubmit = form.handleSubmit(async data => {
    setLoading(true)
    try {
      console.info('Starting to submit contact form')
      await api.formResponse.create(data)
      console.info('Successfully submitted contact form')
      router.push(
        routes.internal.getStarted.success.href({ email: data.email }),
      )
    } catch (e) {
      console.error('Error submitting contact form', { context: { error: e } })
      setError(
        'Something went wrong. Please try again or contact us using one of the alternative methods.',
      )
    } finally {
      setLoading(false)
    }
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 max-w-3xl w-full"
    >
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="First name"
            autoComplete="given-name"
            description={formState.errors.first_name?.message}
            error={Boolean(formState.errors.first_name)}
          />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last name"
            autoComplete="family-name"
            description={formState.errors.last_name?.message}
            error={Boolean(formState.errors.last_name)}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            className="sm:col-span-2"
            label="Email"
            autoComplete="email"
            description={formState.errors.email?.message}
            error={Boolean(formState.errors.email)}
          />
        )}
      />

      <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="sm:col-span-2"
            label="Company"
            autoComplete="organization"
            description={formState.errors.company?.message}
            error={Boolean(formState.errors.company)}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="sm:col-span-2"
            label="Phone"
            autoComplete="tel"
            description={formState.errors.phone?.message}
            error={Boolean(formState.errors.phone)}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            className="sm:col-span-2"
            label="Tell us about your project"
            description={
              formState.errors.description?.message || 'Max. 500 characters'
            }
            error={Boolean(formState.errors.description)}
          />
        )}
      />

      <Controller
        name="budget"
        control={control}
        render={({ field }) => (
          <RadioSelect
            {...field}
            label="What's your budget?"
            options={[
              {
                id: 'budget-under-10k',
                label: 'Less than $10k',
                value: 'under_10k',
              },
              {
                id: 'budget-25k-50-k',
                label: '$10k - $25k',
                value: '10k-25k',
              },
              {
                id: 'budget-25k-75k',
                label: '$25k - $75k',
                value: '25k-75k',
              },
              {
                id: 'budget-over-75k',
                label: '$75k+',
                value: 'over_75k',
              },
            ]}
          />
        )}
      />

      {error ? (
        <div className="sm:col-span-2">
          <ComponentErrorMessage error={error} />
        </div>
      ) : null}

      <div className="text-right sm:col-span-2">
        <Button type="submit" color="brandPrimary" loading={loading}>
          Send message
        </Button>
      </div>
    </form>
  )
}

export default NewOrderForm
