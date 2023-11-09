import { gql } from '@apollo/client'

export const DESIGN_REQUEST = gql`
  fragment DesignRequestActionsDesignRequestFragment on DesignRequest {
    id
    status
  }
`
