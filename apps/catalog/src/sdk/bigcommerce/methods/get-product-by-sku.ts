import {
  bigCommerceApiResponseSchema,
  bigCommerceProductApiSchema,
} from "../api-schema";
import makeClient from "../client";
import * as yup from "yup";
import { BigCommerceProduct, BigCommerceProductMetadata } from "../types";
import { makeProduct } from "../serializer";
import makeBigCommerceRepository, {
  BigCommerceRepository,
} from "../repository";

export type GetProductBySkuFn = (
  sku: string,
  options?: {
    include?: Array<"metadata" | "images" | "custom_fields">;
  }
) => Promise<BigCommerceProduct | null>;

interface Config {
  client: ReturnType<typeof makeClient>;
  repository: BigCommerceRepository;
}

const makeGetProductBySkuFn = (
  { client, repository }: Config = {
    client: makeClient(),
    repository: makeBigCommerceRepository(),
  }
): GetProductBySkuFn => {
  return async (sku, options) => {
    const nonMetadataIncludes = options?.include?.filter(
      (i): i is "images" | "custom_fields" => i !== "metadata"
    );

    const [error, productList] = await client.call(
      `/products?sku=${sku}${
        nonMetadataIncludes?.length
          ? `&include=${nonMetadataIncludes.join(",")}`
          : ""
      }`,
      bigCommerceApiResponseSchema(
        yup.array().of(bigCommerceProductApiSchema.required()).required()
      )
    );

    if (error) {
      throw error;
    }

    if (!productList.data.length) {
      return null;
    }

    if (productList.data.length > 1) {
      console.warn(
        `Found more than one product with sku ${sku}. This should not happen. Using the first one.`
      );
    }

    const product = productList.data[0];

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

    return makeProduct({ ...product, metadata });
  };
};

export default makeGetProductBySkuFn;
