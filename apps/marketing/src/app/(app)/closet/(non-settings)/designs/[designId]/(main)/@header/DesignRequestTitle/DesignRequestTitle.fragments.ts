import { gql } from '@apollo/client'

import { DESIGN_REQUEST as DESIGN_REQUEST_ACTIONS_DESIGN_REQUEST } from './DesignRequestActions/DesignRequestActions.fragments'

export const DESIGN_REQUEST = gql`
  ${DESIGN_REQUEST_ACTIONS_DESIGN_REQUEST}

  fragment DesignRequestTitleDesignRequesetFragment on DesignRequest {
    id
    name
    createdAt
    status
    humanizedStatus
    ...DesignRequestActionsDesignRequestFragment
  }
`
