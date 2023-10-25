import { gql, useMutation } from '@apollo/client'
import { Section } from '@components/common'
import { Button, Container } from '@components/ui'
import { SubscriberListEnum } from '@generated/globalTypes'
import {
  GuideShowPageMarketingSubscribeMutation,
  GuideShowPageMarketingSubscribeMutationVariables,
} from '@generated/GuideShowPageMarketingSubscribeMutation'
import { yupResolver } from '@hookform/resolvers/yup'
import routes from '@lib/routes'
import { useLogger } from 'next-axiom'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email().required(),
})

const Pricing = () => {
  const logger = useLogger()
  const [downloading, setDownloading] = React.useState(false)
  const form = useForm<yup.Asserts<typeof schema>>({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
  })

  const [createSubscriber] = useMutation<
    GuideShowPageMarketingSubscribeMutation,
    GuideShowPageMarketingSubscribeMutationVariables
  >(MARKETING_SUBSCRIBE)

  const handleSubmit = form.handleSubmit(async data => {
    setDownloading(true)
    try {
      const response = await fetch(
        routes.api.downloads.studentEbook.show.href(),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: data.email }),
        },
      )

      if (!response.ok) {
        throw new Error('Error downloading PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'student-merch-business-guide.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)

      await createSubscriber({
        variables: {
          input: {
            email: data.email,
            lists: [SubscriberListEnum.STUDENT_MERCH_DOWNLOAD],
          },
        },
      })
    } catch (error) {
      logger.error('Error downloading PDF', { error })
    } finally {
      setDownloading(false)
    }
  })

  return (
    <Section
      id="pricing"
      label="Free preview"
      gutter="lg"
      className="scroll-mt-14 bg-primary sm:scroll-mt-32"
    >
      <div className="overflow-hidden lg:relative">
        <Container className="!max-w-4xl relative grid grid-cols-1 items-end gap-y-12 lg:static lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-5xl font-extrabold tracking-tight text-gray-900 sm:w-3/4 sm:text-6xl md:w-2/3 lg:w-auto">
              Get the free guide
            </h2>
            <p className="mt-4 text-lg tracking-tight text-gray-900">
              Enter your email address and I’ll send you the eBook for free.
            </p>
          </div>
          <form className="lg:pl-16 sm:py-2" onSubmit={handleSubmit}>
            <h3 className="text-base font-medium tracking-tight text-gray-900">
              Get the entire guide straight to your inbox{' '}
              <span aria-hidden="true">&rarr;</span>
            </h3>
            <div className="mt-4 sm:relative sm:flex sm:items-center sm:py-1 sm:pr-1.5">
              <div className="relative sm:static sm:flex-auto">
                <input
                  required
                  type="email"
                  aria-label="Email address"
                  placeholder="Email address"
                  autoComplete="email"
                  className="peer relative z-10 w-full appearance-none bg-transparent px-4 py-2 text-base text-gray-900 placeholder:text-gray-900/70 focus:outline-none sm:py-3 border-none focus:ring-0"
                  {...form.register('email')}
                />
                <div className="absolute inset-0 rounded-md border border-gray-900/20 peer-focus:border-bg-gray-50/20 peer-focus:bg-gray-50/20 peer-focus:ring-2 peer-focus:ring-gray-50 peer-focus:border-transparent" />
              </div>
              <Button
                type="submit"
                variant="flat"
                className="mt-4 w-full sm:relative sm:z-10 sm:mt-0 sm:w-auto sm:flex-none"
                loading={downloading}
              >
                Download
              </Button>
            </div>
            {form.formState.errors.email ? (
              <span className="text-xs text-red-500">
                {form.formState.errors.email.message}
              </span>
            ) : null}
          </form>
        </Container>
      </div>
    </Section>
  )
}

const MARKETING_SUBSCRIBE = gql`
  mutation GuideShowPageMarketingSubscribeMutation(
    $input: SubscriberCreateInput!
  ) {
    subscriberCreate(input: $input) {
      subscriber {
        id
      }
    }
  }
`

export default Pricing
