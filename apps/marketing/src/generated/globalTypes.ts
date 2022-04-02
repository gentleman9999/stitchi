/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface Filter {
  in?: (string | null)[] | null;
  eq?: string | null;
}

export interface MaterialFilterArg {
  categoryId?: Filter | null;
}

/**
 * Specifies how to filter Slug fields
 */
export interface SlugFilter {
  eq?: string | null;
  neq?: string | null;
  in?: (string | null)[] | null;
  notIn?: (string | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
