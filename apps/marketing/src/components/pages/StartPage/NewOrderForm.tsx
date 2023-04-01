import React from 'react'
import { Button, RadioSelect, TextField } from '@components/ui'
import { object, string, Asserts } from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import makeApi from '@lib/api'
import { useRouter } from 'next/router'
import routes from '@lib/routes'

const schema = object({
  email: string().email().required(),
  first_name: string().optional(),
  last_name: string().optional(),
  company: string().optional(),
  phone: string().optional(),
  description: string().optional(),
  budget: string().optional(),
})

const NewOrderForm = () => {
  const [api] = React.useState(makeApi())
  const form = useForm<Asserts<typeof schema>>({
    resolver: yupResolver(schema),
  })
  const [loading, setLoading] = React.useState(false)

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
          <TextField {...field} label="First name" autoComplete="given-name" />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Last name" autoComplete="family-name" />
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
            description="Max. 500 characters"
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
                id: 'budget-under-25k',
                label: 'Less than $25k',
                value: 'under_25k',
              },
              {
                id: 'budget-25k-50-k',
                label: '$25k - $50k',
                value: '25k-50k',
              },
              {
                id: 'budget-50k-100k',
                label: '$50k - $100k',
                value: '50k-100k',
              },
              {
                id: 'budget-over-100k',
                label: '$100k+',
                value: 'over_100k',
              },
            ]}
          />
        )}
      />

      <div>{Object.keys(formState.errors).length > 0 && <div> </div>}</div>

      <div className="text-right sm:col-span-2">
        <Button type="submit" color="brandPrimary" loading={loading}>
          Send message
        </Button>
      </div>
    </form>
  )
}

export default NewOrderForm
