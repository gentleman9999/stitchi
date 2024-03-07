// BigC Requires all product names be unique
// There are instances where brands have the same product name (i.e. "Baseball Pants")
// By adding the SKU to the product name, we can ensure uniqueness and remove this from the name we display
const makeUniqueProductName = (product: {
  name: string;
  brandName: string;
  sku: string;
}) => `${product.name} [${product.sku}]`;

export default makeUniqueProductName;
