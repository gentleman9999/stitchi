import {
  bigCommerceApiResponseSchema,
  bigCommerceProductMetadatasApiSchema,
} from "../../api-schema";
import makeClient from "../../client";
import { makeProductMetadata } from "../../serializer";
import { BigCommerceProductMetadata } from "../../types";

export interface ListProductMetadataInput {
  productId: number;
}

export type ListProductMetadataFn = (
  input: ListProductMetadataInput
) => Promise<BigCommerceProductMetadata[]>;

interface Config {
  client: ReturnType<typeof makeClient>;
}

const makeListProductMetadataFn = ({
  client,
}: Config): ListProductMetadataFn => {
  return async function list(input) {
    let productMetadataData;

    try {
      const [error, listMetafieldsResponse] = await client.call(
        `/products/${input.productId}/metafields`,
        bigCommerceApiResponseSchema(
          bigCommerceProductMetadatasApiSchema.required()
        ),
        {
          method: "GET",
        }
      );

      if (error) {
        throw error;
      }

      productMetadataData = listMetafieldsResponse.data;
    } catch (error) {
      console.error("Error listing product metadata", {
        context: { error },
      });

      throw error;
    }

    return productMetadataData.map(makeProductMetadata);
  };
};

export default makeListProductMetadataFn;
