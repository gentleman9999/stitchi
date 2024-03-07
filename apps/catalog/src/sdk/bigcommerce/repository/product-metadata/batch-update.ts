import * as yup from "yup";
import {
  bigCommerceApiResponseSchema,
  bigCommerceProductMetadataApiSchema,
  bigCommerceProductMetadatasApiSchema,
} from "../../api-schema";
import { BigCommerceProductMetadata } from "../../types";
import makeClient from "../../client";
import { makeProductMetadata } from "../../serializer";

const inputSchema = yup.object().shape({
  metadata: yup
    .array()
    .of(
      bigCommerceProductMetadataApiSchema
        .omit(["resource_id", "resource_type", "date_created", "date_modified"])
        .required()
    )
    .required(),
});

export type BatchUpdateProductMetadataInput = yup.InferType<typeof inputSchema>;

export type BatchUpdateProductMetadataFn = (
  input: BatchUpdateProductMetadataInput
) => Promise<BigCommerceProductMetadata[]>;

interface Config {
  client: ReturnType<typeof makeClient>;
}

const makeBatchUpdateProductMetadataFn = ({
  client,
}: Config): BatchUpdateProductMetadataFn => {
  return async function batchUpdate(input) {
    let validInput;

    try {
      validInput = await inputSchema.validate(input);
    } catch (error) {
      console.error("Error validating product metadata input", {
        context: { error },
      });

      throw error;
    }

    if (!validInput.metadata.length) {
      return [];
    }

    const coppiedValidInput = { ...validInput };

    let productMetadataData;

    try {
      const [error, batchUpdateMetafieldsResponse] = await client.call(
        `/products/metafields`,
        bigCommerceApiResponseSchema(
          bigCommerceProductMetadatasApiSchema.required()
        ),
        {
          method: "PUT",
          body: JSON.stringify(
            coppiedValidInput.metadata.map((metadata) => ({
              id: metadata.id,
              key: metadata.key,
              value: metadata.value,
              namespace: metadata.namespace,
              permission_set: metadata.permission_set,
            }))
          ),
        }
      );

      if (error) {
        throw error;
      }

      productMetadataData = batchUpdateMetafieldsResponse.data;
    } catch (error) {
      console.error("Error updating product metadata", {
        context: { error },
      });

      throw error;
    }

    return productMetadataData.map(makeProductMetadata);
  };
};

export default makeBatchUpdateProductMetadataFn;
