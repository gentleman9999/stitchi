import * as yup from "yup";
import makeClient from "../../client";
import {
  bigCommerceApiResponseSchema,
  bigCommerceProductMetadatasApiSchema,
  bigCommerceProductVariantMetadataApiSchema,
  bigCommerceProductVariantMetadatasApiSchema,
} from "../../api-schema";
import makeFilenameFromSSImageUrl from "../../utils/make-filename-from-image-url";

const inputSchema = yup.object().shape({
  productId: yup.number().required(),
  variantId: yup.number().required(),
  imageUrl: yup.string().required(),
});

export type UpdateProductVariantImageInput = yup.InferType<typeof inputSchema>;

export type UpdateProductVariantImageFn = (
  input: UpdateProductVariantImageInput
) => Promise<void>;

interface Client {
  client: ReturnType<typeof makeClient>;
}

const makeUpdateProductVariantImageFn = (
  { client }: Client = {
    client: makeClient(),
  }
): UpdateProductVariantImageFn => {
  return async (input) => {
    let validInput;

    try {
      validInput = await inputSchema.validate(input);
    } catch (error) {
      console.error("Error validating input", {
        context: { error },
      });

      throw error;
    }

    try {
      await client.call(
        `/products/${input.productId}/variants/${input.variantId}/image`,
        bigCommerceApiResponseSchema(
          yup.object().shape({
            image_url: yup.string().required(),
          })
        ),
        {
          method: "POST",
          body: JSON.stringify({
            image_url: input.imageUrl,
          }),
        }
      );
    } catch (error) {
      console.error("Error creating product variant image", {
        context: { error },
      });

      throw error;
    }

    // ***
    // We store the image group so that after BIGC changes the variant image URL we can still reference the remaining images on the product level.
    // ***

    let imageGroupMetafield;

    const [error, res] = await client.call(
      `/products/${input.productId}/variants/${input.variantId}/metafields?key:in=image_group`,
      bigCommerceApiResponseSchema(
        bigCommerceProductVariantMetadatasApiSchema.required()
      ),
      {
        method: "GET",
      }
    );

    imageGroupMetafield = res?.data[0];

    if (error) {
      console.error("Error fetching product variant metafields", {
        context: { error },
      });

      throw error;
    }

    const groupName = makeFilenameFromSSImageUrl(input.imageUrl)
      ?.split("_")
      .shift();

    const update =
      imageGroupMetafield && imageGroupMetafield.value !== groupName;

    if (
      groupName &&
      (imageGroupMetafield?.value !== groupName ||
        imageGroupMetafield.permission_set !== "write_and_sf_access")
    ) {
      const [metafieldError] = await client.call(
        `/products/${input.productId}/variants/${input.variantId}/metafields${
          imageGroupMetafield ? `/${imageGroupMetafield.id}` : ""
        }`,
        bigCommerceApiResponseSchema(
          bigCommerceProductVariantMetadataApiSchema.required()
        ),
        {
          method: imageGroupMetafield ? "PUT" : "POST",
          body: JSON.stringify({
            key: "image_group",
            value: groupName,
            namespace: "main",
            permission_set: "write_and_sf_access",
          }),
        }
      );

      if (metafieldError) {
        console.error(
          `Error ${update ? "updating" : "creating"} product variant metafield`,
          {
            context: { error: metafieldError },
          }
        );

        throw metafieldError;
      }
    }
  };
};

export default makeUpdateProductVariantImageFn;
