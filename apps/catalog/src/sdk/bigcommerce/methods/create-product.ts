import { BigCommerceProduct } from "../types";
import makeBigCommerceRepository, {
  BigCommerceRepository,
} from "../repository";
import { CreateProductInput } from "../repository/product/create";
import { BatchCreateProductMetadataInput } from "../repository/product-metadata/batch-create";

export type CreateProductFn = (
  input: CreateProductInput & {
    metadata: BatchCreateProductMetadataInput["metadata"];
  }
) => Promise<BigCommerceProduct>;

interface Client {
  bigCommerceRepository: BigCommerceRepository;
}

const makeCreateProductFn = (
  { bigCommerceRepository }: Client = {
    bigCommerceRepository: makeBigCommerceRepository(),
  }
): CreateProductFn => {
  return async (input) => {
    const { images, ...productInput } = input;

    let product;

    try {
      product = await bigCommerceRepository.createProduct({
        ...productInput,
        images,
      });

      let index = 1;

      while (product.url === null) {
        const possiblyUniqueUrl =
          input.url?.slice(0, input.url.length - 1) + `-${index}/`; // Remove trailing slash then add index

        product = await bigCommerceRepository.updateProduct({
          id: product.id,
          availability: product.availability,
          url: possiblyUniqueUrl,
        });

        if (index > 10) {
          // Prevent infinite loop
          break;
        }
        index++;
      }
    } catch (error) {
      console.error("Error creating product", {
        context: { error },
      });

      throw error;
    }

    try {
      await bigCommerceRepository.batchCreateProductMetadata({
        productId: product.id,
        metadata: input.metadata.map((metadata) => ({
          key: metadata.key,
          namespace: metadata.namespace,
          permission_set: metadata.permission_set,
          value: metadata.value,
        })),
      });
    } catch (error) {
      console.error("Error creating product metadata", {
        context: { error },
      });
    }

    return product;
  };
};

export default makeCreateProductFn;
