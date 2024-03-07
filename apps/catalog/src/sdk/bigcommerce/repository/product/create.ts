import * as yup from "yup";
import { BigCommerceProduct } from "../../types";
import makeClient from "../../client";
import { makeProduct } from "../../serializer";
import {
  bigCommerceApiResponseSchema,
  bigCommerceCustomFieldApiSchema,
  bigCommerceProductApiSchema,
} from "../../api-schema";
import filterValidImages from "../../utils/filter-valid-images";

const inputSchema = yup.object().shape({
  visible: yup.boolean().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  sku: yup.string().required(),
  categoryIds: yup.array(yup.number().required()).required(),
  brandName: yup.string().required(),
  availability: yup
    .string()
    .oneOf(["available", "disabled", "preorder"])
    .required(),
  inventoryTracking: yup
    .string()
    .oneOf(["none", "variant", "product"])
    .required(),
  url: yup.string().required(),
  images: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          imageUrl: yup.string().required(),
          isThumbnail: yup.boolean().required(),
        })
        .required()
    )
    .nullable(),
  customFields: yup
    .array()
    .of(bigCommerceCustomFieldApiSchema.omit(["id"]).required()),
});

export type CreateProductInput = yup.InferType<typeof inputSchema>;

export type CreateProductFn = (
  productInput: CreateProductInput
) => Promise<BigCommerceProduct>;

interface Client {
  client: ReturnType<typeof makeClient>;
}

const makeCreateProductFn = ({ client }: Client): CreateProductFn => {
  return async function create(product) {
    let validInput;

    try {
      validInput = await inputSchema.validate(product);
    } catch (error) {
      console.error("Error validating product input", {
        context: { error },
      });

      throw error;
    }

    const copiedValidInput = { ...validInput };

    const validImages = await filterValidImages(copiedValidInput.images || []);

    let productData;

    const [error, productResponse] = await client.call(
      "/products",
      bigCommerceApiResponseSchema(bigCommerceProductApiSchema.required()),
      {
        method: "POST",
        body: JSON.stringify({
          type: "physical",
          // We set price on the variant, not the product
          price: 0,
          // We set weight on the variant, not the product
          weight: 0,
          is_visible: copiedValidInput.visible,
          name: copiedValidInput.name,
          description: copiedValidInput.description,
          sku: copiedValidInput.sku,
          categories: copiedValidInput.categoryIds,
          brand_name: copiedValidInput.brandName,
          availability: copiedValidInput.availability,
          inventory_tracking: copiedValidInput.inventoryTracking,
          custom_url: {
            // By default, the url is the BigCommerce product name
            // Our BigCommerce product names are BRAND NAME + PRODUCT NAME + [SKU] in order for them to be unique
            // In order to support backwards compatibility and keep URLs clean (without the SKU), we create a custom URL
            // This only happens on product creation
            url: copiedValidInput.url,
            is_customized: true,
          },
          images: validImages.map((image) => ({
            image_url: image.imageUrl,
            is_thumbnail: image.isThumbnail,
          })),
          custom_fields: validInput.customFields?.map((field) => ({
            name: field.name,
            value: field.value,
          })),
        }),
      }
    );

    if (error) {
      console.error("Error creating product", {
        context: { error },
      });

      throw error;
    }

    productData = productResponse.data;

    return makeProduct({ ...productData, metadata: [] });
  };
};

export default makeCreateProductFn;
