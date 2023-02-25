/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductGlossaryTermGetPagesQuery
// ====================================================

export interface PromotionalProductGlossaryTermGetPagesQuery_allGlossaryEntries_description {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
}

export interface PromotionalProductGlossaryTermGetPagesQuery_allGlossaryEntries {
  __typename: "GlossaryEntryRecord";
  id: any;
  slug: string | null;
  entryType: string | null;
  description: PromotionalProductGlossaryTermGetPagesQuery_allGlossaryEntries_description | null;
}

export interface PromotionalProductGlossaryTermGetPagesQuery {
  /**
   * Returns a collection of records
   */
  allGlossaryEntries: PromotionalProductGlossaryTermGetPagesQuery_allGlossaryEntries[];
}
