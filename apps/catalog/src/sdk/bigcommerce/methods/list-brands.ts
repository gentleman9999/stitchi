import {
  bigCommerceApiResponseSchema,
  bigCommerceBrandsApiSchema,
} from "../api-schema";
import makeClient from "../client";
import { makeBrand } from "../serializer";
import { BigCommerceBrand } from "../types";

export type ListBrandsFnInput = {
  limit: number;
  page: number;
};

export type ListBrandsFn = (input: ListBrandsFnInput) => Promise<{
  brands: BigCommerceBrand[];
  pagination: {
    hasNextPage: boolean;
  };
}>;

interface Config {
  client: ReturnType<typeof makeClient>;
}

const makeListBrandsFn = (
  { client }: Config = {
    client: makeClient(),
  }
): ListBrandsFn => {
  return async (input) => {
    const [error, res] = await client.call(
      `/brands?limit=${input.limit}&page=${input.page}`,
      bigCommerceApiResponseSchema(bigCommerceBrandsApiSchema.required())
    );

    if (error) {
      console.error("Error fetching brands", {
        context: { error },
      });

      throw error;
    }

    const { pagination } = res.meta || {};

    return {
      brands: res.data.map(makeBrand),
      pagination: {
        hasNextPage: pagination?.current_page !== pagination?.total_pages,
      },
    };
  };
};

export default makeListBrandsFn;
