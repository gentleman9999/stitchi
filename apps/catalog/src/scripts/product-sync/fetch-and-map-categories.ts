import { BigCommerceCategory, BigCommerceSdk } from "../../sdk";

type SsCategoryId = string;
type BigCommerceCategoryId = number;
export type SsCategoryMap = Map<SsCategoryId, BigCommerceCategoryId>;

/**
 * Fetches categories from BigCommerce and maps them to SS Activewear category IDs.
 */
const fetchAndMapCategories = async ({
  bigCommerceCategories,
}: {
  bigCommerceCategories: BigCommerceCategory[];
}): Promise<SsCategoryMap> => {
  const categoryMap: SsCategoryMap = new Map();

  bigCommerceCategories.forEach((category) => {
    const ssCategoryId = category.metadata?.ssActivewearCategoryId;
    if (ssCategoryId) {
      categoryMap.set(ssCategoryId, category.id);
    }
  });

  return categoryMap;
};

export default fetchAndMapCategories;
