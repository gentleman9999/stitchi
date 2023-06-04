import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import cx from 'classnames'
import { FormValues } from '../ProductBuyPageForm'
import { TextField } from '@components/ui'

interface Props {
  colorFieldHex: string
  colorFieldIndex: number
  form: UseFormReturn<FormValues>
}

const ColorSizesInput = ({ form, colorFieldIndex, colorFieldHex }: Props) => {
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
        <td key={size.id} className="p-1 w-14">
          <Controller
            name={`colors.${colorFieldIndex}.sizes.${sizeFieldIndex}.quantity`}
            control={form.control}
            render={({ field }) => (
              <TextField
                inputClassName="px-1.5"
                name={field.name}
                value={size.quantity ?? 0}
                onChange={e => {
                  const value = parseInt(e.target.value)

                  if (value < 0) {
                    field.onChange(0)
                  } else {
                    field.onChange(value)
                  }
                }}
                inputRef={field.ref}
                type="number"
              />
            )}
          />

          {/* <input
            type="number"
            min={0}
            placeholder="0"
            className={cx(
              `w-full border rounded-md border-gray-200 text-center py-1 px-0 text-xs focus:border-primary focus:ring-primary`,
              { 'text-gray-300': size.quantity === 0 },
            )}
            {...form.register(
              `colors.${colorFieldIndex}.sizes.${sizeFieldIndex}.quantity` as const,
              { valueAsNumber: true },
            )}
          /> */}
        </td>
      ))}
    </>
  )
}

export default ColorSizesInput
