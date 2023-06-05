import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from '../ProductBuyPageForm'
import { TextField } from '@components/ui'

interface Props {
  colorFieldIndex: number
  form: UseFormReturn<FormValues>
}

const ColorSizesInput = ({ form, colorFieldIndex }: Props) => {
  const sizeFields = useFieldArray({
    control: form.control,
    name: `colors.${colorFieldIndex}.sizes`,
  })

  const watchFieldArray = form.watch(`colors.${colorFieldIndex}.sizes`)

  const controlledFields = sizeFields.fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    }
  })

  return (
    <>
      {controlledFields.map((size, sizeFieldIndex) => (
        <div key={size.id} className="p-1">
          <Controller
            name={`colors.${colorFieldIndex}.sizes.${sizeFieldIndex}.quantity`}
            control={form.control}
            render={({ field }) => (
              <TextField
                inputClassName="px-1.5"
                name={field.name}
                value={size.quantity ?? 0}
                disabled={Boolean(size.disabled)}
                inputRef={field.ref}
                type="number"
                onChange={e => {
                  const value = parseInt(e.target.value)

                  if (value < 0) {
                    field.onChange(0)
                  } else {
                    field.onChange(value)
                  }
                }}
              />
            )}
          />
        </div>
      ))}
    </>
  )
}

export default ColorSizesInput
