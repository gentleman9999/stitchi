import { ComponentErrorMessage } from '@components/common'
import { Button, TextField } from '@components/ui'
import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from './ProductBuyPageForm'

const defaultPrintLocation = {
  colorCount: 1,
}

interface Props {
  form: UseFormReturn<FormValues>
}

const PrintLocationsForm = ({ form }: Props) => {
  const printLocationFieldArray = useFieldArray({
    name: 'printLocations',
    control: form.control,
  })

  const handleRemovePrintLocation = (index: number) => {
    if (printLocationFieldArray.fields.length === 1) {
      return
    }
    printLocationFieldArray.remove(index)
  }

  const handleAddPrintLocation = () => {
    printLocationFieldArray.append(defaultPrintLocation, {
      focusName: `printLocations.${printLocationFieldArray.fields.length}.colorCount`,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      {printLocationFieldArray.fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Controller
              name={`printLocations.${index}.colorCount`}
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                    <div className="flex-1 flex-shrink-0">
                      <label className="text-sm font-medium text-gray-700">
                        Customization {index + 1} color count{' '}
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
                    <ComponentErrorMessage error={fieldState.error.message} />
                  ) : null}
                </>
              )}
            />
          </div>
        )
      })}
      {form.formState.errors.printLocations?.message ? (
        <ComponentErrorMessage
          error={form.formState.errors.printLocations.message}
        />
      ) : null}

      {printLocationFieldArray.fields.length < 4 ? (
        <Button
          type="button"
          onClick={handleAddPrintLocation}
          className="w-full"
          slim
          variant="ghost"
        >
          + Add print location
        </Button>
      ) : null}
    </div>
  )
}

export default PrintLocationsForm
