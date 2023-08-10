import { gql } from '@apollo/client'
import ColorSwatch from '@components/common/ColorSwatch'
import { VariantQuantityMatrixFormDesignProductFragment } from '@generated/VariantQuantityMatrixFormDesignProductFragment'
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'icons'
import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from '../ClosetDesignBuyPageForm'
import ColorSizesInput from './ColorSizesInput'

interface Props {
  designProduct: VariantQuantityMatrixFormDesignProductFragment
  form: UseFormReturn<FormValues>
}

const VariantQuantityMatrixForm = ({ designProduct, form }: Props) => {
  const colorFields = useFieldArray({ control: form.control, name: 'colors' })

  const watchColors = form.watch('colors')

  let totalQuantity = 0

  if (watchColors) {
    watchColors.forEach(({ sizes }) => {
      sizes?.forEach(({ quantity }) => {
        if (quantity) {
          totalQuantity += quantity
        }
      })
    })
  }

  const sizes = React.useMemo(() => {
    const sizeMap = new Map<string, { sizeId: string; label: string }>()

    designProduct.variants.map(variant => {
      const sizeId = variant?.catalogProductSizeId
      const sizeName = variant?.sizeName

      if (!sizeId || !sizeName) return

      if (!sizeMap.has(sizeId)) {
        sizeMap.set(sizeId, {
          sizeId,
          label: sizeName,
        })
      }
    })

    return Array.from(sizeMap.values())
  }, [designProduct.variants])

  const selectedColorEntityIds = colorFields.fields.map(
    color => color.colorEntityId,
  )

  const handleAddColor = ({ colorEntityId }: { colorEntityId: number }) => {
    colorFields.append(
      {
        colorEntityId,
        sizes: sizes.map(size => {
          const foundVariant = designProduct.variants.find(variant => {
            return (
              variant.catalogProductSizeId === size.sizeId &&
              variant.catalogProductColorId === colorEntityId.toString()
            )
          })

          return {
            disabled: !foundVariant,
            quantity: null,
            sizeEntityId: parseInt(size.sizeId),
          }
        }),
      },
      { focusName: `colors.${colorFields.fields.length}.sizes.0.quantity` },
    )
  }

  const handleRemoveColor = ({ colorEntityId }: { colorEntityId: number }) => {
    colorFields.remove(
      selectedColorEntityIds.findIndex(id => id === colorEntityId),
    )
  }

  return (
    <>
      <ul className="flex flex-wrap gap-1">
        <AnimatePresence>
          {designProduct.colors.map(({ hex, name, catalogProductColorId }) => (
            <motion.li
              key={catalogProductColorId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ColorSwatch
                onClick={() =>
                  handleAddColor({
                    colorEntityId: parseInt(catalogProductColorId),
                  })
                }
                hexCode={hex || '#000'}
                label={name || 'Unknown color'}
                width="w-8"
                height="h-8"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {colorFields.fields.length > 0 ? (
        <>
          <hr className="my-4" />

          <div className="flex overflow-x-auto">
            <div className="w-full overflow-x-auto">
              <div
                className="grid grid-flow-row"
                style={{
                  gridTemplateColumns: `1fr repeat(${sizes.length}, 70px) 24px`,
                }}
              >
                <div className="sticky left-0 bg-white"></div>
                {sizes.length ? (
                  sizes.map(size => (
                    <div
                      key={size.sizeId}
                      className="text-center text-sm whitespace-nowrap"
                    >
                      {size.label}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm">Quantity</div>
                )}
                <div></div>

                {colorFields.fields.map(({ colorEntityId }, index) => {
                  const color = designProduct.colors.find(
                    ({ catalogProductColorId }) =>
                      catalogProductColorId === colorEntityId.toString(),
                  )

                  if (!color) return null

                  return (
                    <>
                      <div className="p-1 sticky left-0 bg-white flex">
                        <div className="flex items-center text-xs">
                          <ColorSwatch hexCode={color.hex || '#000'} />

                          <span className="ml-1 w-full">{color.name}</span>
                        </div>
                      </div>
                      <ColorSizesInput form={form} colorFieldIndex={index} />
                      <div className="flex items-center">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-sm"
                          onClick={() => handleRemoveColor({ colorEntityId })}
                        >
                          <XIcon className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="text-xl text-right font-medium">
            Qty. {totalQuantity.toLocaleString()}
          </div>
        </>
      ) : null}
    </>
  )
}

VariantQuantityMatrixForm.fragments = {
  designProduct: gql`
    fragment VariantQuantityMatrixFormDesignProductFragment on DesignProduct {
      id
      colors {
        id
        catalogProductColorId
        hex
        name
      }
      variants {
        id
        sizeName
        catalogProductSizeId
        catalogProductColorId
      }
    }
  `,
}

export default VariantQuantityMatrixForm
