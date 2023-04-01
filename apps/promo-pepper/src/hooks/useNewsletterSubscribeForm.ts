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
import { useState } from 'react'

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
  const [showSuccess, setShowSuccess] = useState(false)

  let form = useForm<yup.Asserts<typeof schema>>({
    resolver: yupResolver(schema),
  })

  const [subscribe, subscribeMutation] = useMutation<
    UseNewsletterSubscribeMutation,
    UseNewsletterSubscribeMutationVariables
  >(UseNewsletterSubscribe, { client })

  const handleSubmit = form.handleSubmit(async data => {
    const result = await subscribe({
      variables: {
        email: data.email,
      },
    })

    if (result?.data?.subscriberCreate?.subscriber) {
      setShowSuccess(true)

      return result.data.subscriberCreate.subscriber
    }
  })

  return { form, handleSubmit, subscribeMutation } as const
}

const UseNewsletterSubscribe = gql(/* GraphQL */ `
  mutation UseNewsletterSubscribe($email: String!) {
    subscriberCreate(input: { email: $email }) {
      subscriber {
        id
      }
    }
  }
`)
