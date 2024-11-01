import ColorSwatch from '@components/common/ColorSwatch'
import { XIcon } from 'icons'
import React from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import ColorSizesInput from './ColorSizesInput'
import { AnimatePresence, motion } from 'framer-motion'
import { sortedSizeMap } from "../../../lib/utils/catalog"

interface ProductColor {
  id: string
  catalogProductColorId: string
  hex: string | null
  name: string | null
}

interface ProductSize {
  catalogProductVariantId: string | null
  catalogSizeEntityId: string
  quantity: number | null
  disabled: boolean | null
}

interface Variant {
  catalogProductVariantId: string | null
  sizeName: string | null | undefined
  colorName: string | null | undefined
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
  onSwatchClick?: (color: ProductColor) => void
  // In some cases we auto-show all color options, otherwise we want to enable this.
  showColorOptions?: boolean
}

const ProductVariantQuantityMatrixForm = <
  T extends VariantFormValues = VariantFormValues,
>({
  colors,
  variants,
  form: untypedForm,
  onSwatchClick,
  showColorOptions,
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

    const sortedSizes = Array.from(sizeMap.values()).sort((a, b) => {
      const rankA = sortedSizeMap[a.label.toLowerCase()] || 999;
      const rankB = sortedSizeMap[b.label.toLowerCase()] || 999;
      return rankA - rankB;
    });

    return sortedSizes;
  }, [variants])

  const handleSwatchClick = (color: ProductColor) => {
    if (onSwatchClick) {
      onSwatchClick(color)
    }
  }

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
            catalogProductVariantId:
              foundVariant?.catalogProductVariantId || null,
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
      {showColorOptions ? (
        <>
          <ul className="flex flex-wrap gap-1">
            <AnimatePresence initial={false}>
              {colors
                .filter(
                  color =>
                    !selectedColorEntityIds.includes(
                      color.catalogProductColorId,
                    ),
                )
                .map(color => (
                  <motion.li
                    key={color.catalogProductColorId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ColorSwatch
                      onClick={() => {
                        handleSwatchClick(color)
                        handleAddColor({
                          catalogProductColorId: color.catalogProductColorId,
                        })
                      }}
                      hexCode={color.hex || '#000'}
                      label={color.name}
                      width={colors.length > 20 ? 'w-6' : 'w-8'}
                      height={colors.length > 20 ? 'h-6' : 'h-8'}
                    />
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>
          {colorFields.fields.length > 0 ? <hr className="my-4" /> : null}
        </>
      ) : null}

      {colorFields.fields.length > 0 ? (
        <>
          <div className="w-full overflow-x-scroll">
            <div
              className="grid grid-flow-row"
              style={{
                gridTemplateColumns: `1fr repeat(${sizes.length}, 60px)`,
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

              {colorFields.fields.map(({ catalogProductColorId }, index) => {
                const color = colors.find(
                  color =>
                    color.catalogProductColorId === catalogProductColorId,
                )

                if (!color) return null

                return (
                  <React.Fragment key={color.id}>
                    <div className="p-1 sticky left-0 flex bg-white">
                      {showColorOptions ? (
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="p-1 hover:bg-gray-100 rounded-sm"
                            onClick={() =>
                              handleRemoveColor({ catalogProductColorId })
                            }
                          >
                            <XIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ) : null}
                      <div className="flex items-center text-xs">
                        <ColorSwatch
                          hexCode={color.hex || '#000'}
                          label={color.name}
                          onClick={() => {
                            handleSwatchClick(color)
                          }}
                        />

                        <span className="ml-1 w-full">{color.name}</span>
                      </div>
                    </div>
                    <ColorSizesInput form={form} colorFieldIndex={index} />
                  </React.Fragment>
                )
              })}
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