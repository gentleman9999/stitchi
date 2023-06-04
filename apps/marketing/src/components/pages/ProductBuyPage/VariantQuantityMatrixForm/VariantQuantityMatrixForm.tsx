import { gql } from '@apollo/client'
import CatalogProductColorSwatch from '@components/common/CatalogProductColorSwatch'
import { VariantQuantityMatrixFormProductFragment } from '@generated/VariantQuantityMatrixFormProductFragment'
import useProductOptions from '@hooks/useProductOptions'
import { notEmpty } from '@utils/typescript'
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'icons'
import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormValues } from '../ProductBuyPageForm'
import ColorSizesInput from './ColorSizesInput'

interface Props {
  product: VariantQuantityMatrixFormProductFragment
  form: UseFormReturn<FormValues>
}

const VariantQuantityMatrixForm = ({ product, form }: Props) => {
  const { colors, sizes } = useProductOptions({ product })
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

  const selectedColorEntityIds = colorFields.fields.map(
    color => color.colorEntityId,
  )

  const availableColors = colors.filter(
    ({ entityId }) => !selectedColorEntityIds.includes(entityId),
  )

  const handleAddColor = ({ colorEntityId }: { colorEntityId: number }) => {
    colorFields.append(
      {
        colorEntityId,
        sizes: sizes.map(size => {
          const foundVariant = product.variants.edges?.find(edge => {
            const optionValueEntityIds =
              edge?.node.options.edges
                ?.flatMap(edge =>
                  edge?.node.values.edges?.map(edge => edge?.node.entityId),
                )
                .filter(notEmpty) || []

            if (!optionValueEntityIds?.length) return false

            return (
              optionValueEntityIds.includes(size.entityId) &&
              optionValueEntityIds.includes(colorEntityId)
            )
          })

          return {
            disabled: !foundVariant,
            quantity: null,
            sizeEntityId: size.entityId,
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
          {availableColors.map(({ hexColors, entityId, label }) => (
            <motion.li
              key={entityId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CatalogProductColorSwatch
                onClick={() => handleAddColor({ colorEntityId: entityId })}
                hexCode={hexColors[0]}
                label={label}
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

          <div className="overflow-scroll">
            <table className="table-fixed w-full">
              <thead>
                <tr>
                  <th className="w-28 sticky left-0 bg-white"></th>
                  {sizes.length ? (
                    sizes.map(size => (
                      <th
                        key={size.entityId}
                        className="text-center text-sm w-14 whitespace-nowrap"
                      >
                        {size.label}
                      </th>
                    ))
                  ) : (
                    <th className="text-center text-sm">Quantity</th>
                  )}
                  <th className="sr-only">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {colorFields.fields.map(({ colorEntityId }, index) => {
                    const color = colors.find(
                      ({ entityId }) => entityId === colorEntityId,
                    )

                    if (!color) return null

                    return (
                      <motion.tr
                        key={colorEntityId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td className="p-1 sticky left-0 bg-white">
                          <div className="flex items-center text-xs">
                            <CatalogProductColorSwatch
                              hexCode={color.hexColors[0]}
                            />

                            <span className="ml-1 w-full">{color.label}</span>
                          </div>
                        </td>
                        <ColorSizesInput form={form} colorFieldIndex={index} />
                        <td className="w-4">
                          <button
                            className="p-1 hover:bg-gray-100 rounded-sm"
                            onClick={() => handleRemoveColor({ colorEntityId })}
                          >
                            <XIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>
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
  product: gql`
    ${useProductOptions.fragments.product}
    fragment VariantQuantityMatrixFormProductFragment on Product {
      id
      variants(first: $variantsFirst) {
        edges {
          node {
            id
            options {
              edges {
                node {
                  values {
                    edges {
                      node {
                        entityId
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      ...UseProductColorsProductFragment
    }
  `,
}

export default VariantQuantityMatrixForm
