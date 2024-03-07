import * as yup from "yup";
import { BigCommerceProductImage, ResponseTuple } from "../../types";
import { BigCommerceClient } from "../../client";
import {
  bigCommerceApiResponseSchema,
  bigCommerceProductImageSchema,
} from "../../api-schema";
import { makeProductImage } from "../../serializer";

const inputSchema = yup.object().shape({
  productId: yup.number().required(),
  imageUrl: yup.string().required(),
  isThumbnail: yup.boolean().required(),
});

export type CreateProductImageInput = yup.InferType<typeof inputSchema>;

export type CreateProductImageFn = (
  input: CreateProductImageInput
) => Promise<ResponseTuple<BigCommerceProductImage>>;

interface Config {
  client: BigCommerceClient;
}

const makeCreateProductImageFn = ({ client }: Config): CreateProductImageFn => {
  return async function create(input) {
    let validInput;

    try {
      validInput = await inputSchema.validate(input);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return [
          {
            status: 400,
            title: "Invalid product image input",
            errors: JSON.stringify(error.errors),
          },
          null,
        ];
      }

      return [
        {
          status: 500,
          title: "Error validating product image input",
        },
        null,
      ];
    }

    const [error, productImageResponse] = await client.call(
      `/products/${validInput.productId}/images`,
      bigCommerceApiResponseSchema(
        bigCommerceProductImageSchema.optional()
      ).concat(
        yup.object().shape({
          error: yup
            .object()
            .shape({
              status: yup.number().optional(),
              code: yup.string().optional(),
              title: yup.string().optional(),
            })
            .optional(),
        })
      ),
      {
        method: "POST",
        body: JSON.stringify({
          image_url: validInput.imageUrl,
          is_thumbnail: validInput.isThumbnail,
        }),
      }
    );

    if (error) {
      return [error, null];
    }

    if (productImageResponse.error) {
      if (productImageResponse.error.status === 400) {
        return [
          {
            status: 400,
            title: "Invalid product image",
          },
          null,
        ];
      }
    }

    if (!productImageResponse.data) {
      console.error("Error creating product image", {
        context: { error: productImageResponse.error },
      });
      return [
        {
          status: 500,
          title: "Error creating product image",
        },
        null,
      ];
    }

    return [null, makeProductImage(productImageResponse.data)];
  };
};

export default makeCreateProductImageFn;
