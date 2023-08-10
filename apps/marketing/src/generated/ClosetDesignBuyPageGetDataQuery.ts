/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetDesignBuyPageGetDataQuery
// ====================================================

export interface ClosetDesignBuyPageGetDataQuery_designProduct_colors_images {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetDesignBuyPageGetDataQuery_designProduct_colors {
  __typename: "DesignProductColor";
  id: string;
  name: string | null;
  hex: string | null;
  catalogProductColorId: string;
  images: ClosetDesignBuyPageGetDataQuery_designProduct_colors_images[];
}

export interface ClosetDesignBuyPageGetDataQuery_designProduct_variants {
  __typename: "DesignProductVariant";
  id: string;
  catalogProductVariantId: string;
  catalogProductColorId: string | null;
  catalogProductSizeId: string | null;
  sizeName: string | null;
}

export interface ClosetDesignBuyPageGetDataQuery_designProduct {
  __typename: "DesignProduct";
  id: string;
  name: string;
  description: string | null;
  colors: ClosetDesignBuyPageGetDataQuery_designProduct_colors[];
  variants: ClosetDesignBuyPageGetDataQuery_designProduct_variants[];
  catalogProductId: string;
}

export interface ClosetDesignBuyPageGetDataQuery {
  designProduct: ClosetDesignBuyPageGetDataQuery_designProduct | null;
}

export interface ClosetDesignBuyPageGetDataQueryVariables {
  designId: string;
}
