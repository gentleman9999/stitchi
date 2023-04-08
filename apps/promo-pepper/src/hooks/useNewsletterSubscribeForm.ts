'use client'

import { gql } from '@/__generated__'
import {
  UseNewsletterSubscribeMutation,
  UseNewsletterSubscribeMutationVariables,
} from '@/__generated__/graphql'
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { initializeApollo } from '@/lib/apollo'
import { useRouter } from 'next/navigation'
import routes from '@/lib/routes'
import React from 'react'

const client = initializeApollo()

const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .required('Please provide a valid email address')
      .label('Email'),
  })
  .defined()

export default function useNewsletterSubscribeForm() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  let form = useForm<yup.Asserts<typeof schema>>({
    resolver: yupResolver(schema),
  })

  const [subscribe, subscribeMutation] = useMutation<
    UseNewsletterSubscribeMutation,
    UseNewsletterSubscribeMutationVariables
  >(UseNewsletterSubscribe, { client })

  const handleSubmit = form.handleSubmit(async data => {
    try {
      setLoading(true)
      const result = await subscribe({
        variables: {
          email: data.email,
        },
      })

      const subscriber = result?.data?.subscriberCreate?.subscriber

      if (subscriber) {
        await router.push(
          routes.internal.newsletter.welcome.href({
            email: subscriber.email,
          }),
        )
      }
    } catch (e) {
      throw e
    } finally {
      setLoading(false)
    }
  })

  return {
    form,
    handleSubmit,
    submitError: subscribeMutation.error,
    submitLoading: loading,
  } as const
}

const UseNewsletterSubscribe = gql(/* GraphQL */ `
  mutation UseNewsletterSubscribe($email: String!) {
    subscriberCreate(input: { email: $email }) {
      subscriber {
        id
        email
      }
    }
  }
`)
