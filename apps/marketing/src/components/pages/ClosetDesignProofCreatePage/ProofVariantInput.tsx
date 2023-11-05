import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from './CreateProofForm'
import { gql } from '@apollo/client'
import { ProofVariantInputDesignRequestFragment } from '@generated/ProofVariantInputDesignRequestFragment'
import ColorSwatch from '@components/common/ColorSwatch'
import { FileInput, InputGroup } from '@components/ui/inputs'

interface Props {
  uploadFolder: string
  form: UseFormReturn<FormValues>
  designRequest: ProofVariantInputDesignRequestFragment
}

const ProofVariantInput = ({ uploadFolder, form, designRequest }: Props) => {
  const [activeColor, setActiveColor] = React.useState(
    designRequest.designRequestProduct.colors[0],
  )

  const proofVariants = form.watch('proofVariants')

  const variantFields = useFieldArray<FormValues>({
    control: form.control,
    name: 'proofVariants',
  })

  console.log('VARIANT FIELDS', variantFields)

  return (
    <ClosetSection>
      <ClosetSectionHeader divider>
        <ClosetSectionTitle title="Design variants" />
      </ClosetSectionHeader>

      <div className="flex flex-col gap-8">
        <InputGroup>
          <div className="flex gap-1 flex-wrap">
            {designRequest.designRequestProduct.colors.map((color, index) => (
              <ColorSwatch
                key={color.catalogProductColorId}
                selected={
                  activeColor.catalogProductColorId ===
                  color.catalogProductColorId
                }
                hexCode={color.hexCode || ''}
                label={color.name || ''}
                onClick={() => setActiveColor(color)}
                checked={Boolean(proofVariants[index]?.imageFileIds?.length)}
              />
            ))}
          </div>
        </InputGroup>

        <AnimatePresence>
          {variantFields.fields.map((field, index) => {
            const fieldColorId = form.getValues(
              `proofVariants.${index}.catalogProductColorId`,
            )

            return activeColor.catalogProductColorId === fieldColorId ? (
              <motion.div
                key={field.id}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <input
                  readOnly
                  hidden
                  {...form.register(
                    `proofVariants.${index}.catalogProductColorId`,
                  )}
                />
                <Controller
                  name={`proofVariants.${index}.imageFileIds`}
                  control={form.control}
                  defaultValue={[]}
                  render={({ field, fieldState }) => (
                    <InputGroup
                      label={`${activeColor.name} design file`}
                      error={fieldState.error?.message}
                      className="sm:col-span-2"
                    >
                      <FileInput
                        keepUploadStatus
                        folder={uploadFolder}
                        fileIds={field.value}
                        onChange={field.onChange}
                        accept="image/jpg,image/jpeg,image/png"
                      />
                    </InputGroup>
                  )}
                />
              </motion.div>
            ) : null
          })}
        </AnimatePresence>
      </div>
    </ClosetSection>
  )
}

ProofVariantInput.fragments = {
  designRequest: gql`
    fragment ProofVariantInputDesignRequestFragment on DesignRequest {
      designRequestProduct {
        id
        colors {
          name
          hexCode
          catalogProductColorId
        }
      }
    }
  `,
}

export default ProofVariantInput
