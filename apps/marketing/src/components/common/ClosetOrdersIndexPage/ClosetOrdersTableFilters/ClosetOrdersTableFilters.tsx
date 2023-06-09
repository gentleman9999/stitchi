import { TextField } from '@components/ui'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import cx from 'classnames'
import DateFilter, { schema as dateFilterSchema } from './DateFilter'
import { Plus } from 'icons'

enum Filter {
  DATE = 'date',
}

const schema = yup.object().shape({
  [Filter.DATE]: dateFilterSchema,
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  onChange: (values: FormValues) => void
}

const ClosetOrdersTableFilters = ({ onChange }: Props) => {
  const [filter, setFilter] = React.useState<Filter | null>(null)

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const values = form.watch()

  React.useEffect(() => {
    onChange(values)
  }, [onChange, values])

  const handleSubmit = form.handleSubmit(async values => {})

  return (
    <form className="flex gap-4 py-4" onSubmit={handleSubmit}>
      <button
        className={cx(
          'border border-dashed rounded-full px-2 py-0.5 flex items-center gap-1 text-xs text-gray-500 font-semibold',
        )}
        onClick={() =>
          setFilter(prev => (prev === Filter.DATE ? null : Filter.DATE))
        }
      >
        <div className="rounded-full bg-gray-500 flex items-center justify-center">
          <Plus className="w-3 h-3 text-white stroke-2" />
        </div>
        Date
      </button>
      {filter === Filter.DATE && (
        <DateFilter
          onChange={dateFilter => {
            form.setValue(Filter.DATE, dateFilter)
          }}
          defaultValues={values.date}
        />
      )}
    </form>
  )
}

export default ClosetOrdersTableFilters
