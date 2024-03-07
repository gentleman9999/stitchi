import {
  bigCommerceApiResponseSchema,
  bigCommerceProductApiSchema,
} from "../../api-schema";
import makeClient from "../../client";
import { makeProduct } from "../../serializer";
import { BigCommerceProduct } from "../../types";

export type GetProductInput = {
  productId: number;
};

export type GetProductFn = (
  input: GetProductInput,
  options?: {
    include?: Array<"images" | "custom_fields">;
  }
) => Promise<BigCommerceProduct>;

interface Config {
  client: ReturnType<typeof makeClient>;
}

const makeGetProductFn = ({ client }: Config): GetProductFn => {
  return async function get(input, options) {
    let include = "";

    if (options?.include?.length) {
      include = `?include=${Array.from(new Set(options.include)).join(",")}`;
    }

    const [error, res] = await client.call(
      `/products/${input.productId}${include}`,
      bigCommerceApiResponseSchema(bigCommerceProductApiSchema.required())
    );

    if (error) {
      console.error("Error fetching product", {
        context: { error },
      });

      throw error;
    }

    return makeProduct({ ...res.data, metadata: [] });
  };
};

export default makeGetProductFn;
