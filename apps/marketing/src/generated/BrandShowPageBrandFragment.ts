/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BrandShowPageBrandFragment
// ====================================================

export interface BrandShowPageBrandFragment_seo {
  __typename: "SeoDetails";
  /**
   * Page title.
   */
  pageTitle: string;
  /**
   * Meta description.
   */
  metaDescription: string;
}

export interface BrandShowPageBrandFragment {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Id of the brand.
   */
  entityId: number;
  /**
   * Name of the brand.
   */
  name: string;
  /**
   * Path for the brand page.
   */
  path: string;
  /**
   * Brand SEO details.
   */
  seo: BrandShowPageBrandFragment_seo;
}
