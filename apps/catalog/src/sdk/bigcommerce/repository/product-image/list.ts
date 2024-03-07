import * as yup from "yup";
import { BigCommerceClient } from "../../client";
import {
  bigCommerceApiResponseSchema,
  bigCommerceProductImageSchema,
} from "../../api-schema";
import { BigCommerceProductImage } from "../../types";
import { makeProductImage } from "../../serializer";

const querySchema = yup.object().shape({
  productId: yup.number().required(),
  filter: yup
    .object()
    .shape({
      limit: yup.number().required(),
      page: yup.number().required(),
    })
    .required(),
});

export type ListProductImagesQuery = yup.InferType<typeof querySchema>;

export type ListProductImagesFn = (query: ListProductImagesQuery) => Promise<{
  images: BigCommerceProductImage[];
  pagination: { hasNextPage: boolean };
}>;

interface Client {
  client: BigCommerceClient;
}

const makeListProductImagesFn = ({ client }: Client): ListProductImagesFn => {
  return async function list(query) {
    let validQuery;

    try {
      validQuery = await querySchema.validate(query);
    } catch (error) {
      console.error("Error validating product image query", {
        context: { error },
      });

      throw error;
    }

    const { page, limit } = validQuery.filter;

    let productImageData;
    let hasNextPage = false;

    try {
      const [error, listProductImagesResponse] = await client.call(
        `/products/${validQuery.productId}/images?limit=${limit}&page=${page}`,
        bigCommerceApiResponseSchema(
          yup.array().of(bigCommerceProductImageSchema).required()
        )
      );

      if (error) {
        throw error;
      }

      productImageData = listProductImagesResponse.data;
      hasNextPage =
        listProductImagesResponse.meta?.pagination?.total_pages !== page;
    } catch (error) {
      console.error("Error listing product images", {
        context: { error },
      });

      throw error;
    }

    return {
      images: productImageData.map(makeProductImage),
      pagination: {
        hasNextPage,
      },
    };
  };
};

export default makeListProductImagesFn;
