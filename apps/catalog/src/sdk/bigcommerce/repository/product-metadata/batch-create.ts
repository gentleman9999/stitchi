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
  productId: yup.number().required(),
  metadata: yup
    .array()
    .of(
      bigCommerceProductMetadataApiSchema.omit([
        "id",
        "resource_id",
        "resource_type",
        "date_created",
        "date_modified",
      ])
    )
    .required(),
});

export type BatchCreateProductMetadataInput = yup.InferType<typeof inputSchema>;

export type BatchCreateProductMetadataFn = (
  input: BatchCreateProductMetadataInput
) => Promise<BigCommerceProductMetadata[]>;

interface Config {
  client: ReturnType<typeof makeClient>;
}

const makeBatchCreateProductMetadataFn = ({
  client,
}: Config): BatchCreateProductMetadataFn => {
  return async function batchCreate(input) {
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
      const [error, createProductMetafieldsResponse] = await client.call(
        `/products/metafields`,
        bigCommerceApiResponseSchema(
          bigCommerceProductMetadatasApiSchema.required()
        ),
        {
          method: "POST",
          body: JSON.stringify(
            coppiedValidInput.metadata.map((metadata) => ({
              resource_id: coppiedValidInput.productId,
              key: metadata.key,
              value: metadata.value,
              permission_set: metadata.permission_set,
              namespace: metadata.namespace,
            }))
          ),
        }
      );

      if (error) {
        throw error;
      }

      productMetadataData = createProductMetafieldsResponse.data;
    } catch (error) {
      console.error("Error batch creating product metadata", {
        context: { error },
      });

      throw error;
    }

    return productMetadataData.map(makeProductMetadata);
  };
};

export default makeBatchCreateProductMetadataFn;
