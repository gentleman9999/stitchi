import { BigCommerceProduct } from "../types";
import { UpdateProductInput } from "../repository/product/update";
import makeBigCommerceRepository, {
  BigCommerceRepository,
} from "../repository";
import { BatchCreateProductMetadataInput } from "../repository/product-metadata/batch-create";
import { BatchUpdateProductMetadataInput } from "../repository/product-metadata/batch-update";

export type UpdateProductFn = (
  input: UpdateProductInput & {
    metadata:
      | BatchCreateProductMetadataInput["metadata"]
      | BatchUpdateProductMetadataInput["metadata"];
  }
) => Promise<BigCommerceProduct>;

interface Client {
  bigCommerceRepository: BigCommerceRepository;
}

export const makeUpdateProductFn = (
  { bigCommerceRepository }: Client = {
    bigCommerceRepository: makeBigCommerceRepository(),
  }
): UpdateProductFn => {
  return async (input) => {
    const { images: imageInput, ...productInput } = input;

    let product: BigCommerceProduct;

    try {
      product = await bigCommerceRepository.updateProduct(productInput, {
        include: ["images"],
      });

      let index = 1;

      while (product.url === null) {
        let newUrl;

        if (input.url) {
          newUrl = input.url.slice(0, input.url.length - 1) + `-${index}/`;
        }

        if (newUrl) {
          product = await bigCommerceRepository.updateProduct({
            id: product.id,
            availability: product.availability,
            url: newUrl,
          });
        } else {
          break;
        }

        if (index > 10) {
          // Prevent infinite loop
          break;
        }

        index++;
      }
    } catch (error) {
      console.error("Error updating product", {
        context: { error },
      });

      throw error;
    }

    const metadataToCreate: BatchCreateProductMetadataInput["metadata"] = [];
    const metadataToUpdate: BatchUpdateProductMetadataInput["metadata"] = [];

    for (const metadata of input.metadata) {
      if ("id" in metadata) {
        metadataToUpdate.push(metadata);
      } else {
        metadataToCreate.push(metadata);
      }
    }

    try {
      await bigCommerceRepository.batchCreateProductMetadata({
        productId: product.id,
        metadata: metadataToCreate.map((metadata) => ({
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

    try {
      await bigCommerceRepository.batchUpdateProductMetadata({
        metadata: metadataToUpdate.map((metadata) => ({
          id: metadata.id,
          key: metadata.key,
          namespace: metadata.namespace,
          permission_set: metadata.permission_set,
          value: metadata.value,
        })),
      });
    } catch (error) {
      console.error("Error updating product metadata", {
        context: { error },
      });
    }

    return product;
  };
};
