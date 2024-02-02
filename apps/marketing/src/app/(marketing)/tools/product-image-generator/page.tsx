import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  width: yup.number().min(1).required(),
  height: yup.number().min(1).required(),
})

interface Props {}

const Page = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      width: 1200,
      height: 630,
    },
  })

  const handleSubmit = form.handleSubmit(async data => {})

  return null
}

export default Page
