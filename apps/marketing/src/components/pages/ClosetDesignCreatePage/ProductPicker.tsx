import React from 'react'

interface Props {}

const ProductPicker = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<
    (typeof categories)[number]['id'] | null
  >(null)

  const [selectedProduct, setSelectedProduct] = React.useState<
    (typeof categories)[number]['products'][number]['id'] | null
  >(null)

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div>
        {selectedCategory ? (
          <button onClick={() => setSelectedCategory(null)}>Back</button>
        ) : null}
        <h2 className="text-center text-2xl">
          {selectedCategory ? 'Products' : 'Categories'}
        </h2>
        <ul className="flex gap-8">
          {selectedCategory ? (
            <>
              {categories
                .find(category => category.id === selectedCategory)
                ?.products.map(product => (
                  <Item
                    key={product.id}
                    label={product.label}
                    onClick={() => setSelectedProduct(product.id)}
                  />
                ))}
            </>
          ) : (
            <>
              {categories.map(category => (
                <Item
                  key={category.id}
                  label={category.label}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

const Item = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <li className="p-4 border rounded-md">
      <button onClick={onClick}>
        <h2>{label}</h2>
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
] as const

export default ProductPicker
