import {
  BigCommerceBrand,
  BigCommerceCategory,
  BigCommerceCategoryMetadataKey,
  BigCommerceProduct,
  BigCommerceProductImage,
  BigCommerceProductMetadata,
  BigCommerceProductOptionType,
  BigCommerceProductVariant,
  BigCommerceProductVariantMetadata,
  BigCommerceProductVariantOption,
} from "./types";
import {
  BigCommerceApiProductOptionSchema,
  BigCommerceApiProductVariantSchema,
  BigCommerceBrandApiSchema,
  BigCommerceCategoryApiSchema,
  BigCommerceCategoryMetadatasApiSchema,
  BigCommerceProductApiSchema,
  BigCommerceProductImageSchema,
  BigCommerceProductMetadataApiSchema,
  BigCommerceProductVariantMetadataApiSchema,
} from "./api-schema";
import { assertNever } from "../../utils/typescript";

export const makeCategory = (
  category: BigCommerceCategoryApiSchema,
  categoryMetadata: BigCommerceCategoryMetadatasApiSchema
): BigCommerceCategory => {
  let meta: BigCommerceCategory["metadata"] = {};

  for (const metadata of categoryMetadata) {
    if (
      metadata.key === BigCommerceCategoryMetadataKey.ssactivewear_category_id
    ) {
      meta.ssActivewearCategoryId = metadata.value;
    }
  }

  return {
    id: category.id,
    description: category.description,
    imageUrl: category.image_url,
    name: category.name,
    parentId: category.parent_id,
    slug: category.custom_url.url,
    visible: category.is_visible,
    metadata: meta,
  };
};

export const makeProductMetadata = (
  metadata: BigCommerceProductMetadataApiSchema
): BigCommerceProductMetadata => {
  const shared = {
    id: metadata.id,
    namespace: metadata.namespace,
    permissionSet: metadata.permission_set,
    resourceId: metadata.resource_id,
    resourceType: metadata.resource_type,
    dateCreated: metadata.date_created,
    dateModified: metadata.date_modified,
  };

  switch (metadata.key) {
    case "source":
      return {
        ...shared,
        key: "source",
        value: metadata.value as "ss-activewear",
      };
    case "style_id":
      return {
        ...shared,
        key: "style_id",
        value: metadata.value,
      };
    case "updated_description_at":
      return {
        ...shared,
        key: "updated_description_at",
        value: metadata.value,
      };

    case "display_name":
      return {
        ...shared,
        key: "display_name",
        value: metadata.value,
      };
    default:
      assertNever(metadata.key);
  }
};

export const makeProduct = (
  product:
    | (BigCommerceProductApiSchema & {
        metadata: BigCommerceProductMetadata[];
      })
    | BigCommerceProduct
): BigCommerceProduct => {
  const metadataMap: BigCommerceProduct["metadataMap"] = {};

  for (const meta of product.metadata || []) {
    switch (meta.key) {
      case "source":
        metadataMap.source = meta.value as "ss-activewear";
        break;
      case "style_id":
        metadataMap.styleId = meta.value;
        break;
      case "updated_description_at":
        metadataMap.updatedDescriptionAt = meta.value;
        break;
      case "display_name":
        metadataMap.displayName = meta.value;
        break;
    }
  }

  const isBigCommerceApiSchema = (
    product: any
  ): product is BigCommerceProductApiSchema => {
    return "brand_id" in product;
  };

  if (isBigCommerceApiSchema(product)) {
    return {
      metadata: product.metadata,
      metadataMap,
      id: product.id,
      brandId: product.brand_id,
      sku: product.sku,
      name: product.name,
      categoryIds: product.categories || [],
      brandName: product.brand_name,
      description: product.description,
      inventoryTracking: product.inventory_tracking,
      availability: product.availability,
      images: product.images?.map(makeProductImage),
      url: product.custom_url?.url || null,
      customFields: product.custom_fields?.map((field) => ({
        id: field.id,
        name: field.name,
        value: field.value,
      })),
    };
  } else {
    return {
      ...product,
      metadata: product.metadata,
      metadataMap,
    };
  }
};

export const makeProductVariant = (
  productVariant: BigCommerceApiProductVariantSchema
): BigCommerceProductVariant => {
  return {
    metadata: undefined,
    id: productVariant.id,
    calculatedPrice: productVariant.calculated_price,
    gtin: productVariant.gtin,
    imageUrl: productVariant.image_url,
    inventoryLevel: productVariant.inventory_level,
    mpn: productVariant.mpn,
    optionValues:
      productVariant.option_values?.map((optionValue) => ({
        id: optionValue.id,
        label: optionValue.label,
        sortOrder: optionValue.sort_order,
        valueData: optionValue.value_data?.colors
          ? {
              colors: optionValue.value_data?.colors || undefined,
            }
          : undefined,
      })) || [],
    price: productVariant.price,
    productId: productVariant.product_id,
    purchasingDisabled: productVariant.purchasing_disabled,
    retailPrice: productVariant.retail_price,
    salePrice: productVariant.sale_price,
    costPrice: productVariant.cost_price,
    sku: productVariant.sku,
    skuId: productVariant.sku_id,
    upc: productVariant.upc,
    weight: productVariant.weight,
    depth: productVariant.depth,
    height: productVariant.height,
    width: productVariant.width,
  };
};

export const makeProductVariantMetadata = (
  metadata: BigCommerceProductVariantMetadataApiSchema
): BigCommerceProductVariantMetadata => {
  return {
    id: metadata.id,
    namespace: metadata.namespace,
    permissionSet: metadata.permission_set,
    resourceId: metadata.resource_id,
    resourceType: metadata.resource_type,
    dateCreated: metadata.date_created,
    dateModified: metadata.date_modified,
    key: metadata.key,
    value: metadata.value,
  };
};

export const makeProductVariantOptionType = (type?: string) => {
  switch (type) {
    case BigCommerceProductOptionType.Dropdown:
      return BigCommerceProductOptionType.Dropdown;
    case BigCommerceProductOptionType.ProductList:
      return BigCommerceProductOptionType.ProductList;
    case BigCommerceProductOptionType.ProductListWithImages:
      return BigCommerceProductOptionType.ProductListWithImages;
    case BigCommerceProductOptionType.RadioButtons:
      return BigCommerceProductOptionType.RadioButtons;
    case BigCommerceProductOptionType.Swatch:
      return BigCommerceProductOptionType.Swatch;
    default:
      throw new Error(`Unknown product option type: ${type}`);
  }
};

export const makeProductVariantOption = (
  option: BigCommerceApiProductOptionSchema
): BigCommerceProductVariantOption => {
  return {
    id: option.id,
    displayName: option.display_name,
    productId: option.product_id,
    type: makeProductVariantOptionType(option.type),
    optionValues:
      option.option_values?.map((optionValue) => ({
        id: optionValue.id,
        label: optionValue.label,
        sortOrder: optionValue.sort_order,
        valueData: {
          colors: optionValue.value_data?.colors || undefined,
        },
      })) || [],
  };
};

export const makeProductImage = (
  image: BigCommerceProductImageSchema
): BigCommerceProductImage => {
  return {
    id: image.id,
    imageFile: image.image_file,
    isThumbnail: image.is_thumbnail,
    productId: image.product_id,
    sortOrder: image.sort_order,
    urlStandard: image.url_standard,
    urlThumbnail: image.url_thumbnail,
    urlTiny: image.url_tiny,
  };
};

export const makeBrand = (
  brand: BigCommerceBrandApiSchema
): BigCommerceBrand => {
  return {
    id: brand.id,
    name: brand.name,
  };
};
