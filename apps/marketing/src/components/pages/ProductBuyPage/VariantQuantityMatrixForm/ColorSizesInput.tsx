import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import cx from 'classnames'
import { FormValues } from '../ProductBuyPageForm'

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
        <td key={size.id} className="p-0.5 w-14">
          <input
            type="number"
            min={0}
            placeholder="0"
            className={cx(
              'w-full border rounded-sm border-gray-200 text-center py-1 px-0 text-sm focus:border-primary focus:ring-primary',
              { 'text-gray-300': size.quantity === 0 },
            )}
            {...form.register(
              `colors.${colorFieldIndex}.sizes.${sizeFieldIndex}.quantity` as const,
              { valueAsNumber: true },
            )}
          />
        </td>
      ))}
    </>
  )
}

export default ColorSizesInput
