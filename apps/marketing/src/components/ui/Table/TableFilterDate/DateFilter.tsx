import ComponentErrorMessage from '@components/common/ComponentErrorMessage'
import { Button } from '@components/ui'
import DateInput from '@components/ui/inputs/Date'
import Select from '@components/ui/inputs/Select'
import { yupResolver } from '@hookform/resolvers/yup'
import useTimeZone from '@components/hooks/useTimeZone'
import { addDays, endOfDay, parseISO, startOfDay, subDays } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export enum Equality {
  EQUALS = 'equals',
  BETWEEN = 'between',
  GT = 'after',
  GTE = 'on or after',
  LT = 'before',
  LTE = 'on or before',
}

const dateInputProps = { maxDate: new Date() }

const schema = yup.object().shape({
  equality: yup.string().oneOf(Object.values(Equality)).required(),
  gte: yup.string().optional(),
  lte: yup.string().optional(),
})

export type DateFilterValue = yup.InferType<typeof schema>

interface Props {
  defaultValues?: Partial<DateFilterValue>
  onChange: (values: DateFilterValue) => Promise<void> | void
}

const DateEquality = (props: Props) => {
  const { timeZone } = useTimeZone()

  const form = useForm<DateFilterValue>({
    defaultValues: { equality: Equality.EQUALS, ...props.defaultValues },
    resolver: yupResolver(schema),
  })

  const [equality, gte, lte] = form.watch(['equality', 'gte', 'lte'])

  const handleSubmit = form.handleSubmit(async ({ gte, lte, equality }) => {
    switch (equality) {
      case Equality.EQUALS: {
        await props.onChange({
          equality,
          gte: gte
            ? zonedTimeToUtc(startOfDay(parseISO(gte)), timeZone).toISOString()
            : undefined,
          lte: gte
            ? zonedTimeToUtc(endOfDay(parseISO(gte)), timeZone).toISOString()
            : undefined,
        })

        break
      }
      case Equality.BETWEEN: {
        await props.onChange({
          equality,
          gte: gte ? startOfDay(parseISO(gte)).toISOString() : undefined,
          lte: lte ? startOfDay(parseISO(lte)).toISOString() : undefined,
        })

        break
      }

      case Equality.GT: {
        await props.onChange({
          equality,
          gte: gte
            ? startOfDay(addDays(parseISO(gte), 1)).toISOString()
            : undefined,
        })

        break
      }

      case Equality.GTE: {
        await props.onChange({
          equality,
          gte: gte ? startOfDay(parseISO(gte)).toISOString() : undefined,
        })

        break
      }

      case Equality.LT: {
        await props.onChange({
          equality,
          lte: lte
            ? endOfDay(subDays(parseISO(lte), 1)).toISOString()
            : undefined,
        })

        break
      }

      case Equality.LTE: {
        await props.onChange({
          equality,
          lte: lte ? endOfDay(parseISO(lte)).toISOString() : undefined,
        })

        break
      }

      default: {
        await props.onChange({
          equality,
          lte: undefined,
          gte: undefined,
        })
      }
    }
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {/* Register all filter fields */}
      <input hidden readOnly {...form.register('gte')} />
      <input hidden readOnly {...form.register('lte')} />

      <span className="text-sm font-semibold text-gray-800">
        Equality by Date
      </span>
      <Controller
        name="equality"
        control={form.control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { label: 'Is equal to', value: Equality.EQUALS },
              { label: 'Is between', value: Equality.BETWEEN },
              { label: 'Is after', value: Equality.GT },
              { label: 'Is on or after', value: Equality.GTE },
              { label: 'Is before', value: Equality.LT },
              { label: 'Is on or before', value: Equality.LTE },
            ]}
          />
        )}
      />

      <div className="flex items-center gap-2">
        {[Equality.BETWEEN].includes(equality) && (
          <>
            <Controller
              name="gte"
              control={form.control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  {...dateInputProps}
                  maxDate={lte ? parseISO(lte) : dateInputProps.maxDate}
                />
              )}
            />
            <span className="text-xs text-gray-500">and</span>
            <Controller
              name="lte"
              control={form.control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  {...dateInputProps}
                  minDate={gte ? parseISO(gte) : undefined}
                />
              )}
            />
          </>
        )}

        {[Equality.GT, Equality.GTE, Equality.EQUALS].includes(equality) && (
          <Controller
            name="gte"
            control={form.control}
            render={({ field }) => <DateInput {...field} {...dateInputProps} />}
          />
        )}

        {[Equality.LT, Equality.LTE].includes(equality) && (
          <Controller
            name="lte"
            control={form.control}
            render={({ field }) => <DateInput {...field} {...dateInputProps} />}
          />
        )}
      </div>

      <ComponentErrorMessage
        error={Object.values(form.formState.errors)
          .map(value => value.message)
          .join(', ')}
      />

      <Button slim type="submit" color="brandPrimary">
        Apply
      </Button>
    </form>
  )
}

export default DateEquality
