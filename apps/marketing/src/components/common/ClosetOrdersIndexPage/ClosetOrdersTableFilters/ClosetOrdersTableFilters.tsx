import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import cx from 'classnames'
import DateFilter, { schema as dateFilterSchema } from './DateFilter'
import { Plus } from 'icons'
import * as Popover from '@radix-ui/react-popover'

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
      <Popover.Root
        open={filter === Filter.DATE}
        onOpenChange={open => setFilter(open ? Filter.DATE : null)}
      >
        <Popover.Trigger asChild>
          <button
            className={cx(
              'border border-dashed rounded-full px-2 py-0.5 flex items-center gap-1 text-xs text-gray-500 font-semibold',
            )}
          >
            <div className="rounded-full bg-gray-500 flex items-center justify-center">
              <Plus className="w-3 h-3 text-white stroke-2" />
            </div>
            Date
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={4}
            className="p-2 bg-paper rounded-md border shadow-magical"
          >
            <DateFilter
              onChange={dateFilter => {
                form.setValue(Filter.DATE, dateFilter)
              }}
              defaultValues={values.date}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </form>
  )
}

export default ClosetOrdersTableFilters
