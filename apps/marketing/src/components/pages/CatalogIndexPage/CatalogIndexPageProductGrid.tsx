import React from 'react'
import CatalogIndexPageProduct, {
  Props as ProductProps,
} from './CatalogIndexPageProduct'

export interface Props {
  products: ProductProps['product'][]
}

const CatalogIndexPageProductGrid = (props: Props) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {props.products.map(product => (
        <li key={product.id}>
          <CatalogIndexPageProduct product={product} />
        </li>
      ))}
    </ul>
  )
}

export default CatalogIndexPageProductGrid
