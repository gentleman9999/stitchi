import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from './CreateProofForm'
import { motion } from 'framer-motion'
import cx from 'classnames'
import Select from '@components/ui/inputs/Select'
import { FileInput, InputGroup, TextField } from '@components/ui/inputs'
import Button from '@components/ui/ButtonV2/Button'

interface Props {
  uploadFolder: string
  form: UseFormReturn<FormValues>
}

const ProofLocationInput = ({ form, uploadFolder }: Props) => {
  const locationFields = useFieldArray<FormValues>({
    control: form.control,
    name: 'proofLocations',
  })

  const handleAddLocation = () => {
    locationFields.append({
      colorCount: null,
      placement: '',
    })
  }

  return (
    <ClosetSection>
      <ClosetSectionHeader divider>
        <ClosetSectionTitle
          title="Design locations"
          actions={
            <ClosetPageActions
              actions={[
                {
                  label: 'Add location',
                  onClick: handleAddLocation,
                },
              ]}
            />
          }
        />
      </ClosetSectionHeader>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {locationFields.fields.map((field, index) => {
            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <InputGroup
                  label={
                    <div className="flex justify-between items-center w-full">
                      <span>Location {index + 1}</span>
                      <motion.div
                        className={cx({
                          'opacity-0 touch-none':
                            locationFields.fields.length === 1,
                        })}
                      >
                        <Button
                          size="sm"
                          variant="naked"
                          className="!text-sm"
                          onClick={() => locationFields.remove(index)}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border rounded-sm">
                    <Controller
                      name={`proofLocations.${index}.placement`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <InputGroup
                          label="Placement"
                          error={fieldState.error?.message}
                          className="col-span-1"
                        >
                          <Select
                            onChange={field.onChange}
                            placeholder="Choose a placement"
                            inputRef={field.ref}
                            value={field.value.length ? field.value : undefined}
                            options={[
                              {
                                label: 'Front',
                                value: 'front',
                              },
                              {
                                label: 'Pocket',
                                value: 'pocket',
                              },
                              {
                                label: 'Back',
                                value: 'back',
                              },
                              {
                                label: 'Left sleeve',
                                value: 'left_sleeve',
                              },
                              {
                                label: 'Right sleeve',
                                value: 'right_sleeve',
                              },
                            ]}
                          />
                        </InputGroup>
                      )}
                    />

                    <Controller
                      name={`proofLocations.${index}.colorCount`}
                      control={form.control}
                      rules={{ onChange: v => (Number.isNaN(v) ? null : v) }}
                      render={({ field, fieldState }) => (
                        <InputGroup
                          label="Color count"
                          error={fieldState.error?.message}
                        >
                          <TextField
                            type="number"
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            value={
                              field.value === null
                                ? NaN.toString()
                                : field.value
                            }
                            className="col-span-1"
                            inputRef={field.ref}
                          />
                        </InputGroup>
                      )}
                    />

                    <Controller
                      name={`proofLocations.${index}.fileId`}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <InputGroup
                          label="Design file"
                          error={fieldState.error?.message}
                          className="sm:col-span-2"
                        >
                          <FileInput
                            keepUploadStatus
                            folder={uploadFolder}
                            fileIds={[field.value]}
                            onChange={v => field.onChange(v[0])}
                            accept="application/pdf"
                          />
                        </InputGroup>
                      )}
                    />
                  </div>
                </InputGroup>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ClosetSection>
  )
}

export default ProofLocationInput
