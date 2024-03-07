import {
  BigCommerceApiProductOptionSchema,
  bigCommerceApiProductOptionSchema,
  bigCommerceApiResponseSchema,
} from "../api-schema";
import makeClient from "../client";
import { makeProductVariantOption } from "../serializer";
import { BigCommerceProductVariantOption } from "../types";
import * as yup from "yup";

export type ListProductOptionsFn = (filter: { productId: number }) => Promise<{
  productVariantOptions: BigCommerceProductVariantOption[];
}>;

interface Config {
  client: ReturnType<typeof makeClient>;
}

const makeListProductOptionsFn = (
  { client }: Config = {
    client: makeClient(),
  }
): ListProductOptionsFn => {
  return async (filter) => {
    let productVariantOptions: BigCommerceApiProductOptionSchema[] = [];

    const { productId } = filter;

    const [error, res] = await client.call(
      `/products/${productId}/options`,
      bigCommerceApiResponseSchema(
        yup.array().of(bigCommerceApiProductOptionSchema.required()).required()
      ),
      {
        method: "GET",
      }
    );

    if (error) {
      console.error("Error fetching product options", {
        context: { error },
      });

      throw error;
    }

    productVariantOptions = res.data;

    return {
      productVariantOptions: productVariantOptions.map(
        makeProductVariantOption
      ),
    };
  };
};

export default makeListProductOptionsFn;
