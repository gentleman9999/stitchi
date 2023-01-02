/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RelatedTermsIndexPageEntryFragment
// ====================================================

export interface RelatedTermsIndexPageEntryFragment_description {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
}

export interface RelatedTermsIndexPageEntryFragment {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  definition: string | null;
  description: RelatedTermsIndexPageEntryFragment_description | null;
  slug: string | null;
}
