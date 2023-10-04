import ColorSwatch from '@components/common/ColorSwatch'
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'icons'
import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import ColorSizesInput from './ColorSizesInput'

interface ProductColor {
  id: string
  catalogProductColorId: string
  hex: string | null
  name: string | null
}

interface ProductSize {
  catalogSizeEntityId: string
  quantity: number | null
  disabled: boolean | null
}

interface Variant {
  id: string
  sizeName: string | null
  catalogProductSizeId: string | null
  catalogProductColorId: string | null
}

export interface VariantFormValues {
  colors: (Omit<ProductColor, 'hex' | 'name' | 'id'> & {
    sizes: ProductSize[]
  })[]
}

export interface ProductVariantQuantityMatrixFormProps<
  T extends VariantFormValues = VariantFormValues,
> {
  colors: ProductColor[]
  variants: Variant[]
  form: UseFormReturn<T>
}

const ProductVariantQuantityMatrixForm = <
  T extends VariantFormValues = VariantFormValues,
>({
  colors,
  variants,
  form: untypedForm,
}: ProductVariantQuantityMatrixFormProps<T>) => {
  // Hack because useFormReturn is not typed correctly for generic use
  const form = untypedForm as unknown as UseFormReturn<VariantFormValues>

  const colorFields = useFieldArray({
    control: form.control,
    name: 'colors',
  })

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

    variants.map(variant => {
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
  }, [variants])

  const selectedColorEntityIds = colorFields.fields.map(
    color => color.catalogProductColorId,
  )

  const handleAddColor = ({
    catalogProductColorId,
  }: {
    catalogProductColorId: string
  }) => {
    colorFields.append(
      {
        catalogProductColorId: catalogProductColorId,
        sizes: sizes.map(size => {
          const foundVariant = variants.find(variant => {
            return (
              variant.catalogProductSizeId === size.sizeId &&
              variant.catalogProductColorId === catalogProductColorId
            )
          })

          return {
            disabled: !foundVariant,
            quantity: null,
            catalogSizeEntityId: size.sizeId,
          }
        }),
      },
      { focusName: `colors.${colorFields.fields.length}.sizes.0.quantity` },
    )
  }

  const handleRemoveColor = ({
    catalogProductColorId,
  }: {
    catalogProductColorId: string
  }) => {
    colorFields.remove(
      selectedColorEntityIds.findIndex(id => id === catalogProductColorId),
    )
  }

  return (
    <>
      <ul className="flex flex-wrap gap-1">
        <AnimatePresence>
          {colors
            .filter(
              color =>
                !selectedColorEntityIds.includes(color.catalogProductColorId),
            )
            .map(({ hex, name, catalogProductColorId }) => (
              <motion.li
                key={catalogProductColorId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ColorSwatch
                  onClick={() =>
                    handleAddColor({
                      catalogProductColorId,
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
                <div className="sticky left-0 "></div>
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

                {colorFields.fields.map(({ catalogProductColorId }, index) => {
                  const color = colors.find(
                    color =>
                      color.catalogProductColorId === catalogProductColorId,
                  )

                  if (!color) return null

                  return (
                    <>
                      <div key={color.id} className="p-1 sticky left-0  flex">
                        <div className="flex items-center text-xs">
                          <ColorSwatch hexCode={color.hex || '#000'} />

                          <span className="ml-1 w-full">{color.name}</span>
                        </div>
                      </div>
                      <ColorSizesInput form={form} colorFieldIndex={index} />
                      <div className="flex items-center">
                        <button
                          className="p-1 hover:bg-gray-100 rounded-sm"
                          onClick={() =>
                            handleRemoveColor({ catalogProductColorId })
                          }
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

export default ProductVariantQuantityMatrixForm
