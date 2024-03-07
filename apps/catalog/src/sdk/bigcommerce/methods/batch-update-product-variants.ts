import type { BigCommerceProductVariant } from "../types";
import makeBigCommerceRepository, {
  BigCommerceRepository,
} from "../repository";
import { BatchUpdateProductVariantsInput } from "../repository/product-variant/batch-update";
import makeFilenameFromSSImageUrl from "../utils/make-filename-from-image-url";
import chunkArray from "../../../utils/chunk-array";
import makeFilenameFromBigCImageUrl from "../utils/make-filename-from-bigc-url";

type VariantInput = BatchUpdateProductVariantsInput["variants"][number];

export interface BatchUpdateProductVariantsFnInput {
  productId: number;
  variants: (VariantInput & {
    primaryImageUrl?: string | null;
    secondaryImageUrls?: string[];
  })[];
}

export type BatchUpdateProductVariantsFn = (
  input: BatchUpdateProductVariantsFnInput
) => Promise<BigCommerceProductVariant[]>;

interface Config {
  repository: BigCommerceRepository;
}

const makeBatchUpdateProductVariantsFn =
  (
    { repository }: Config = {
      repository: makeBigCommerceRepository(),
    }
  ): BatchUpdateProductVariantsFn =>
  async (input) => {
    let updatedVariants;

    try {
      updatedVariants = await repository.batchUpdateProductVariants({
        productId: input.productId,
        variants: input.variants.map((variant) => {
          // Remove the image from the variant input
          const { primaryImageUrl, secondaryImageUrls, ...rest } = variant;

          return rest;
        }),
      });
    } catch (error) {
      console.error("Error updating product variants", {
        context: { error },
      });

      throw error;
    }

    // Make sure the product variant has an image
    let existingProductImages;

    try {
      const { images } = await repository.listProductImages({
        productId: input.productId,
        filter: {
          limit: 1000,
          page: 1,
        },
      });

      existingProductImages = images;
    } catch (error) {
      console.error("Error fetching product images", {
        context: { error },
      });

      throw error;
    }

    const copiedExistingProductImages = [...existingProductImages];

    for (const bigCommerceVariant of updatedVariants) {
      // Make sure each variant has an image
      const { primaryImageUrl } =
        input.variants.find(
          (variant) =>
            ("id" in variant && variant.id === bigCommerceVariant.id) ||
            ("sku" in variant && variant.sku === bigCommerceVariant.sku)
        ) || {};

      const ssFileName = primaryImageUrl
        ? makeFilenameFromSSImageUrl(primaryImageUrl)
        : null;

      const bigCFileName = bigCommerceVariant.imageUrl
        ? makeFilenameFromBigCImageUrl(bigCommerceVariant.imageUrl)
        : null;

      if (primaryImageUrl && (!ssFileName || bigCFileName !== ssFileName)) {
        try {
          await repository.updateProductVariantImage({
            variantId: bigCommerceVariant.id,
            productId: bigCommerceVariant.productId,
            imageUrl: primaryImageUrl,
          });
        } catch (error) {
          console.error("Error creating product variant image", {
            context: { error },
          });

          throw error;
        }
      }
    }

    // Ensure we remove duplicates, since multiple variants can have the same image
    const secondaryImages = Array.from(
      new Set(
        input.variants
          .map((variant) => variant.secondaryImageUrls)
          .flat()
          .filter((url): url is string => Boolean(url))
      )
    );

    const productImagesToCreate = secondaryImages.filter((imageUrl) => {
      const fileName = makeFilenameFromSSImageUrl(imageUrl);

      return (
        fileName &&
        !copiedExistingProductImages?.some(
          (existingImage) =>
            makeFilenameFromBigCImageUrl(existingImage.imageFile) === fileName
        )
      );
    });

    try {
      await repository.updateProduct({
        id: input.productId,
        images: productImagesToCreate.map((imageUrl) => ({
          imageUrl,
          isThumbnail: false,
        })),
      });
    } catch (error) {
      console.error("Error updating product images", {
        context: { error },
      });

      throw error;
    }

    return updatedVariants;
  };

export default makeBatchUpdateProductVariantsFn;
