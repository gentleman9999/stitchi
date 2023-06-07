/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlugFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductPageGetDesignCategoryData
// ====================================================

export interface ProductPageGetDesignCategoryData_site_featuredProducts_edges_node_brand {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Path for the brand page.
   */
  path: string;
}

export interface ProductPageGetDesignCategoryData_site_featuredProducts_edges_node_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface ProductPageGetDesignCategoryData_site_featuredProducts_edges_node {
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
   * Relative URL path to product page.
   */
  path: string;
  /**
   * Brand associated with the product.
   */
  brand: ProductPageGetDesignCategoryData_site_featuredProducts_edges_node_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: ProductPageGetDesignCategoryData_site_featuredProducts_edges_node_defaultImage | null;
}

export interface ProductPageGetDesignCategoryData_site_featuredProducts_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDesignCategoryData_site_featuredProducts_edges_node;
}

export interface ProductPageGetDesignCategoryData_site_featuredProducts {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDesignCategoryData_site_featuredProducts_edges | null)[] | null;
}

export interface ProductPageGetDesignCategoryData_site {
  __typename: "Site";
  /**
   * Details of the featured products.
   */
  featuredProducts: ProductPageGetDesignCategoryData_site_featuredProducts;
}

export interface ProductPageGetDesignCategoryData_designCategory__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface ProductPageGetDesignCategoryData_designCategory__allReferencingDesigns_primaryImage_responsiveImage {
  __typename: "ResponsiveImage";
  srcSet: string;
  webpSrcSet: string;
  sizes: string;
  src: string;
  width: any;
  height: any;
  aspectRatio: any;
  alt: string | null;
  title: string | null;
  base64: string | null;
}

export interface ProductPageGetDesignCategoryData_designCategory__allReferencingDesigns_primaryImage {
  __typename: "FileField";
  id: any;
  responsiveImage: ProductPageGetDesignCategoryData_designCategory__allReferencingDesigns_primaryImage_responsiveImage | null;
}

export interface ProductPageGetDesignCategoryData_designCategory__allReferencingDesigns {
  __typename: "DesignRecord";
  id: any;
  primaryImage: ProductPageGetDesignCategoryData_designCategory__allReferencingDesigns_primaryImage | null;
}

export interface ProductPageGetDesignCategoryData_designCategory {
  __typename: "DesignCategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
  /**
   * SEO meta tags
   */
  _seoMetaTags: ProductPageGetDesignCategoryData_designCategory__seoMetaTags[];
  _allReferencingDesigns: ProductPageGetDesignCategoryData_designCategory__allReferencingDesigns[];
}

export interface ProductPageGetDesignCategoryData {
  /**
   * A site
   */
  site: ProductPageGetDesignCategoryData_site;
  /**
   * Returns a specific record
   */
  designCategory: ProductPageGetDesignCategoryData_designCategory | null;
}

export interface ProductPageGetDesignCategoryDataVariables {
  designCategorySlug: SlugFilter;
}
