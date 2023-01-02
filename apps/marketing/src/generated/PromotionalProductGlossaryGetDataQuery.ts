/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductGlossaryGetDataQuery
// ====================================================

export interface PromotionalProductGlossaryGetDataQuery_allGlossaryEntries {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  definition: string | null;
  slug: string | null;
}

export interface PromotionalProductGlossaryGetDataQuery {
  /**
   * Returns a collection of records
   */
  allGlossaryEntries: PromotionalProductGlossaryGetDataQuery_allGlossaryEntries[];
}
