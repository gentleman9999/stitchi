import {
  BigCommerceProduct,
  BigCommerceProductVariant,
} from '../../bigcommerce'

export interface ProductFactoryProduct extends Omit<BigCommerceProduct, ''> {}

const productFactory = ({
  bigCommerceProduct,
}: {
  bigCommerceProduct: BigCommerceProduct
}): ProductFactoryProduct => {
  return {
    ...bigCommerceProduct,
  }
}

export interface ProductFactoryProductVariant
  extends Omit<BigCommerceProductVariant, 'price'> {
  priceCents: number
}

const productVariantFactory = ({
  bigCommerceProductVariant,
}: {
  bigCommerceProductVariant: BigCommerceProductVariant
}): ProductFactoryProductVariant => {
  return {
    ...bigCommerceProductVariant,
    priceCents: Math.round(bigCommerceProductVariant.price * 100),
  }
}

export { productFactory, productVariantFactory }
