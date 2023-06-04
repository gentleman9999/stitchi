import { gql } from '@apollo/client'
import CatalogProductColorSwatch from '@components/common/CatalogProductColorSwatch'
import { VariantQuantityMatrixFormProductFragment } from '@generated/VariantQuantityMatrixFormProductFragment'
import useProductOptions from '@hooks/useProductOptions'
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
        sizes: sizes.map(size => ({
          quantity: null,
          sizeEntityId: size.entityId,
        })),
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
      <div className="flex-col gap-2">
        <span className="whitespace-nowrap font-medium">Choose colors</span>
        <ul className="flex flex-wrap gap-1">
          {availableColors.map(({ hexColors, entityId, label }) => (
            <li key={entityId}>
              <CatalogProductColorSwatch
                onClick={() => handleAddColor({ colorEntityId: entityId })}
                hexCode={hexColors[0]}
                label={label}
                selected={selectedColorEntityIds.includes(entityId)}
              />
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4" />

      {colorFields.fields.length > 0 ? (
        <>
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="sr-only">Color</th>
                {sizes.length ? (
                  sizes.map(size => (
                    <th
                      key={size.entityId}
                      className="text-center text-sm w-16 whitespace-nowrap"
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
              {colorFields.fields.map(({ colorEntityId }, index) => {
                const color = colors.find(
                  ({ entityId }) => entityId === colorEntityId,
                )

                if (!color) return null

                return (
                  <tr key={colorEntityId}>
                    <td className="flex items-center p-0.5 text-xs">
                      <CatalogProductColorSwatch hexCode={color.hexColors[0]} />

                      <span className="ml-1 w-full">{color.label}</span>
                    </td>
                    <ColorSizesInput form={form} colorFieldIndex={index} />
                    <td>
                      <button
                        className="p-1 hover:bg-gray-100 rounded-sm"
                        onClick={() => handleRemoveColor({ colorEntityId })}
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <hr className="my-2" />

          <div className="text-sm text-right">
            Total quantity <b>{totalQuantity.toLocaleString()}</b>
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
      ...UseProductColorsProductFragment
    }
  `,
}

export default VariantQuantityMatrixForm
