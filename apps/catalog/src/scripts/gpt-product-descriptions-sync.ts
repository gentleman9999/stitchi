import chalk from "chalk";
import process from "process";
import makeSdks from "../sdk";
import chunkArray from "../utils/chunk-array";
import { notEmpty } from "../utils/typescript";
import { BigCommerceBrand } from "../sdk/bigcommerce/types";

const sdks = makeSdks();

/**
 * This script is used to update default product descriptions in BigCommerce with GPT-optimized descriptions.
 * If we've previously created a GPT-optimized description, we should not overwrite it.
 */
const start = async () => {
  console.info(chalk.green("Starting product GPT description sync... \n"));

  const bigCommerceCategories = await sdks.bigCommerce.listCategories();

  const brands: BigCommerceBrand[] = [];

  let hasNextPage = true;
  let page = 1;

  while (hasNextPage) {
    const { brands: fetchedBrands, pagination } =
      await sdks.bigCommerce.listBrands({
        page,
        limit: 250,
      });

    brands.push(...fetchedBrands);
    hasNextPage = pagination.hasNextPage;
    page += 1;
  }

  page = 1;
  hasNextPage = true;

  while (hasNextPage) {
    const { products, hasNextPage: next } = await sdks.bigCommerce.listProducts(
      {
        page,
      },
      { includeMetadata: true }
    );

    hasNextPage = next;

    const chunkedProducts = chunkArray(products, 20);

    for (const productChunk of chunkedProducts) {
      const productPromises = productChunk.map(async (product) => {
        let updatedDescription;

        const categories = product.categoryIds
          .map((categoryId) => {
            const category = bigCommerceCategories.find(
              (category) => category.id === categoryId
            );

            return category?.name;
          })
          .filter(notEmpty);

        const brand = brands.find((brand) => brand.id === product.brandId);

        let ssActivewearProduct;

        if (product.metadataMap?.styleId) {
          ssActivewearProduct = await sdks.ssactivewear.getProduct({
            productId: product.metadataMap?.styleId?.toString(),
          });
        }

        if (!ssActivewearProduct) {
          // If we don't have the base description, we should avoid using AI to update
          return;
        }

        try {
          updatedDescription = await sdks.ai.generateProductDescription({
            name: product.name.split("[")[0],
            brand: brand?.name || "",
            categories: categories,
            description: ssActivewearProduct.description || "",
          });
        } catch (error) {
          console.error(
            `Error generating description for ${product.name}`,
            error
          );

          return;
        }

        const updatedAtField = product.metadata?.find(
          (field) => field.key === "updated_description_at"
        );

        let updatedProduct;

        try {
          updatedProduct = await sdks.bigCommerce.updateProduct({
            id: product.id,
            description: updatedDescription,
            metadata: [
              {
                ...(updatedAtField?.id && { id: updatedAtField.id }),
                key: "updated_description_at",
                value: new Date().toISOString(),
                namespace: "main",
                permission_set: "write_and_sf_access",
              },
            ],
          });

          return updatedProduct;
        } catch (error) {
          console.error(
            `Error updating description for ${product.name}`,
            error
          );

          return;
        }
      });

      await Promise.all(productPromises);
    }
  }
};

start()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
