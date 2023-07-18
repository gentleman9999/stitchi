/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignPreviewGalleryDesignProductFragment
// ====================================================

export interface DesignPreviewGalleryDesignProductFragment_colors_images {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignPreviewGalleryDesignProductFragment_colors {
  __typename: "DesignProductColor";
  id: string;
  images: DesignPreviewGalleryDesignProductFragment_colors_images[];
}

export interface DesignPreviewGalleryDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  colors: DesignPreviewGalleryDesignProductFragment_colors[];
}
