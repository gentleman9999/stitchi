import ClosetSection from '@components/common/ClosetSection'
import { Button, InputGroup, TextField } from '@components/ui'
import FileInput from '@components/ui/inputs/FileInput'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ProofLocationInput from './ProofLocationInput'

const fileSchema = yup.string().uuid().label('File')

const locationSchema = yup
  .object()
  .shape({
    fileId: fileSchema.required(),
    placement: yup.string().required().label('Placement'),
    colorCount: yup.number().nullable().label('Color count'),
  })
  .label('Print location')

const schema = yup.object().shape({
  note: yup.string().label('Note'),
  fileIds: yup
    .array()
    .of(fileSchema.required())
    .min(1)
    .required()
    .label('File'),
  proofLocations: yup
    .array()
    .of(locationSchema.required())
    .min(1)
    .required()
    .label('Print location'),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  uploadFolder: string
  initialValues?: Partial<FormValues>
  onSubmit: (values: FormValues) => Promise<void>
}

const CreateProofForm = ({ initialValues, onSubmit, uploadFolder }: Props) => {
  const [submitting, setSubmitting] = React.useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      note: initialValues?.note || '',
      fileIds: initialValues?.fileIds || [],
      proofLocations: initialValues?.proofLocations || [
        {
          colorCount: null,
          placement: '',
          fileId: undefined,
        },
      ],
    },
    resolver: yupResolver(schema),
  })

  const { control } = form

  const handleSubmit = form.handleSubmit(async data => {
    setSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <ClosetSection>
        <div className="flex flex-col gap-6">
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => (
              <InputGroup
                label="Note"
                error={fieldState.error?.message}
                optional
              >
                <TextField multiline {...field} />
              </InputGroup>
            )}
          />

          <Controller
            name="fileIds"
            control={control}
            render={({ field, fieldState }) => (
              <InputGroup
                label="Image previews"
                error={fieldState.error?.message}
              >
                <FileInput
                  folder={uploadFolder}
                  keepUploadStatus
                  fileIds={field.value}
                  onChange={field.onChange}
                  accept="image/*,application/pdf"
                />
              </InputGroup>
            )}
          />
        </div>
      </ClosetSection>

      <ProofLocationInput form={form} uploadFolder={uploadFolder} />

      <ClosetSection>
        <div className="flex justify-end">
          <Button type="submit" color="brandPrimary" loading={submitting}>
            Upload proof
          </Button>
        </div>
      </ClosetSection>
    </form>
  )
}

export default CreateProofForm
