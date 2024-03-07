export const makeProductUrl = (product: {
  brandName: string;
  name: string;
}) => {
  const slug = `${product.brandName} ${product.name}`
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/gi, "") // Remove invalid characters
    .replace(/--+/g, "-") // Replace multiple hyphens with a single one
    .toLowerCase();

  return `/${slug}/`;
};
