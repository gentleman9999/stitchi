/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductGlossaryGetDataQuery
// ====================================================

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryCategories {
  __typename: "GlossaryCategoryRecord";
  id: any;
  title: string | null;
  slug: string | null;
}

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryEntries_description {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
}

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryEntries {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  definition: string | null;
  description: PromotionalProductGlossaryGetDataQuery_allGlossaryEntries_description | null;
  slug: string | null;
  entryType: string | null;
}

export interface PromotionalProductGlossaryGetDataQuery {
  /**
   * Returns a collection of records
   */
  allGlossaryCategories: PromotionalProductGlossaryGetDataQuery_allGlossaryCategories[];
  /**
   * Returns a collection of records
   */
  allGlossaryEntries: PromotionalProductGlossaryGetDataQuery_allGlossaryEntries[];
}
