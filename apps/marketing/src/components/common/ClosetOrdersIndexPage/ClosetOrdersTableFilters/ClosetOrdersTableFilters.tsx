import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import cx from 'classnames'
import DateFilter, {
  schema as dateFilterSchema,
  Equality as DateFilterEquality,
} from './DateFilter'
import { Plus, XIcon } from 'icons'
import * as Popover from '@radix-ui/react-popover'
import { isSameDay, parseISO } from 'date-fns'

enum Filter {
  DATE = 'date',
}

const schema = yup.object().shape({
  [Filter.DATE]: dateFilterSchema.optional(),
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

  const date = form.watch(Filter.DATE)

  React.useEffect(() => {
    onChange({ date })
  }, [onChange, date])

  const handleSubmit = form.handleSubmit(async values => {})

  return (
    <form className="flex gap-4 py-4" onSubmit={handleSubmit}>
      <Popover.Root
        open={filter === Filter.DATE}
        onOpenChange={open => setFilter(open ? Filter.DATE : null)}
      >
        <Popover.Trigger asChild>
          <div
            className={cx(
              'border border-dashed rounded-full px-2 py-0.5 flex items-center gap-1 text-xs text-gray-500 font-semibold cursor-pointer hover:bg-gray-50',
            )}
          >
            <div
              onClick={e => {
                if (date?.gte || date?.lte) {
                  e.stopPropagation()
                  form.setValue(Filter.DATE, {
                    equality: DateFilterEquality.EQUALS,
                  })
                }
              }}
              className="rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center"
            >
              {date?.gte || date?.lte ? (
                <XIcon className="w-3 h-3 text-white stroke-2" />
              ) : (
                <Plus className="w-3 h-3 text-white stroke-2" />
              )}
            </div>
            Date
            {date?.gte || date?.lte ? ` | ` : null}
            {date?.equality &&
            ![DateFilterEquality.EQUALS, DateFilterEquality.BETWEEN].includes(
              date?.equality,
            ) ? (
              <span className="capitalize">{date.equality}</span>
            ) : null}
            {date?.gte ? (
              <span className="text-gray-700">
                {new Date(date.gte).toLocaleDateString()}
              </span>
            ) : null}
            {date?.gte &&
            date?.lte &&
            !isSameDay(parseISO(date.gte), parseISO(date.lte))
              ? ` - `
              : null}
            {date?.lte &&
            (!date.gte ||
              !isSameDay(parseISO(date.gte), parseISO(date.lte))) ? (
              <span className="text-gray-700">
                {new Date(date.lte).toLocaleDateString()}
              </span>
            ) : null}
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            side="bottom"
            align="start"
            className="p-2 bg-paper rounded-md border shadow-magical min-w-[320px]"
          >
            <DateFilter
              onChange={dateFilter => {
                form.setValue(Filter.DATE, dateFilter)
                setFilter(null)
              }}
              defaultValues={date}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </form>
  )
}

export default ClosetOrdersTableFilters
