import { Check } from 'icons'
import React from 'react'
import cx from 'classnames'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from './DesignRequestDraftForm'
import { motion } from 'framer-motion'
import { InputGroup, RichTextEditor } from '@components/ui/inputs'

interface Props {
  form: UseFormReturn<FormValues>
  autoSave: () => void
}

const DesignRequestLocationInput = ({ form, autoSave }: Props) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  const { fields } = useFieldArray<FormValues>({
    control: form.control,
    name: 'locations',
  })

  const watchLocationsArray = form.watch('locations')

  const controlledLocations = fields.map((field, index) => {
    return {
      ...field,
      ...watchLocationsArray[index],
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <InputGroup label="Choose a location">
        <div className="flex gap-2 flex-wrap">
          {controlledLocations.map((field, index) => {
            const configured =
              field.description.length > 0 || field.fileIds.length > 0

            return (
              <button
                key={field.id}
                onClick={() => setActiveIndex(index)}
                className={cx(
                  'relative rounded-md p-4 flex items-center justify-between border gap-4',
                  {
                    'ring-2 ring-primary border-primary': activeIndex === index,
                  },
                )}
              >
                <span className="font-semibold text-sm whitespace-nowrap">
                  {field.placement}
                </span>
                <div
                  className={cx(
                    'rounded-full bg-primary p-0.5 flex items-center justify-center',
                    { 'opacity-0': !configured },
                  )}
                >
                  <Check className="w-3 h-3 text-gray-700" strokeWidth={3} />
                </div>
              </button>
            )
          })}
        </div>
      </InputGroup>

      {controlledLocations.map((locationField, index) => {
        return (
          <motion.div
            key={locationField.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeIndex === index ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={cx({ hidden: activeIndex !== index })}
          >
            <Controller
              name={`locations.${index}.description`}
              control={form.control}
              rules={{ onBlur: autoSave }}
              render={({ field, fieldState }) => {
                let content

                try {
                  content = JSON.parse(field.value)
                } catch (e) {
                  content = null
                }

                return (
                  <InputGroup
                    label={
                      <>
                        Describe your vision for the{' '}
                        <u>{locationField.placement.toLowerCase()}</u> design
                      </>
                    }
                    error={fieldState.error?.message}
                  >
                    <RichTextEditor
                      inputRef={field.ref}
                      placeholder="Describe your vision for the design"
                      editorOptions={{
                        content,
                        onUpdate: v => {
                          if (v.editor.isEmpty) {
                            field.onChange('')
                          } else {
                            field.onChange(JSON.stringify(v.editor.getJSON()))
                          }
                        },
                        onBlur: field.onBlur,
                      }}
                    />
                  </InputGroup>
                )
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default DesignRequestLocationInput
