import { gql } from '@apollo/client'

export const DESIGN_PRODUCT = gql`
  fragment InventoryProductDetailsDesignFragment on DesignProduct {
    id
    designRequestId
  }
`
