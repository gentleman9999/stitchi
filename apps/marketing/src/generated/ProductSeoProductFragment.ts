/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductSeoProductFragment
// ====================================================

export interface ProductSeoProductFragment_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  seoImageUrl: string;
}

export interface ProductSeoProductFragment_brand {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the brand.
   */
  name: string;
}

export interface ProductSeoProductFragment_seo {
  __typename: "SeoDetails";
  /**
   * Meta description.
   */
  metaDescription: string;
}

export interface ProductSeoProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Description of the product in plain text.
   */
  plainTextDescription: string;
  /**
   * Default image for a product.
   */
  defaultImage: ProductSeoProductFragment_defaultImage | null;
  /**
   * Brand associated with the product.
   */
  brand: ProductSeoProductFragment_brand | null;
  /**
   * Product SEO details.
   */
  seo: ProductSeoProductFragment_seo;
}
