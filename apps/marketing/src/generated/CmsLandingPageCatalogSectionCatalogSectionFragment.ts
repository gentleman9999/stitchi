/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmsLandingPageCatalogSectionCatalogSectionFragment
// ====================================================

export interface CmsLandingPageCatalogSectionCatalogSectionFragment_categories {
  __typename: "CatalogCategoryRecord";
  id: any;
  bigCommerceCategoryId: any | null;
  name: string | null;
}

export interface CmsLandingPageCatalogSectionCatalogSectionFragment {
  __typename: "PageSectionCatalogRecord";
  id: any;
  title: string | null;
  description: string | null;
  disableDefaultCategories: any | null;
  categories: CmsLandingPageCatalogSectionCatalogSectionFragment_categories[];
}
