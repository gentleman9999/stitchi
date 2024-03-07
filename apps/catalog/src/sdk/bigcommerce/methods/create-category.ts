import {
  bigCommerceApiResponseSchema,
  bigCommerceCategoryApiSchema,
  bigCommerceCategoryMetadataApiSchema,
} from "../api-schema";
import makeClient from "../client";
import { makeCategory } from "../serializer";
import { BigCommerceCategory, BigCommerceCategoryMetadataKey } from "../types";
import * as yup from "yup";

const inputSchema = yup.object().shape({
  name: yup.string().required(),
  metadata: yup.object().shape({
    ssactivewearCategoryId: yup.string().required(),
  }),
});

type CategoryInput = yup.InferType<typeof inputSchema>;

export type CreateCategoryFn = (
  categoryInput: CategoryInput
) => Promise<BigCommerceCategory>;

interface Client {
  client: ReturnType<typeof makeClient>;
}

const makeCreateCategoryFn = (
  { client }: Client = {
    client: makeClient(),
  }
): CreateCategoryFn => {
  return async (category) => {
    let validInput;

    try {
      validInput = await inputSchema.validate(category);
    } catch (error) {
      console.error("Error validating category input", {
        context: { error },
      });

      throw error;
    }

    let categoryData;

    try {
      const [error, categoryResponse] = await client.call(
        "/categories",
        bigCommerceApiResponseSchema(bigCommerceCategoryApiSchema.required()),
        {
          method: "POST",
          body: JSON.stringify({
            tree_id: 0,
            parent_id: 0,
            name: validInput.name,
            is_visible: false,
          }),
        }
      );

      if (error) {
        throw error;
      }

      categoryData = categoryResponse.data;
    } catch (error) {
      console.error("Error creating category", {
        context: { error },
      });

      throw error;
    }

    let categoryMetadata;

    try {
      const [error, categoryMetafieldsResponse] = await client.call(
        `/categories/${categoryData.id}/metafields`,
        bigCommerceApiResponseSchema(
          bigCommerceCategoryMetadataApiSchema.required()
        ),
        {
          method: "POST",
          body: JSON.stringify({
            key: BigCommerceCategoryMetadataKey.ssactivewear_category_id,
            value: category.metadata.ssactivewearCategoryId,
            namespace: "ss_activewear",
            permission_set: "read",
          }),
        }
      );

      if (error) {
        throw error;
      }

      categoryMetadata = categoryMetafieldsResponse.data;
    } catch (error) {
      console.error("Error creating category metadata", {
        context: { error },
      });

      throw error;
    }

    return makeCategory(categoryData, [categoryMetadata]);
  };
};

export default makeCreateCategoryFn;
