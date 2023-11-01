import { gql } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import Button from '@components/ui/ButtonV2/Button'
import { InputGroup, TextField } from '@components/ui/inputs'
import FileInput from '@components/ui/inputs/FileInput'
import { CreateProofFormDesignRequestFragment } from '@generated/CreateProofFormDesignRequestFragment'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ProofLocationInput from './ProofLocationInput'
import ProofVariantInput from './ProofVariantInput'

const fileSchema = yup.string().uuid().label('File')

const locationSchema = yup
  .object()
  .shape({
    fileId: fileSchema.required(),
    placement: yup.string().required().label('Placement'),
    colorCount: yup.number().min(0).nullable().label('Color count'),
  })
  .label('Print location')

const variantSchema = yup
  .object()
  .shape({
    catalogProductColorId: yup.string().required().label('Color'),
    imageFileIds: yup
      .array()
      .of(fileSchema.required())
      .min(1)
      .required()
      .label('Image'),
  })
  .label('Variant')

const schema = yup.object().shape({
  message: yup.string().defined().label('Message'),
  primaryImageFileId: fileSchema.required().label('Primary Image'),
  proofLocations: yup
    .array()
    .of(locationSchema.required())
    .min(1)
    .required()
    .label('Print location'),
  proofVariants: yup
    .array()
    .of(variantSchema)
    .min(1)
    .required()
    .label('Proof variant'),
})

export type FormValues = yup.InferType<typeof schema>

interface Props {
  uploadFolder: string
  initialValues?: Partial<FormValues>
  designRequest: CreateProofFormDesignRequestFragment
  onSubmit: (values: FormValues) => Promise<void>
}

const CreateProofForm = ({
  initialValues,
  onSubmit,
  uploadFolder,
  designRequest,
}: Props) => {
  const [submitting, setSubmitting] = React.useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      message: initialValues?.message || '',
      primaryImageFileId: initialValues?.primaryImageFileId || '',
      proofLocations: initialValues?.proofLocations || [
        {
          colorCount: null,
          placement: '',
          fileId: undefined,
        },
      ],
      proofVariants: designRequest.designRequestProduct.colors.map(color => ({
        catalogProductColorId: color.catalogProductColorId,
        imageFileIds: [],
      })),
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
            name="primaryImageFileId"
            control={control}
            render={({ field, fieldState }) => (
              <InputGroup
                label="Primary image"
                error={fieldState.error?.message}
              >
                <FileInput
                  folder={uploadFolder}
                  keepUploadStatus
                  fileIds={[field.value]}
                  onChange={v => field.onChange(v[1])}
                  accept="image/jpg,image/jpeg,image/png"
                />
              </InputGroup>
            )}
          />
        </div>
      </ClosetSection>

      <ProofLocationInput form={form} uploadFolder={uploadFolder} />

      <ProofVariantInput
        form={form}
        uploadFolder={uploadFolder}
        designRequest={designRequest}
      />

      <ClosetSection>
        <Controller
          name="message"
          control={control}
          render={({ field: { ref, ...fieldRest }, fieldState }) => (
            <InputGroup
              label="Message to customer"
              error={fieldState.error?.message}
              optional
            >
              <TextField multiline {...fieldRest} inputRef={ref} />
            </InputGroup>
          )}
        />
      </ClosetSection>

      <ClosetSection>
        <div className="flex justify-end">
          <Button
            size="xl"
            type="submit"
            color="brandPrimary"
            loading={submitting}
          >
            Upload proof
          </Button>
        </div>
      </ClosetSection>
    </form>
  )
}

CreateProofForm.fragments = {
  designRequest: gql`
    ${ProofVariantInput.fragments.designRequest}
    fragment CreateProofFormDesignRequestFragment on DesignRequest {
      id
      ...ProofVariantInputDesignRequestFragment
    }
  `,
}

export default CreateProofForm
