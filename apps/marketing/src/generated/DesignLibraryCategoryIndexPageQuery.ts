/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignLibraryCategoryIndexPageQuery
// ====================================================

export interface DesignLibraryCategoryIndexPageQuery_allDesignCategories {
  __typename: "DesignCategoryRecord";
  id: any;
  slug: string | null;
  name: string | null;
}

export interface DesignLibraryCategoryIndexPageQuery {
  /**
   * Returns a collection of records
   */
  allDesignCategories: DesignLibraryCategoryIndexPageQuery_allDesignCategories[];
}
