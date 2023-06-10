import { Button } from '@components/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export const schema = yup.object().shape({
  equals: yup.string(),
  gt: yup.string(),
  gte: yup.string(),
  lt: yup.string(),
  lte: yup.string(),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  defaultValues?: Partial<FormValues>
  onChange: (values: FormValues) => Promise<void> | void
}

const DateFilter = (props: Props) => {
  const form = useForm<FormValues>({
    defaultValues: props.defaultValues,
    resolver: yupResolver(schema),
  })

  const handleSubmit = form.handleSubmit(async values => {
    await props.onChange(values)
  })

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" slim>
        Apply
      </Button>
    </form>
  )
}

export default DateFilter
