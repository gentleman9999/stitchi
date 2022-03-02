import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import { Button, Logo, RadioSelect, TextField } from 'ui'
import { object, string, SchemaOf } from 'yup'
import type { FormInput } from 'pages/api/form-response'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import makeApi from '@lib/api'
import StartPageSeo from './StartPageSeo'

const schema: SchemaOf<FormInput> = object({
  email: string().email().required(),
  first_name: string().optional(),
  last_name: string().optional(),
  company: string().optional(),
  phone: string().optional(),
  description: string().optional(),
  budget: string().optional(),
})

export interface StartPageProps {
  onSubmit: (data: FormInput) => void
}

const StartPage = (props: StartPageProps) => {
  const [api] = React.useState(makeApi())
  const form = useForm<FormInput>({ resolver: yupResolver(schema) })
  const [loading, setLoading] = React.useState(false)

  const { control, formState } = form

  const handleSubmit = form.handleSubmit(async data => {
    setLoading(true)
    try {
      console.info('Starting to submit contact form')
      await api.formResponse.create(data)
      console.info('Successfully submitted contact form')
      props.onSubmit(data)
    } catch (e) {
      console.error('Error submitting contact form', { context: { error: e } })
    } finally {
      setLoading(false)
    }
  })

  return (
    <>
      <StartPageSeo />
      <div>
        <div className="lg:absolute lg:inset-0">
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover lg:absolute lg:h-full"
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-32 lg:grid lg:grid-cols-2">
          <div className="lg:pr-8">
            <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
              <Link href={routes.internal.home.href()}>
                <a className="inline-block">
                  <Logo width="80px" />
                </a>
              </Link>
              <h1 className="mt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let&apos;s work together
              </h1>
              <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                We&apos;d love to hear from you! Send us a message using the
                form opposite, or email us. We&apos;d love to hear from you!
                Send us a message using the form opposite, or email us.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First name"
                      autoComplete="given-name"
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
                      label="How can we help you?"
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
                      label="Expected budget"
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

                <div>
                  {Object.keys(formState.errors).length > 0 && <div> </div>}
                </div>

                <div className="text-right sm:col-span-2">
                  <Button type="submit" color="brandPrimary" loading={loading}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StartPage
