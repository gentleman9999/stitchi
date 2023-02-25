/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductsGlossaryCategoryGetPagesQuery
// ====================================================

export interface PromotionalProductsGlossaryCategoryGetPagesQuery_allGlossaryCategories {
  __typename: "GlossaryCategoryRecord";
  id: any;
  slug: string | null;
}

export interface PromotionalProductsGlossaryCategoryGetPagesQuery {
  /**
   * Returns a collection of records
   */
  allGlossaryCategories: PromotionalProductsGlossaryCategoryGetPagesQuery_allGlossaryCategories[];
}
