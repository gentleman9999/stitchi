import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { FileInput, InputGroup } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import cx from 'classnames'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from './CreateProofForm'
import { gql } from '@apollo/client'
import { ProofVariantInputDesignRequestFragment } from '@generated/ProofVariantInputDesignRequestFragment'
import ColorSwatch from '@components/common/ColorSwatch'

interface Props {
  uploadFolder: string
  form: UseFormReturn<FormValues>
  designRequest: ProofVariantInputDesignRequestFragment
}

const ProofVariantInput = ({ uploadFolder, form, designRequest }: Props) => {
  const [activeColorId, setActiveColorId] = React.useState<string | null>(
    designRequest.designRequestProduct.colors[0].catalogProductColorId,
  )

  const proofVariants = form.watch('proofVariants')

  const variantFields = useFieldArray<FormValues>({
    control: form.control,
    name: 'proofVariants',
  })

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
                selected={activeColorId === color.catalogProductColorId}
                hexCode={color.hexCode || ''}
                label={color.name || ''}
                onClick={() => setActiveColorId(color.catalogProductColorId)}
                checked={Boolean(proofVariants[index]?.imageFileIds?.length)}
              />
            ))}
          </div>
        </InputGroup>

        <AnimatePresence>
          {designRequest.designRequestProduct.colors.map((color, index) => {
            return (
              <motion.div
                key={color.catalogProductColorId}
                className={cx('', {
                  hidden: activeColorId !== color.catalogProductColorId,
                })}
              >
                <input
                  readOnly
                  hidden
                  value={color.catalogProductColorId}
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
                      label={`${color.name} design file`}
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
            )
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
