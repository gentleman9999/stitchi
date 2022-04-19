/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ColorCreateInput {
  name: string;
  hex: string;
}

export interface Filter {
  in?: (string | null)[] | null;
  eq?: string | null;
}

export interface MaterialCreateInput {
  name: string;
  variants?: MaterialVariantCreateInput[] | null;
  slug?: string | null;
  description?: string | null;
}

export interface MaterialFilterArg {
  categoryId?: Filter | null;
}

export interface MaterialVariantCreateInput {
  vendorPartNumber?: string | null;
  gtin?: string | null;
  sizeId?: string | null;
  colorId?: string | null;
}

export interface SizeCreateInput {
  name: string;
  value: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
