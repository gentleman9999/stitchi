import { TextField } from '@components/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  search: yup.string().required(),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  onChange: (values: FormValues) => void
}

const ClosetOrdersTableFilters = ({ onChange }: Props) => {
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      search: '',
    },
  })

  const values = form.watch()

  React.useEffect(() => {
    onChange(values)
  }, [onChange, values])

  return (
    <form className="flex gap-4 py-4">
      <Controller
        name="search"
        control={form.control}
        render={({ field }) => (
          <TextField {...field} placeholder="Search" inputRef={field.ref} />
        )}
      />
    </form>
  )
}

export default ClosetOrdersTableFilters
