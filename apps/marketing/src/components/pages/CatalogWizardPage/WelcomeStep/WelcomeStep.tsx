import Button from '@components/ui/ButtonV2/Button'
import React from 'react'
import RadioInput from '../RadioInput'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import routes from '@lib/routes'

const schema = yup.object().shape({
  value: yup.mixed().oneOf(['has_product', 'has_no_product']),
})

type FormValues = yup.InferType<typeof schema>

interface Props {}

const WelcomeStep = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async data => {
    setLoading(true)
    switch (data.value) {
      case 'has_product':
        await router.push(routes.internal.catalog.href())
        break
      case 'has_no_product':
        await router.push(routes.internal.catalog.wizard.categories.href())
        break
    }

    setLoading(false)
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-20">
      <p className="text-4xl font-normal text-center">
        Hey there 👋 I&apos;m Kevin and I&apos;ll be helping you choose a
        product for your design. Do you have a specific product in mind?
      </p>

      <div className="flex flex-col gap-20 items-center">
        <Controller
          name="value"
          control={form.control}
          render={({ field }) => {
            return (
              <RadioInput
                value={field.value as any}
                onValueChange={field.onChange}
                items={[
                  {
                    name: 'has_no_product',
                    label: 'Choose a recommended product',
                    value: 'has_no_product',
                  },
                  {
                    name: 'has_product',
                    label: 'I have a specific product in mind',
                    value: 'has_product',
                  },
                ]}
              />
            )
          }}
        />

        <div>
          <Button type="submit" size="xl" loading={loading}>
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}

export default WelcomeStep
