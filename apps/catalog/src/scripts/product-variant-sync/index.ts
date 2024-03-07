import chalk from "chalk";
import makeSdks, { BigCommerceProduct } from "../../sdk";
import chunkArray from "../../utils/chunk-array";
import { updateProductVariants } from "./update-product-variants";
import generateSummary from "./generate-summary";

const { bigCommerce, ssactivewear } = makeSdks();

/**
 * This script will sync product variants from SS Activewear to BigCommerce.
 * This script is idempotent, so it can be run multiple times without duplicating product variants.
 */
const start = async () => {
  console.info(chalk.green("Starting product variant sync...\n"));

  const successfulProducts: BigCommerceProduct[] = [];
  const erroredProducts: BigCommerceProduct[] = [];

  let productListPage = 1;
  let productListHasNextPage = true;

  while (productListHasNextPage) {
    let products: BigCommerceProduct[] = [];

    // try {
    //   const response = await bigCommerce.listProducts(
    //     {
    //       limit: 50,
    //       page: productListPage,
    //     },
    //     {
    //       includeMetadata: true,
    //     }
    //   );

    //   products = response.products;
    //   productListHasNextPage = response.hasNextPage;
    // } catch (error) {
    //   console.error("Error fetching products from BigCommerce", {
    //     context: { error },
    //   });

    //   break;
    // }
    productListHasNextPage = false;

    products = [
      await bigCommerce.getProduct(
        { productId: 10282 },
        { include: ["metadata"] }
      ),
    ];

    console.log(products);

    const BATCH_SIZE = 10;

    const productBatches = chunkArray(products, BATCH_SIZE);

    for (let i = 0; i < productBatches.length; i++) {
      const batch = productBatches[i];

      const productUpdatePromises = batch.map(async (product) => {
        try {
          await updateProductVariants(
            {
              bigCommerceProduct: product,
            },
            {
              ssactivewear,
              bigCommerce,
            }
          );

          successfulProducts.push(product);
        } catch (error) {
          erroredProducts.push(product);

          console.error("Error updating product", {
            context: { error },
          });
        }
      });

      try {
        await Promise.all(productUpdatePromises);
      } catch (error) {
        console.error("Error updating products", {
          context: { error },
        });
      }
    }
  }

  generateSummary({
    erroredProductsCount: erroredProducts.length,
    successfulProductsCount: successfulProducts.length,
  });
};

start()
  .catch((err) => {
    console.error(chalk.red("Unhandled error in start function:"), err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
