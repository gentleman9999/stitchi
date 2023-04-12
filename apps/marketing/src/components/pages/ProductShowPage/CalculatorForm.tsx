import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button, RangeSlider, TextField } from '@components/ui'

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

export interface Props {
  onSubmit: (data: FormInput) => void
}

const CalculatorForm = (props: Props) => {
  const form = useForm<FormInput>({
    defaultValues: { quantity: 100, printLocations: [defaultPrintLocation] },
    resolver: yupResolver(schema),
  })

  const printLocationFieldArray = useFieldArray({
    name: 'printLocations',
    control: form.control,
  })

  const handleSubmit = form.handleSubmit(data => {
    props.onSubmit(data)
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Overview</h3>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <RangeSlider
                label="Garment Quantity"
                value={field.value}
                onChange={field.onChange}
                max={10000}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Print Locations</h3>
            <button
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
                        {...field}
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
        <hr />
        <Button type="submit" color="brandPrimary">
          Calculate
        </Button>
      </div>
    </form>
  )
}

export default CalculatorForm
