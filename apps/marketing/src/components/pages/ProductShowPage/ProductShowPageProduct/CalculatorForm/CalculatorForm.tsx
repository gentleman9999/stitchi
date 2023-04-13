import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  Button,
  IconButton,
  RangeSlider,
  Skeleton,
  TextField,
} from '@components/ui'
import useCalculatorFormQuote from './useCalculatorFormQuote'
import currency from 'currency.js'
import pluralize from 'pluralize'
import Link from 'next/link'
import routes from '@lib/routes'
import { ArrowRight, XIcon } from 'icons'

const defaultQuote = {
  quantity: 500,
  printLocations: [{ colorCount: 1 }],
}

const defaultPrintLocation = {
  colorCount: 1,
}

const printLocation = yup.object({
  colorCount: yup.number().min(1).required(),
})

const schema = yup.object({
  quantity: yup.number().min(1).required(),
  printLocations: yup.array(printLocation.required()).min(1).required(),
})

type FormInput = yup.Asserts<typeof schema>

interface Props {
  productVariantEntityId: number
}

const CalculatorForm = (props: Props) => {
  const [adjustingSlider, setAdjustingSlider] = React.useState(false)
  const form = useForm<FormInput>({
    defaultValues: defaultQuote,
    resolver: yupResolver(schema),
  })

  const printLocationFieldArray = useFieldArray({
    name: 'printLocations',
    control: form.control,
  })

  const { printLocations, quantity } = form.watch()

  const { data, loading } = useCalculatorFormQuote({
    catalogProductVariantId: props.productVariantEntityId,
    // Compares values instead of pointer
    printLocations: [...printLocations.map(location => ({ ...location }))],
    quantity,
  })

  const handleRemovePrintLocation = (index: number) => {
    if (printLocationFieldArray.fields.length === 1) {
      return
    }
    printLocationFieldArray.remove(index)
  }

  const handleAddPrintLocation = () => {
    printLocationFieldArray.append(defaultPrintLocation)
  }

  const { productUnitCostCents = 0, productTotalCostCents = 0 } =
    data?.quoteGenerate || {}

  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Quantity</h3>

              <Controller
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <RangeSlider
                    value={field.value}
                    onChange={field.onChange}
                    min={12}
                    max={10000}
                    onPointerDown={() => {
                      setAdjustingSlider(true)
                    }}
                    onPointerUp={() => setAdjustingSlider(false)}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Print Locations</h3>
              <button
                type="button"
                onClick={handleAddPrintLocation}
                className="underline text-sm"
              >
                Add print location
              </button>
            </div>
            {printLocationFieldArray.fields.map((field, index) => {
              const location = form.formState.errors?.printLocations?.[index]
              return (
                <div key={field.id}>
                  <div className="flex gap-2 items-center justify-between">
                    <div className="">
                      <label className="text-sm font-medium text-gray-700">
                        Location {index + 1} color count{' '}
                        {printLocationFieldArray.fields.length > 1 ? (
                          <button
                            type="button"
                            className="text-xs text-gray-400"
                            onClick={() => handleRemovePrintLocation(index)}
                          >
                            (Remove)
                          </button>
                        ) : null}
                      </label>
                    </div>
                    <Controller
                      name={`printLocations.${index}.colorCount`}
                      control={form.control}
                      render={({ field }) => (
                        <TextField
                          name={field.name}
                          value={field.value}
                          onChange={e => {
                            field.onChange(parseInt(e.target.value))
                          }}
                          inputRef={field.ref}
                          type="number"
                          error={Boolean(location?.colorCount?.message)}
                          description={location?.colorCount?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              )
            })}
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
                    {pluralize('unit', quantity, true)}{' '}
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
              Component={Link}
              color="brandPrimary"
              href={routes.internal.getStarted.href()}
              endIcon={<ArrowRight width={16} className="stroke-2" />}
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
