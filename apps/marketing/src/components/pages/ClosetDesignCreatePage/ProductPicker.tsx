import ColorSwatch from '@components/common/ColorSwatch'
import { Badge } from '@components/ui'
import React from 'react'

interface Props {}

const ProductPicker = (props: Props) => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    (typeof categories)[number]['id'] | null
  >(null)

  const [selectedProductId, setSelectedProductId] = React.useState<
    (typeof categories)[number]['products'][number]['id'] | null
  >(null)

  const [selectedColorIds, setSelectedColorIds] = React.useState<
    (typeof colors)[number]['id'][] | null
  >(null)

  const toggleSelectedColorId = (colorId: string) => {
    if (selectedColorIds?.includes(colorId)) {
      setSelectedColorIds(selectedColorIds.filter(id => id !== colorId))
    } else {
      setSelectedColorIds([...(selectedColorIds ?? []), colorId])
    }
  }

  const selectedCategory = categories.find(
    category => category.id === selectedCategoryId,
  )

  const selectedProduct = selectedCategory?.products.find(
    product => product.id === selectedProductId,
  )

  const selectedColors = colors.filter(color =>
    selectedColorIds?.includes(color.id),
  )

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h2 className="text-center text-2xl">
        {selectedCategory
          ? selectedProduct
            ? 'Finally, choose your colors...'
            : 'Next, choose a product style...'
          : 'Start by selecting a product category...'}
      </h2>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex gap-2">
          {selectedCategory ? (
            <Badge
              label={selectedCategory.label}
              onClose={() => setSelectedCategoryId(null)}
            />
          ) : null}
          {selectedProduct ? (
            <Badge
              label={selectedProduct.label}
              onClose={() => {
                setSelectedProductId(null)
                setSelectedColorIds(null)
              }}
            />
          ) : null}
        </div>
        {selectedColors?.length ? (
          <div className="flex gap-2">
            {selectedColors.map(color => (
              <ColorSwatch
                selected
                key={color.id}
                label={color.label}
                hexCode={color.hex}
                height="h-8"
                width="w-8"
                onClick={() => toggleSelectedColorId(color.id)}
              />
            ))}
          </div>
        ) : null}
      </div>

      <ul className="flex gap-8">
        {!selectedCategory ? (
          <>
            {categories.map(category => (
              <Item
                key={category.id}
                label={category.label}
                onClick={() => setSelectedCategoryId(category.id)}
              />
            ))}
          </>
        ) : (
          <>
            {!selectedProduct ? (
              <>
                {selectedCategory.products.map(product => (
                  <Item
                    key={product.id}
                    label={product.label}
                    onClick={() => setSelectedProductId(product.id)}
                  />
                ))}
              </>
            ) : (
              <div className="flex gap-1 flex-wrap max-w-lg justify-center">
                {colors
                  .filter(color => !selectedColorIds?.includes(color.id))
                  .map(color => (
                    <ColorSwatch
                      key={color.id}
                      hexCode={color.hex}
                      label={color.label}
                      width="w-12"
                      height="h-12"
                      onClick={() => toggleSelectedColorId(color.id)}
                    />
                  ))}
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  )
}

const Item = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <li className="p-4 border rounded-md max-w-[230px] hover:shadow-magical transition-all">
      <button onClick={onClick} className="flex flex-col items-center gap-4">
        <div className="aspect-square overflow-hidden rounded-md">
          <img
            src={`https://www.stitchi.co/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-ycjcgspsys%2Fimages%2Fstencil%2F300w%2Fattribute_rule_images%2F166304_source_1684166140.jpg&w=1200&q=75`}
            alt={`Design`}
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="font-bold">{label}</h2>
      </button>
    </li>
  )
}

const categories = [
  {
    id: 'tops',
    label: 'Tops',
    products: [
      {
        id: 'short-sleeve-t-shirt',
        label: 'Short-Sleeve T-Shirt',
      },
      {
        id: 'long-sleeve-t-shirt',
        label: 'Long-Sleeve T-Shirt',
      },
      {
        id: 'crewneck-sweatshirt',
        label: 'Crewneck Sweatshirt',
      },
      {
        id: 'hoodie',
        label: 'Hoodie',
      },
    ],
  },
  {
    id: 'bottoms',
    label: 'Bottoms',
    products: [
      {
        id: 'shorts',
        label: 'Shorts',
      },
      {
        id: 'sweatpants',
        label: 'Sweatpants',
      },
    ],
  },

  {
    id: 'accessories',
    label: 'Accessories',
    products: [
      {
        id: 'socks',
        label: 'Socks',
      },
      {
        id: 'baseball-cap',
        label: 'Baseball Cap',
      },
      {
        id: 'beanie',
        label: 'Beanie',
      },
    ],
  },
]

const colors = [
  { id: 'red', label: 'Red', hex: '#ff0000' },
  { id: 'blue', label: 'Blue', hex: '#0000ff' },
  { id: 'green', label: 'Green', hex: '#00ff00' },
  { id: 'yellow', label: 'Yellow', hex: '#ffff00' },
  { id: 'orange', label: 'Orange', hex: '#ff8000' },
  { id: 'purple', label: 'Purple', hex: '#8000ff' },
  { id: 'pink', label: 'Pink', hex: '#ff0080' },
  { id: 'black', label: 'Black', hex: '#000000' },
  { id: 'white', label: 'White', hex: '#ffffff' },
  { id: 'gray', label: 'Gray', hex: '#808080' },
  { id: 'brown', label: 'Brown', hex: '#804000' },
  { id: 'tan', label: 'Tan', hex: '#ffbf80' },
  { id: 'navy', label: 'Navy', hex: '#000080' },
  { id: 'olive', label: 'Olive', hex: '#808000' },
  { id: 'maroon', label: 'Maroon', hex: '#800000' },
  { id: 'teal', label: 'Teal', hex: '#008080' },
  { id: 'lime', label: 'Lime', hex: '#00ff80' },
  { id: 'aqua', label: 'Aqua', hex: '#00ffff' },
  { id: 'coral', label: 'Coral', hex: '#ff8080' },
  { id: 'lavender', label: 'Lavender', hex: '#bf80ff' },
  { id: 'magenta', label: 'Magenta', hex: '#ff00ff' },
  { id: 'salmon', label: 'Salmon', hex: '#ff8080' },
  { id: 'turquoise', label: 'Turquoise', hex: '#00ffbf' },
  { id: 'gold', label: 'Gold', hex: '#ffbf00' },
  { id: 'silver', label: 'Silver', hex: '#c0c0c0' },
  { id: 'bronze', label: 'Bronze', hex: '#804000' },
  { id: 'copper', label: 'Copper', hex: '#804000' },
  { id: 'rose-gold', label: 'Rose Gold', hex: '#ffbf80' },
]

export default ProductPicker
