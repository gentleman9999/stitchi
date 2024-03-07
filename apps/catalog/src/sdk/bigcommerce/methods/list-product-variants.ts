import {
  BigCommerceApiProductVariantSchema,
  bigCommerceApiProductVariantSchema,
  bigCommerceApiResponseSchema,
} from "../api-schema";
import makeClient from "../client";
import { makeProductVariant } from "../serializer";
import { BigCommerceProductVariant } from "../types";
import * as yup from "yup";

export type ListProductVariantsFn = (filter: {
  page: number;
  limit: number;
  productId: number;
}) => Promise<{
  productVariants: BigCommerceProductVariant[];
  hasNextPage: boolean;
}>;

interface Config {
  client: ReturnType<typeof makeClient>;
}

const makeListProductVariantsFn = (
  { client }: Config = {
    client: makeClient(),
  }
): ListProductVariantsFn => {
  return async (filter) => {
    let productVariantsResponse: BigCommerceApiProductVariantSchema[] = [];

    const { page, limit, productId } = filter;

    let hasNextPage = false;

    const [error, res] = await client.call(
      `/products/${productId}/variants?limit=${limit}&page=${page}`,
      bigCommerceApiResponseSchema(
        yup.array().of(bigCommerceApiProductVariantSchema.required()).required()
      )
    );

    if (error) {
      console.error("Error fetching product variants", {
        context: { error },
      });

      throw error;
    }

    productVariantsResponse.push(...res.data);

    const { pagination } = res.meta || {};

    if (!pagination?.current_page || !pagination?.total_pages) {
      hasNextPage = false;
    } else if (pagination.current_page >= pagination.total_pages) {
      hasNextPage = false;
    } else {
      hasNextPage = true;
    }

    return {
      hasNextPage,
      productVariants: productVariantsResponse.map(makeProductVariant),
    };
  };
};

export default makeListProductVariantsFn;
