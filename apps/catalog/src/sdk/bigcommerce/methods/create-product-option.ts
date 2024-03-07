import * as yup from "yup";
import {
  BigCommerceProductOptionType,
  BigCommerceProductVariantOption,
} from "../types";
import makeClient from "../client";
import {
  bigCommerceApiProductOptionSchema,
  bigCommerceApiResponseSchema,
} from "../api-schema";
import { makeProductVariantOption } from "../serializer";

const inputSchema = yup.object().shape({
  productId: yup.number().required(),
  displayName: yup.string().required(),
  type: yup
    .string()
    .oneOf(Object.values(BigCommerceProductOptionType))
    .required(),
  optionValues: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          label: yup.string().required(),
          sortOrder: yup.number().required(),
          valueData: yup.array().of(yup.string().required()).optional(),
        })
        .required()
    )
    .required(),
});

type ProductOptionInput = yup.InferType<typeof inputSchema>;

export type CreateProductOptionFn = (
  productOptionInput: ProductOptionInput
) => Promise<BigCommerceProductVariantOption>;

interface Client {
  client: ReturnType<typeof makeClient>;
}

const makeCreateProductOptionFn = (
  { client }: Client = {
    client: makeClient(),
  }
): CreateProductOptionFn => {
  return async (productOption) => {
    let validInput;

    try {
      validInput = await inputSchema.validate(productOption);
    } catch (error) {
      console.error("Error validating product option input", {
        error,
        params: error instanceof yup.ValidationError ? error.params : null,
      });

      throw error;
    }

    const [error, response] = await client.call(
      `/products/${validInput.productId}/options`,
      bigCommerceApiResponseSchema(
        bigCommerceApiProductOptionSchema.required()
      ),
      {
        method: "POST",
        body: JSON.stringify({
          display_name: validInput.displayName,
          type: validInput.type,
          option_values: validInput.optionValues.map((optionValue) => ({
            label: optionValue.label,
            sort_order: optionValue.sortOrder,
            value_data: optionValue.valueData
              ? {
                  colors: optionValue.valueData,
                }
              : undefined,
          })),
        }),
      }
    );

    if (error) {
      console.error("Error creating product option", {
        error,
      });

      throw error;
    }

    return makeProductVariantOption(response.data);
  };
};

export default makeCreateProductOptionFn;
