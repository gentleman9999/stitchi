import React from 'react'
import { Button, RadioSelect, TextField } from 'ui'

interface StartPageProps {}

const StartPage = (props: StartPageProps) => {
  return (
    <div>
      <div className="relative bg-white">
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
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let&apos;s work together
              </h2>
              <p className="mt-4 text-lg text-gray-500 sm:mt-3">
                We&apos;d love to hear from you! Send us a message using the
                form opposite, or email us. We&apos;d love to hear from you!
                Send us a message using the form opposite, or email us.
              </p>
              <form
                action="#"
                method="POST"
                className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <TextField
                  name="first-name"
                  label="First name"
                  autoComplete="given-name"
                />
                <TextField
                  name="last-name"
                  label="Last name"
                  autoComplete="family-name"
                />
                <TextField
                  className="sm:col-span-2"
                  name="email"
                  label="Email"
                  autoComplete="email"
                />
                <TextField
                  className="sm:col-span-2"
                  name="company"
                  label="Company"
                  autoComplete="organization"
                />
                <TextField
                  className="sm:col-span-2"
                  name="phone"
                  label="Phone"
                  description="Optional"
                  autoComplete="tel"
                />
                <TextField
                  multiline
                  className="sm:col-span-2"
                  name="how-can-we-help"
                  label="How can we help you?"
                  description="Max. 500 characters"
                />

                <RadioSelect
                  label="Expected budget"
                  name="budget"
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

                <div className="text-right sm:col-span-2">
                  <Button type="submit" color="brandPrimary">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartPage
