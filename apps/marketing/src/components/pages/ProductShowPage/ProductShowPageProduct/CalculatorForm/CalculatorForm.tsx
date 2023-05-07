import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button, RangeSlider, Skeleton, TextField } from '@components/ui'
import useCalculatorFormQuote from './useCalculatorFormQuote'
import currency from 'currency.js'
import pluralize from 'pluralize'
import Link from 'next/link'
import routes from '@lib/routes'
import { ArrowRight, GlobalDistribution, GlobalDistribution2 } from 'icons'
import * as Switch from '@radix-ui/react-switch'
import MoreInformationPopover from '@components/common/MoreInformationPopover'
import { useRouter } from 'next/router'

const defaultQuote = {
  quantity: 500,
  printLocations: [{ colorCount: 1 }],
  includeFulfillment: false,
}

const defaultPrintLocation = {
  colorCount: 1,
}

const printLocation = yup.object({
  colorCount: yup.number().min(1).max(8).required(),
})

const schema = yup.object({
  quantity: yup.number().min(24).max(10000).required(),
  printLocations: yup.array(printLocation.required()).min(1).max(4).required(),
  includeFulfillment: yup.boolean().required(),
})

type FormInput = yup.Asserts<typeof schema>

interface Props {
  productVariantEntityId: number
}

const CalculatorForm = (props: Props) => {
  const router = useRouter()
  const [submitting, setSubmitting] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [memoizedPrintLocations, setMemoizedPrintLocations] = React.useState<
    FormInput['printLocations']
  >([])

  const [adjustingSlider, setAdjustingSlider] = React.useState(false)
  const form = useForm<FormInput>({
    defaultValues: defaultQuote,
    resolver: yupResolver(schema),
  })

  const printLocationFieldArray = useFieldArray({
    name: 'printLocations',
    control: form.control,
  })

  const { trigger } = form

  const { printLocations, quantity, includeFulfillment } = form.watch()

  const [getQuote, { data }] = useCalculatorFormQuote({
    catalogProductVariantId: props.productVariantEntityId,
  })

  if (
    JSON.stringify(printLocations) !== JSON.stringify(memoizedPrintLocations)
  ) {
    setMemoizedPrintLocations([
      ...printLocations.map(location => ({ ...location })),
    ])
  }

  React.useEffect(() => {
    const get = async () => {
      if (await trigger()) {
        setLoading(true)
        await getQuote({
          includeFulfillment,
          printLocations: memoizedPrintLocations,
          quantity,
        })
        setLoading(false)
      }
    }

    if (
      memoizedPrintLocations.some(location => Number.isNaN(location.colorCount))
    ) {
      // We don't want to trigger validation since user hasn't entered anything yet
      return
    }

    get()
  }, [getQuote, includeFulfillment, memoizedPrintLocations, quantity, trigger])

  const handleRemovePrintLocation = (index: number) => {
    if (printLocationFieldArray.fields.length === 1) {
      return
    }
    printLocationFieldArray.remove(index)
  }

  const handleAddPrintLocation = () => {
    printLocationFieldArray.append(defaultPrintLocation)
  }

  const handleStartOrderClick = async () => {
    setSubmitting(true)
    await router.push(routes.internal.getStarted.href())
    setSubmitting(false)
  }

  const { productUnitCostCents = 0, productTotalCostCents = 0 } =
    data?.site.product?.quote || {}

  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Quantity</h3>

            <Controller
              control={form.control}
              name="quantity"
              render={({ field, fieldState }) => (
                <>
                  <RangeSlider
                    value={field.value}
                    onChange={field.onChange}
                    min={24}
                    max={10000}
                    onPointerDown={() => {
                      setAdjustingSlider(true)
                    }}
                    onPointerUp={() => setAdjustingSlider(false)}
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

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Print Locations</h3>
              {printLocationFieldArray.fields.length < 4 ? (
                <button
                  type="button"
                  onClick={handleAddPrintLocation}
                  className="underline text-sm"
                >
                  Add print location
                </button>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              {printLocationFieldArray.fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <div>
                      <Controller
                        name={`printLocations.${index}.colorCount`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <>
                            <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                              <div className="flex-1 flex-shrink-0">
                                <label className="text-sm font-medium text-gray-700">
                                  Location {index + 1} color count{' '}
                                  {printLocationFieldArray.fields.length > 1 ? (
                                    <button
                                      type="button"
                                      className="text-xs text-gray-400"
                                      onClick={() =>
                                        handleRemovePrintLocation(index)
                                      }
                                    >
                                      (Remove)
                                    </button>
                                  ) : null}
                                </label>
                              </div>
                              <div className="flex-shrink min-w-[50px] max-w-[100px]">
                                <TextField
                                  name={field.name}
                                  value={field.value}
                                  onChange={e => {
                                    const value = parseInt(e.target.value)

                                    if (value < 1) {
                                      field.onChange(1)
                                    } else if (value > 8) {
                                      field.onChange(8)
                                    } else {
                                      field.onChange(value)
                                    }
                                  }}
                                  inputRef={field.ref}
                                  type="number"
                                />
                              </div>
                            </div>
                            {fieldState.error ? (
                              <span className="text-sm text-red-500">
                                {fieldState.error.message}
                              </span>
                            ) : null}
                          </>
                        )}
                      />
                    </div>
                  </div>
                )
              })}
              {form.formState.errors.printLocations?.message ? (
                <span className="text-sm text-red-500">
                  {form.formState.errors.printLocations.message}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Add-ons</h3>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="text-sm flex whitespace-nowrap gap-1 relative">
                No-touch fulfillment ($1.00){' '}
                <MoreInformationPopover
                  content={
                    <div className="max-w-[240px] opacity-95 text bg-gray-950 text-white p-6 rounded-md w-full shadow-lg flex flex-col gap-4">
                      <div className="flex justify-center">
                        <GlobalDistribution2
                          width={70}
                          height={70}
                          className="stroke-2"
                        />
                      </div>
                      Save money, time, and worry less when you let Stitchi
                      fulfill your orders and customer service inquiries.{' '}
                      <Link
                        href={routes.internal.features.distribution.href()}
                        className="underline"
                        target="_blank"
                      >
                        Learn more
                      </Link>
                    </div>
                  }
                />
              </label>

              <Controller
                name="includeFulfillment"
                control={form.control}
                render={({ field }) => (
                  <Switch.Root
                    className="h-6 w-11 flex-shrink-0 bg-gray-200 data-[state='checked']:bg-primary rounded-full relative checked:bg-gray-900 flex items-center border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    id="includeFulfillment"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  >
                    <Switch.Thumb className="block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out data-[state='checked']:translate-x-5" />
                  </Switch.Root>
                )}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="flex flex-wrap justify-between items-end gap-x-8 gap-y-6">
          <div>
            <div>
              <span className="text-3xl">
                {loading || adjustingSlider ? (
                  <span className="text-gray-300">
                    $<Skeleton width={65} />
                  </span>
                ) : (
                  <>
                    {currency(productUnitCostCents, {
                      fromCents: true,
                    }).format()}{' '}
                  </>
                )}
              </span>
              {loading || adjustingSlider ? null : (
                <span className="text">per unit</span>
              )}
            </div>

            <div>
              <span className="text-sm">
                {loading || adjustingSlider ? (
                  <Skeleton width={130} />
                ) : (
                  <>
                    {quantity.toLocaleString()} {pluralize('unit', quantity)}{' '}
                    <span className="underline">
                      {currency(productTotalCostCents, {
                        fromCents: true,
                      }).format()}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div>
            <Button
              slim
              color="brandPrimary"
              endIcon={<ArrowRight width={16} className="stroke-[2.5px]" />}
              onClick={handleStartOrderClick}
              loading={submitting}
              disabled={loading}
              className="!px-3"
            >
              Start an order
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CalculatorForm
