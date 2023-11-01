import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import * as RadioGroup from '@radix-ui/react-radio-group'
import currency from 'currency.js'
import { RangeSlider } from '@components/ui/inputs'

const schema = yup.object({
  campusPopulation: yup.number().min(0).required(),
  campusInterest: yup.number().min(0).max(4).required(),
  avgOrderValue: yup.number().min(0).required(),
})

type Input = yup.Asserts<typeof schema>

const calculate = ({
  avgOrderValue,
  campusInterest,
  campusPopulation,
}: Input) => {
  const campusInterestFactor =
    {
      1: 0.1,
      2: 0.25,
      3: 0.4,
      4: 0.5,
    }[campusInterest] || 0.5

  const marketSize = Math.floor(campusPopulation * campusInterestFactor)

  const revenue = marketSize * avgOrderValue

  return {
    marketSize,
    revenue,
  }
}

const defaultValues = {
  campusPopulation: 50_000,
  campusInterest: 3,
  avgOrderValue: 100_00,
}

interface Props {}

const CampusMarketSizeCalculator = ({}: Props) => {
  const [market, setMarket] = React.useState(calculate(defaultValues))

  const form = useForm<Input>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const [avgOrderValue, campusPopulation, campusInterest] = form.watch([
    'avgOrderValue',
    'campusPopulation',
    'campusInterest',
  ])

  React.useEffect(() => {
    setMarket(calculate({ avgOrderValue, campusPopulation, campusInterest }))
  }, [avgOrderValue, campusInterest, campusPopulation])

  return (
    <div className="flex not-prose">
      <div className="bg-gray-50 rounded-md p-2 sm:p-3 md:p-4 lg:p-6 border">
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="campusInterest" className="text-sm font-bold">
                Campus organization engagement
              </label>
              <Controller
                control={form.control}
                name="campusInterest"
                render={({ field, fieldState }) => (
                  <>
                    <RadioGroup.Root
                      value={field.value.toString()}
                      defaultValue={field.value.toString()}
                      onValueChange={v => field.onChange(parseInt(v))}
                      className="flex flex-row gap-2"
                    >
                      {[
                        { value: '1', label: 'Low (<20%)' },
                        { value: '2', label: 'Medium (20-40%)' },
                        { value: '3', label: 'High (40-60%)' },
                        { value: '4', label: 'Exceptional (60%+)' },
                      ].map((item, i) => (
                        <RadioGroup.Item
                          key={i}
                          value={item.value}
                          className="flex items-center p-1 border rounded-md text-xs data-[state=checked]:outline-none data-[state=checked]:ring-2 data-[state=checked]:ring-offset-1 data-[state=checked]:ring-gray-700"
                        >
                          {item.label}
                        </RadioGroup.Item>
                      ))}
                    </RadioGroup.Root>
                    {fieldState.error ? (
                      <span className="text-sm text-red-500">
                        {fieldState.error?.message}
                      </span>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div>
              <label htmlFor="campusPopulation" className="text-sm font-bold">
                Campus Population
              </label>
              <Controller
                control={form.control}
                name="campusPopulation"
                render={({ field, fieldState }) => (
                  <>
                    <RangeSlider
                      value={field.value}
                      onChange={field.onChange}
                      min={24}
                      max={80_000}
                    />
                    {fieldState.error ? (
                      <span className="text-sm text-red-500">
                        {fieldState.error?.message}
                      </span>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div>
              <label htmlFor="avgOrderValue" className="text-sm font-bold">
                Average Yearly Order Value
              </label>
              <Controller
                control={form.control}
                name="avgOrderValue"
                render={({ field, fieldState }) => (
                  <>
                    <RangeSlider
                      value={currency(field.value, {
                        fromCents: true,
                      }).dollars()}
                      onChange={v => field.onChange(v * 100)}
                      min={1}
                      max={200}
                      renderValue={v => currency(v).format()}
                    />
                    {fieldState.error ? (
                      <span className="text-sm text-red-500">
                        {fieldState.error?.message}
                      </span>
                    ) : null}
                  </>
                )}
              />
            </div>
          </div>

          <hr />
          <div className="">
            <div>
              <span className="text-4xl font-medium">
                {currency(market.revenue, {
                  fromCents: true,
                }).format()}
              </span>
              <span className="ml-1 text-gray-500">revenue</span>
            </div>
            <div>
              <span className="text-2xl font-medium">
                {market.marketSize.toLocaleString()}
              </span>
              <span className="ml-1 text-gray-500">customers</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CampusMarketSizeCalculator
