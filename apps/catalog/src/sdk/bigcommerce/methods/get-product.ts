import makeBigCommerceRepository, {
  BigCommerceRepository,
} from "../repository";
import { GetProductInput } from "../repository/product/get";
import { makeProduct } from "../serializer";
import { BigCommerceProduct, BigCommerceProductMetadata } from "../types";

export type GetProductFn = (
  input: GetProductInput,
  options?: {
    include?: Array<"metadata" | "images" | "custom_fields">;
  }
) => Promise<BigCommerceProduct>;

interface Config {
  repository: BigCommerceRepository;
}

const makeGetProductFn = (
  { repository }: Config = {
    repository: makeBigCommerceRepository(),
  }
): GetProductFn => {
  return async function get(input, options) {
    const product = await repository.getProduct(input, {
      include: options?.include?.filter(
        (i): i is "images" | "custom_fields" => i !== "metadata"
      ),
    });

    let metadata: BigCommerceProductMetadata[] = [];

    if (options?.include?.includes("metadata")) {
      try {
        metadata = await repository.listProductMetadata({
          productId: product.id,
        });
      } catch (error) {
        console.error("Error listing product metadata", {
          context: { error },
        });
      }
    }

    return makeProduct({
      ...product,
      metadata,
    });
  };
};

export default makeGetProductFn;
