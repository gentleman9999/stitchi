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
  slug: string | null;
  entryType: string | null;
  definition: string | null;
  term: string | null;
}

export interface PromotionalProductGlossaryGetDataQuery {
  /**
   * Returns a collection of records
   */
  allGlossaryEntries: PromotionalProductGlossaryGetDataQuery_allGlossaryEntries[];
}
