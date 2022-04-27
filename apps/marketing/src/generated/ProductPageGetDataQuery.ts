/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageGetDataQuery
// ====================================================

export interface ProductPageGetDataQuery_site_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface ProductPageGetDataQuery_site_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_brands_edges_node_products_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_brands_edges_node {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the brand.
   */
  name: string;
  /**
   * Path for the brand page.
   */
  path: string;
  /**
   * Id of the brand.
   */
  entityId: number;
  products: ProductPageGetDataQuery_site_brands_edges_node_products;
}

export interface ProductPageGetDataQuery_site_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_brands_edges_node;
}

export interface ProductPageGetDataQuery_site_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_brands_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_categoryTree {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * The name of category.
   */
  name: string;
}

export interface ProductPageGetDataQuery_site_route_node_Brand {
  __typename: "Brand" | "Category" | "Variant";
  /**
   * The id of the object.
   */
  id: string;
}

export interface ProductPageGetDataQuery_site_route_node_Product_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  seoImageUrl: string;
  /**
   * Absolute path to original image using store CDN.
   */
  urlOriginal: string;
  /**
   * Text description of an image that can be used for SEO and/or accessibility purposes.
   */
  altText: string;
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface ProductPageGetDataQuery_site_route_node_Product_brand {
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

export interface ProductPageGetDataQuery_site_route_node_Product_seo {
  __typename: "SeoDetails";
  /**
   * Meta description.
   */
  metaDescription: string;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
  __typename: "SwatchOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
  /**
   * Label for the option value.
   */
  label: string;
  /**
   * List of up to 3 hex encoded colors to associate with a swatch value.
   */
  hexColors: string[];
}

export type ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node = ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_CheckboxOption | ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption;

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_route_node_Product_productOptions_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_route_node_Product {
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
  defaultImage: ProductPageGetDataQuery_site_route_node_Product_defaultImage | null;
  /**
   * Brand associated with the product.
   */
  brand: ProductPageGetDataQuery_site_route_node_Product_brand | null;
  /**
   * Product SEO details.
   */
  seo: ProductPageGetDataQuery_site_route_node_Product_seo;
  /**
   * Product options.
   */
  productOptions: ProductPageGetDataQuery_site_route_node_Product_productOptions;
  /**
   * Description of the product.
   */
  description: string;
}

export type ProductPageGetDataQuery_site_route_node = ProductPageGetDataQuery_site_route_node_Brand | ProductPageGetDataQuery_site_route_node_Product;

export interface ProductPageGetDataQuery_site_route {
  __typename: "Route";
  /**
   * node
   */
  node: ProductPageGetDataQuery_site_route_node | null;
}

export interface ProductPageGetDataQuery_site {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: ProductPageGetDataQuery_site_brands;
  categoryTree: ProductPageGetDataQuery_site_categoryTree[];
  /**
   * Route for a node
   */
  route: ProductPageGetDataQuery_site_route;
}

export interface ProductPageGetDataQuery {
  site: ProductPageGetDataQuery_site;
}

export interface ProductPageGetDataQueryVariables {
  path: string;
}
