/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IndustryTermsIndexPageEntryFragment
// ====================================================

export interface IndustryTermsIndexPageEntryFragment_description {
  __typename: "GlossaryEntryModelDescriptionField";
  value: any;
}

export interface IndustryTermsIndexPageEntryFragment {
  __typename: "GlossaryEntryRecord";
  id: any;
  term: string | null;
  definition: string | null;
  description: IndustryTermsIndexPageEntryFragment_description | null;
  slug: string | null;
}
